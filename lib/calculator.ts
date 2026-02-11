export type Operation = '+' | '-' | '×' | '÷'

export type CalculatorButton = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | '.' | '+' | '-' | '×' | '÷' | '=' | 'C' | 'CE' | '±'

export interface CalculatorState {
  currentOperand: string
  previousOperand: string
  operation: Operation | null
  overwrite: boolean
  error: string | null
}

export type CalculatorAction = 
  | { type: 'input'; payload: CalculatorButton }
  | { type: 'calculate' }
  | { type: 'clear' }
  | { type: 'delete' }

const MAX_DIGITS = 12

function formatNumber(num: number): string {
  if (num.toString().length > MAX_DIGITS) {
    return num.toExponential(6)
  }
  return num.toString()
}

function evaluate(previous: number, current: number, operation: Operation): number {
  switch (operation) {
    case '+':
      return previous + current
    case '-':
      return previous - current
    case '×':
      return previous * current
    case '÷':
      if (current === 0) {
        throw new Error('Division by zero')
      }
      return previous / current
    default:
      throw new Error('Invalid operation')
  }
}

export function calculate(state: CalculatorState, action: CalculatorAction): CalculatorState {
  if (state.error && action.type !== 'clear') {
    return state
  }

  switch (action.type) {
    case 'input': {
      const button = action.payload
      
      if (button === 'C') {
        return {
          currentOperand: '0',
          previousOperand: '',
          operation: null,
          overwrite: false,
          error: null,
        }
      }

      if (button === 'CE') {
        return {
          ...state,
          currentOperand: '0',
          overwrite: false,
          error: null,
        }
      }

      if (button === '±') {
        if (state.currentOperand === '0') return state
        return {
          ...state,
          currentOperand: (-parseFloat(state.currentOperand)).toString(),
        }
      }

      if (button === '=') {
        if (!state.operation || !state.previousOperand) {
          return state
        }

        try {
          const prev = parseFloat(state.previousOperand)
          const current = parseFloat(state.currentOperand)
          const result = evaluate(prev, current, state.operation)
          
          return {
            currentOperand: formatNumber(result),
            previousOperand: '',
            operation: null,
            overwrite: true,
            error: null,
          }
        } catch (err) {
          return {
            ...state,
            error: err instanceof Error ? err.message : 'Calculation error',
          }
        }
      }

      if (['+', '-', '×', '÷'].includes(button)) {
        if (state.operation && state.previousOperand && !state.overwrite) {
          try {
            const prev = parseFloat(state.previousOperand)
            const current = parseFloat(state.currentOperand)
            const result = evaluate(prev, current, state.operation)
            
            return {
              currentOperand: formatNumber(result),
              previousOperand: formatNumber(result),
              operation: button as Operation,
              overwrite: true,
              error: null,
            }
          } catch (err) {
            return {
              ...state,
              error: err instanceof Error ? err.message : 'Calculation error',
            }
          }
        }

        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: button as Operation,
          overwrite: true,
          error: null,
        }
      }

      // Handle digit or decimal input
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: button === '.' ? '0.' : button,
          overwrite: false,
          error: null,
        }
      }

      if (button === '.') {
        if (state.currentOperand.includes('.')) {
          return state
        }
        return {
          ...state,
          currentOperand: state.currentOperand + '.',
          error: null,
        }
      }

      // Handle digits
      if (state.currentOperand === '0') {
        return {
          ...state,
          currentOperand: button,
          error: null,
        }
      }

      if (state.currentOperand.length >= MAX_DIGITS) {
        return state
      }

      return {
        ...state,
        currentOperand: state.currentOperand + button,
        error: null,
      }
    }

    case 'calculate': {
      if (!state.operation || !state.previousOperand) {
        return state
      }

      try {
        const prev = parseFloat(state.previousOperand)
        const current = parseFloat(state.currentOperand)
        const result = evaluate(prev, current, state.operation)
        
        return {
          currentOperand: formatNumber(result),
          previousOperand: '',
          operation: null,
          overwrite: true,
          error: null,
        }
      } catch (err) {
        return {
          ...state,
          error: err instanceof Error ? err.message : 'Calculation error',
        }
      }
    }

    case 'clear':
      return {
        currentOperand: '0',
        previousOperand: '',
        operation: null,
        overwrite: false,
        error: null,
      }

    case 'delete':
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: '0',
          error: null,
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
        error: null,
      }

    default:
      return state
  }
}
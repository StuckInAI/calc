"use client"

import { useEffect, useReducer, KeyboardEvent } from 'react'
import Display from './Display'
import Button from './Button'
import { calculate, CalculatorAction, CalculatorState, Operation } from '@/lib/calculator'
import { CalculatorButton } from '@/types'

export default function Calculator() {
  const initialState: CalculatorState = {
    currentOperand: '0',
    previousOperand: '',
    operation: null,
    overwrite: false,
    error: null,
  }

  const [state, dispatch] = useReducer(calculate, initialState)

  const handleButtonClick = (button: CalculatorButton) => {
    dispatch({ type: 'input', payload: button })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key
    
    if (key >= '0' && key <= '9') {
      dispatch({ type: 'input', payload: key })
    } else if (key === '.') {
      dispatch({ type: 'input', payload: '.' })
    } else if (key === '+' || key === '-') {
      dispatch({ type: 'input', payload: key })
    } else if (key === '*') {
      dispatch({ type: 'input', payload: '×' })
    } else if (key === '/') {
      dispatch({ type: 'input', payload: '÷' })
    } else if (key === 'Enter' || key === '=') {
      dispatch({ type: 'calculate' })
    } else if (key === 'Escape' || key === 'Delete') {
      dispatch({ type: 'clear' })
    } else if (key === 'Backspace') {
      dispatch({ type: 'delete' })
    }
  }

  useEffect(() => {
    // Add global keydown listener
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      handleKeyDown(e as unknown as KeyboardEvent)
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  const buttonGrid: CalculatorButton[][] = [
    ['C', 'CE', '±', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ]

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Display 
        currentOperand={state.currentOperand}
        previousOperand={state.previousOperand}
        operation={state.operation}
        error={state.error}
      />
      <div className="grid grid-cols-4 gap-3 mt-6">
        {buttonGrid.map((row, rowIndex) => (
          row.map((button, colIndex) => {
            const isZero = button === '0'
            const isEquals = button === '='
            const isOperation = ['+', '-', '×', '÷', '±'].includes(button)
            const isSpecial = ['C', 'CE', '±'].includes(button)
            
            return (
              <Button
                key={`${rowIndex}-${colIndex}`}
                label={button}
                onClick={() => handleButtonClick(button)}
                className={`
                  ${isZero ? 'col-span-2' : ''}
                  ${isEquals ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                  ${isOperation && !isSpecial ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
                  ${isSpecial ? 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600' : ''}
                  ${!isEquals && !isOperation && !isSpecial ? 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700' : ''}
                  font-medium text-lg h-14 rounded-xl transition-colors duration-200 active:scale-95
                `}
                aria-label={`${button} button`}
              />
            )
          })
        ))}
      </div>
    </div>
  )
}
export type CalculatorButtonType = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | '.' | '+' | '-' | '×' | '÷' | '=' | 'C' | 'CE' | '±'

export interface ThemeContextType {
  theme: string | undefined
  setTheme: (theme: string) => void
}

export type OperationType = '+' | '-' | '×' | '÷'
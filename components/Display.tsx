import { Operation } from '@/lib/calculator'

interface DisplayProps {
  currentOperand: string
  previousOperand: string
  operation: Operation | null
  error: string | null
}

export default function Display({ currentOperand, previousOperand, operation, error }: DisplayProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-4 min-h-32 flex flex-col justify-end">
      {error ? (
        <div className="text-red-500 text-lg font-medium text-right">{error}</div>
      ) : (
        <>
          <div className="text-gray-600 dark:text-gray-400 text-right text-lg truncate">
            {previousOperand} {operation || ''}
          </div>
          <div 
            className="text-gray-800 dark:text-white text-right text-4xl font-bold truncate"
            aria-live="polite"
            aria-atomic="true"
          >
            {currentOperand}
          </div>
        </>
      )}
    </div>
  )
}
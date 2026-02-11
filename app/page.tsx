import Calculator from '@/components/Calculator'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Calc</h1>
        <ThemeToggle />
      </div>
      <Calculator />
      <p className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
        A modern calculator with keyboard support. Use <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> for equals and <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Escape</kbd> to clear.
      </p>
    </div>
  )
}
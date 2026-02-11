import Calculator from './components/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Calc</h1>
          <p className="text-gray-600">A modern calculator for your daily productivity</p>
        </header>
        <Calculator />
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2023 Calc • Simple and efficient calculations</p>
        </footer>
      </div>
    </main>
  );
}

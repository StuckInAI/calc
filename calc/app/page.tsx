import Calculator from './components/Calculator';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Calc</h1>
      <Calculator />
      <p className="text-center mt-8 text-gray-600">A simple calculator with history and safe evaluation.</p>
    </div>
  );
}
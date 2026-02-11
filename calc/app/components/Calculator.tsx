'use client';

import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('calcHistory', JSON.stringify(history));
  }, [history]);

  const handleNumberClick = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (display === 'Error') {
      setDisplay('0');
      setExpression('');
      return;
    }
    const newExpression = expression + display + op;
    setExpression(newExpression);
    setDisplay('0');
  };

  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleEqualsClick = async () => {
    if (expression === '' || display === 'Error') {
      return;
    }
    const fullExpression = expression + display;
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: fullExpression }),
      });
      const data = await response.json();
      if (response.ok) {
        const result = data.result.toString();
        setDisplay(result);
        setHistory([...history, `${fullExpression} = ${result}`]);
        setExpression('');
      } else {
        setDisplay('Error');
        setExpression('');
      }
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const buttonLayout = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <Display value={display} />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {buttonLayout.flat().map((label) => {
          if (label === 'C') {
            return (
              <div key={label} className="col-span-4">
                <Button label={label} onClick={handleClearClick} type="function" />
              </div>
            );
          }
          let onClick: () => void;
          let type: 'number' | 'operator' | 'function' = 'number';
          if (['÷', '×', '-', '+'].includes(label)) {
            onClick = () => handleOperatorClick(label);
            type = 'operator';
          } else if (label === '=') {
            onClick = handleEqualsClick;
            type = 'operator';
          } else if (label === '.') {
            onClick = handleDecimalClick;
          } else {
            onClick = () => handleNumberClick(label);
          }
          return (
            <Button
              key={label}
              label={label}
              onClick={onClick}
              type={type}
            />
          );
        })}
      </div>
      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">History</h3>
          <ul className="list-disc pl-5">
            {history.slice(-5).reverse().map((item, index) => (
              <li key={index} className="text-gray-600">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;
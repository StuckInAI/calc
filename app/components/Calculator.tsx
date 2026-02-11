"use client";

import { useState, useEffect } from 'react';
import Button from './Button';
import { calculate, isNumber, formatDisplay } from '../../lib/calculate';

type Operator = '+' | '-' | '×' | '÷' | null;

export default function Calculator() {
  const [input, setInput] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);
  const [displayHistory, setDisplayHistory] = useState<string>('');

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setInput(num === '.' ? '0.' : num);
      setWaitingForNewValue(false);
    } else {
      setInput(current => {
        if (current === '0' && num !== '.') {
          return num;
        }
        if (num === '.' && current.includes('.')) {
          return current;
        }
        return current + num;
      });
    }
  };

  const handleOperator = (op: Operator) => {
    const inputValue = parseFloat(input);
    
    if (previousValue === null) {
      setPreviousValue(inputValue);
      setOperator(op);
      setWaitingForNewValue(true);
      setDisplayHistory(`${formatDisplay(inputValue)} ${op}`);
    } else if (operator && !waitingForNewValue) {
      const result = calculate(previousValue, inputValue, operator);
      if (result === 'Error') {
        resetCalculator();
        setInput('Error');
        return;
      }
      setPreviousValue(result);
      setOperator(op);
      setInput(result.toString());
      setWaitingForNewValue(true);
      setDisplayHistory(`${formatDisplay(result)} ${op}`);
    } else {
      setOperator(op);
      setWaitingForNewValue(true);
      setDisplayHistory(`${formatDisplay(previousValue!)} ${op}`);
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operator) {
      const inputValue = parseFloat(input);
      const result = calculate(previousValue, inputValue, operator);
      
      if (result === 'Error') {
        setInput('Error');
        setDisplayHistory(`${formatDisplay(previousValue)} ${operator} ${formatDisplay(inputValue)} =`);
      } else {
        setInput(result.toString());
        setDisplayHistory(`${formatDisplay(previousValue)} ${operator} ${formatDisplay(inputValue)} =`);
      }
      
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    resetCalculator();
  };

  const handleBackspace = () => {
    if (!waitingForNewValue) {
      setInput(current => {
        if (current.length === 1 || (current.length === 2 && current.startsWith('-'))) {
          return '0';
        }
        return current.slice(0, -1);
      });
    }
  };

  const resetCalculator = () => {
    setInput('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
    setDisplayHistory('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isNumber(e.key)) {
      handleNumber(e.key);
    } else if (e.key === '.') {
      handleNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      let op: Operator = null;
      if (e.key === '+') op = '+';
      if (e.key === '-') op = '-';
      if (e.key === '*') op = '×';
      if (e.key === '/') op = '÷';
      handleOperator(op);
    } else if (e.key === 'Enter' || e.key === '=') {
      handleEquals();
    } else if (e.key === 'Escape' || e.key === 'Delete') {
      handleClear();
    } else if (e.key === 'Backspace') {
      handleBackspace();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const buttonLayout = [
    ['C', '⌫', '÷', '×'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '='],
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="p-6 bg-gray-800 text-white">
        <div className="text-right text-gray-400 text-sm min-h-[1.25rem] mb-2 truncate">
          {displayHistory}
        </div>
        <div className="text-right text-4xl font-bold min-h-[3rem] flex items-center justify-end">
          <span className="truncate">{formatDisplay(parseFloat(input))}</span>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-4 gap-3">
        {buttonLayout.flatMap((row, rowIndex) => 
          row.map((label, colIndex) => {
            const isEquals = label === '=';
            const isOperator = ['+', '-', '×', '÷'].includes(label);
            const isFunction = ['C', '⌫'].includes(label);
            const isZero = label === '0';
            
            let colSpan = 1;
            if (rowIndex === 4 && label === '0') colSpan = 2;
            if (rowIndex === 4 && label === '=') colSpan = 2;
            
            const handleClick = () => {
              if (isNumber(label)) {
                handleNumber(label);
              } else if (label === '.') {
                handleNumber('.');
              } else if (isOperator) {
                handleOperator(label as Operator);
              } else if (label === '=') {
                handleEquals();
              } else if (label === 'C') {
                handleClear();
              } else if (label === '⌫') {
                handleBackspace();
              }
            };
            
            return (
              <Button
                key={`${rowIndex}-${colIndex}`}
                label={label}
                onClick={handleClick}
                colSpan={colSpan}
                isOperator={isOperator}
                isFunction={isFunction}
                isEquals={isEquals}
                isZero={isZero}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

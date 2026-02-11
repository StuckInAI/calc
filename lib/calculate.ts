export type Operator = '+' | '-' | '×' | '÷';

export function calculate(a: number, b: number, operator: Operator): number | string {
  if (operator === '÷' && b === 0) {
    return 'Error';
  }

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return a / b;
    default:
      return b;
  }
}

export function isNumber(value: string): boolean {
  return /^\d$/.test(value);
}

export function formatDisplay(value: number): string {
  // Format large numbers with commas, limit decimal places
  if (isNaN(value)) return '0';
  
  // If it's an integer or has few decimal places, show as is
  if (Number.isInteger(value) || value.toString().split('.')[1]?.length <= 6) {
    return value.toLocaleString('en-US', {
      maximumFractionDigits: 10,
    });
  }
  
  // For numbers with many decimal places, limit to 8 significant digits
  return value.toLocaleString('en-US', {
    maximumSignificantDigits: 8,
  });
}

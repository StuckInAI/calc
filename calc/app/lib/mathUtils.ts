import { evaluate as mathEvaluate } from 'mathjs';

export function evaluateExpression(expression: string): number {
  try {
    const result = mathEvaluate(expression);
    if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
      throw new Error('Invalid calculation result');
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Evaluation error: ${error.message}`);
    }
    throw new Error('Failed to evaluate expression');
  }
}

// Alias for easier import
export const evaluate = evaluateExpression;
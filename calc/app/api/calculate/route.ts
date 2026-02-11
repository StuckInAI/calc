import { NextRequest, NextResponse } from 'next/server';
import { evaluate } from '@/app/lib/mathUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { expression } = body;

    if (!expression || typeof expression !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: expression must be a string' },
        { status: 400 }
      );
    }

    const result = evaluate(expression);
    return NextResponse.json({ result });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
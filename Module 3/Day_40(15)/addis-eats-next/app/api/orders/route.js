import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!phone || phone.length < 4) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          fieldErrors: { phone: 'Phone number is too short' } 
        }, 
        { status: 422 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Order created successfully' }, 
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid request body' }, 
      { status: 400 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getXataClient } from "@/xata";

export async function POST(request: NextRequest) {
  const xata = getXataClient();
  
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }
    
    const user = await xata.db.users.create({ email });
    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
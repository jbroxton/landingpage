import { NextResponse } from 'next/server';
import { createSignup } from '@/services/studies/studies-service';
import { CreateSignupInput } from '@/services/studies/types';

interface Params {
  params: Promise<{ id: string }>;
}

// POST signup for a study
export async function POST(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json();
    const signupData: CreateSignupInput = {
      ...body,
      study_id: Number(id)
    };
    
    const signup = await createSignup(signupData);
    
    return NextResponse.json({ 
      success: true, 
      signup,
      message: 'Successfully signed up for the study!'
    });
  } catch (error) {
    console.error('Error creating signup:', error);
    
    if (error instanceof Error) {
      if (error.message === 'Study is full') {
        return NextResponse.json({ error: 'Study is full' }, { status: 400 });
      }
      if (error.message === 'Study not found or not available') {
        return NextResponse.json({ error: 'Study not found or not available' }, { status: 404 });
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to sign up for study' },
      { status: 500 }
    );
  }
}
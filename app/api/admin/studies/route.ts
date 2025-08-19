import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/AdminPortal/auth';
import { getAllStudies, createStudy } from '@/services/studies/studies-service';
import { CreateStudyInput } from '@/services/studies/types';

// GET all studies (admin view with signup counts)
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const studies = await getAllStudies();
    return NextResponse.json(studies);
  } catch (error) {
    console.error('Error fetching studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch studies' },
      { status: 500 }
    );
  }
}

// POST new study
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: CreateStudyInput = await request.json();
    const study = await createStudy(body);
    return NextResponse.json(study);
  } catch (error) {
    console.error('Error creating study:', error);
    return NextResponse.json(
      { error: 'Failed to create study' },
      { status: 500 }
    );
  }
}
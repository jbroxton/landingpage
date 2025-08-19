import { NextResponse } from 'next/server';
import { getPublishedStudies } from '@/services/studies/studies-service';

// GET all published studies (public view)
export async function GET() {
  try {
    const studies = await getPublishedStudies();
    return NextResponse.json(studies);
  } catch (error) {
    console.error('Error fetching studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch studies' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/AdminPortal/auth';
import { getSignupsByStudyId } from '@/services/studies/studies-service';

interface Params {
  params: Promise<{ id: string }>;
}

// GET all signups for a study
export async function GET(request: NextRequest, { params }: Params) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const signups = await getSignupsByStudyId(Number(id));
    return NextResponse.json(signups);
  } catch (error) {
    console.error('Error fetching signups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signups' },
      { status: 500 }
    );
  }
}
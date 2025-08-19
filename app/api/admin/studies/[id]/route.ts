import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/AdminPortal/auth';
import { getStudyById, updateStudy, deleteStudy } from '@/services/studies/studies-service';
import { CreateStudyInput } from '@/services/studies/types';

interface Params {
  params: Promise<{ id: string }>;
}

// GET single study
export async function GET(request: NextRequest, { params }: Params) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const study = await getStudyById(Number(id));
    if (!study) {
      return NextResponse.json({ error: 'Study not found' }, { status: 404 });
    }
    return NextResponse.json(study);
  } catch (error) {
    console.error('Error fetching study:', error);
    return NextResponse.json(
      { error: 'Failed to fetch study' },
      { status: 500 }
    );
  }
}

// PUT update study
export async function PUT(request: NextRequest, { params }: Params) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body: CreateStudyInput = await request.json();
    const study = await updateStudy(Number(id), body);
    
    if (!study) {
      return NextResponse.json({ error: 'Study not found' }, { status: 404 });
    }
    
    return NextResponse.json(study);
  } catch (error) {
    console.error('Error updating study:', error);
    return NextResponse.json(
      { error: 'Failed to update study' },
      { status: 500 }
    );
  }
}

// DELETE study
export async function DELETE(request: NextRequest, { params }: Params) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteStudy(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting study:', error);
    return NextResponse.json(
      { error: 'Failed to delete study' },
      { status: 500 }
    );
  }
}
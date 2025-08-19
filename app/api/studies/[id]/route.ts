import { NextResponse } from 'next/server';
import { getPublishedStudyById } from '@/services/studies/studies-service';

interface Params {
  params: Promise<{ id: string }>;
}

// GET single published study (public view)
export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const study = await getPublishedStudyById(Number(id));
    
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
import { getResumeData, saveResumeData } from '@/lib/resume';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await getResumeData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const success = await saveResumeData(data);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

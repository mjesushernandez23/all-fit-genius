import { hasPermissions } from '@/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const isValid = await hasPermissions(2);
  if (!isValid) return new NextResponse('Forbidden', { status: 404 });
  return new NextResponse('paso');
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;
    return NextResponse.json({ isAdmin: session === 'authenticated' });
  } catch (e) {
    return NextResponse.json({ isAdmin: false });
  }
}

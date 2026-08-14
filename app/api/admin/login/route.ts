import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Default admin password for BabuElectronics
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'babu2025';

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid Admin Password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Login error' }, { status: 500 });
  }
}

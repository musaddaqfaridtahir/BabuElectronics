import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Authenticate admin session
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session')?.value;
    if (adminSession !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized. Please log in again as Admin.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Format safe unique filename
    const ext = path.extname(file.name) || '.jpg';
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const uniqueFileName = `${cleanName}-${Date.now()}${ext}`;

    // Try writing locally to /public/uploads
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFileName);
      await writeFile(filePath, buffer);
      return NextResponse.json({ url: `/uploads/${uniqueFileName}`, fileName: uniqueFileName });
    } catch (fsErr: any) {
      // On read-only serverless environments (like Vercel), fallback to inline compressed data URL
      if (buffer.byteLength <= 1.5 * 1024 * 1024) {
        const mime = file.type || 'image/jpeg';
        const base64 = buffer.toString('base64');
        return NextResponse.json({
          url: `data:${mime};base64,${base64}`,
          fileName: uniqueFileName,
          inlineFallback: true,
        });
      }
      throw fsErr;
    }
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: `Failed to upload image: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

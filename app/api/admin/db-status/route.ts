import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const isVercel = Boolean(process.env.VERCEL);
  const dbUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';
  const isSqlite = dbUrl.startsWith('file:');

  let writable = true;
  let errorDetail = '';

  if (isVercel && isSqlite) {
    writable = false;
    errorDetail = 'Vercel par SQLite file read-only hoti hai. Live mobile/web admin panel se product add/edit save karne ke liye Vercel Dashboard > Storage mein Neon Postgres database connect karna zaroori hai.';
  } else {
    try {
      // Lightweight transaction check without mutating state
      await prisma.$queryRaw`SELECT 1`;
    } catch (e: any) {
      writable = false;
      errorDetail = e?.message || 'Database connection error';
    }
  }

  return NextResponse.json({
    writable,
    isVercel,
    provider: isSqlite ? 'sqlite' : 'postgres',
    message: errorDetail,
  });
}

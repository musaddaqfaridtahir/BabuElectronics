import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // Resolve database path robustly
  let dbUrl = process.env.DATABASE_URL;

  // If using local sqlite file, ensure absolute path resolution
  if (!dbUrl || dbUrl.startsWith('file:')) {
    // Check multiple potential locations (inside BabuElectronics or cwd)
    const possiblePaths = [
      path.resolve(process.cwd(), 'prisma', 'dev.db'),
      path.resolve(process.cwd(), 'BabuElectronics', 'prisma', 'dev.db'),
      path.resolve(__dirname, '..', 'prisma', 'dev.db'),
    ];

    let foundPath = possiblePaths[0];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        foundPath = p;
        break;
      }
    }

    dbUrl = `file:${foundPath}`;
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

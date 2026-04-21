import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log('Iniciando seed...');
  
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definido en el archivo .env');
  }

  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const admin = await prisma.user.upsert({
      where: { email: 'admin@deltazulu.com' },
      update: {},
      create: {
        email: 'admin@deltazulu.com',
        nombre: 'Admin',
        apellido: 'Delta Zulu',
        password: 'adminpassword123',
        role: 'ADMIN',
      },
    });

    console.log('Admin creado o actualizado:', admin);
  } catch (error) {
    console.error('Error detallado durante el seed:');
    console.dir(error, { depth: null });
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => {
  process.exit(1);
});

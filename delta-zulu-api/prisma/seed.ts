import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

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
    // Limpiar tablas relacionadas para empezar de cero
    console.log('Limpiando base de datos de usuarios...');
    await prisma.examAttempt.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('ciacdeltazulu2026', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'ciacdeltazulu@gmail.com' },
      update: {},
      create: {
        email: 'ciacdeltazulu@gmail.com',
        nombre: 'Admin',
        apellido: 'Delta Zulu',
        password: hashedPassword,
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

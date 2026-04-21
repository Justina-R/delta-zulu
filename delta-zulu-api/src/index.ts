import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import * as dotenv from 'dotenv';
import prismaPlugin from './plugins/prisma.js';
import studentRoutes from './routes/students.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import examRoutes from './routes/exams.js';

dotenv.config();

const fastify = Fastify({
  logger: true
});

// Register Plugins
fastify.register(cors, {
  origin: true
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'super-secret-key'
});

fastify.register(prismaPlugin);

// Auth Decorator
fastify.decorate('authenticate', async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Register Routes
fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(studentRoutes, { prefix: '/api/students' });
fastify.register(courseRoutes, { prefix: '/api/courses' });
fastify.register(examRoutes, { prefix: '/api/exams' });

// Basic Health Check
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

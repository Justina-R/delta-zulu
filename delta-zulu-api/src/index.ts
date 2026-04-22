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

// Global Error Handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(error.statusCode || 500).send({
    status: 'error',
    name: error.name,
    message: error.message,
    statusCode: error.statusCode
  });
});

// Register Plugins
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
  sign: {
    expiresIn: '7d'
  }
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

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default async (req: any, res: any) => {
  await fastify.ready();
  fastify.server.emit('request', req, res);
};

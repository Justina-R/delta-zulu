import { FastifyInstance } from 'fastify';

export default async function courseRoutes(fastify: FastifyInstance) {
  const authenticate = (fastify as any).authenticate;

  // List all courses (Public or Student)
  fastify.get('/', async (request, reply) => {
    return await fastify.prisma.course.findMany({
      include: { modules: { include: { exam: true }, orderBy: { order: 'asc' } } }
    });
  });

  // Get student progress
  fastify.get('/my-progress', { preHandler: [authenticate] }, async (request: any, reply) => {
    const studentId = request.user.id;
    return await fastify.prisma.course.findMany({
      include: {
        modules: {
          include: {
            exam: {
              include: {
                attempts: {
                  where: { studentId },
                  orderBy: { completedAt: 'desc' }
                }
              }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    });
  });

  // Get course detail
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;

    // Try to get student info if token is present
    let studentId: number | null = null;
    try {
      const authHeader = request.headers.authorization;
      if (authHeader) {
        const decoded: any = await request.jwtVerify();
        studentId = decoded.id;
      }
    } catch (e) {
      // Not authenticated, ignore
    }

    const course = await fastify.prisma.course.findUnique({
      where: { id: Number(id) },
      include: {
        modules: {
          include: {
            exam: studentId ? {
              include: {
                attempts: {
                  where: { studentId },
                  orderBy: { completedAt: 'desc' },
                  take: 1
                }
              }
            } : true
          },
          orderBy: { order: 'asc' }
        }
      }
    });
    if (!course) return reply.status(404).send({ error: 'Curso no encontrado' });
    return course;
  });

  // ADMIN ONLY ROUTES

  // Create Course
  fastify.post('/', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });

    const { nombre, descripcion } = request.body;
    return await fastify.prisma.course.create({
      data: { nombre, descripcion }
    });
  });

  // Create Module
  fastify.post('/:id/modules', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });

    const { id } = request.params;
    const { nombre, descripcion, driveUrl, order } = request.body;

    return await fastify.prisma.module.create({
      data: {
        nombre,
        descripcion,
        driveUrl,
        order: order || 0,
        courseId: Number(id)
      }
    });
  });

  // Update Course
  fastify.put('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    const { id } = request.params;
    const { nombre, descripcion } = request.body;
    return await fastify.prisma.course.update({
      where: { id: Number(id) },
      data: { nombre, descripcion }
    });
  });

  // Delete Course
  fastify.delete('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    const { id } = request.params;
    await fastify.prisma.course.delete({ where: { id: Number(id) } });
    return { success: true };
  });

  // Get Module detail
  fastify.get('/modules/:id', async (request: any, reply) => {
    const { id } = request.params;
    return await fastify.prisma.module.findUnique({ where: { id: Number(id) } });
  });

  // Update Module
  fastify.put('/modules/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    const { id } = request.params;
    const { nombre, descripcion, driveUrl, order } = request.body;
    return await fastify.prisma.module.update({
      where: { id: Number(id) },
      data: { nombre, descripcion, driveUrl, order }
    });
  });

  // Delete Module
  fastify.delete('/modules/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    const { id } = request.params;
    await fastify.prisma.module.delete({ where: { id: Number(id) } });
    return { success: true };
  });
}

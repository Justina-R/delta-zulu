import { FastifyInstance } from 'fastify';

export default async function courseRoutes(fastify: FastifyInstance) {
  const authenticate = (fastify as any).authenticate;

  // List all courses (Public or Student)
  fastify.get('/', async (request, reply) => {
    return await fastify.prisma.course.findMany({
      include: { modules: { orderBy: { order: 'asc' } } }
    });
  });

  // Get course detail
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const course = await fastify.prisma.course.findUnique({
      where: { id: Number(id) },
      include: { modules: { orderBy: { order: 'asc' } } }
    });
    if (!course) return reply.status(404).send({ error: 'Curso no encontrado' });
    return course;
  });

  // ADMIN ONLY ROUTES
  
  // Create Course
  fastify.post('/', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    
    const { nombre, descripcion, imagenUrl } = request.body;
    return await fastify.prisma.course.create({
      data: { nombre, descripcion, imagenUrl }
    });
  });

  // Create Module
  fastify.post('/:id/modules', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    
    const { id } = request.params;
    const { nombre, descripcion, imagenUrl, driveUrl, order } = request.body;
    
    return await fastify.prisma.module.create({
      data: {
        nombre,
        descripcion,
        imagenUrl,
        driveUrl,
        order: order || 0,
        courseId: Number(id)
      }
    });
  });

  // Delete Course
  fastify.delete('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    const { id } = request.params;
    await fastify.prisma.course.delete({ where: { id: Number(id) } });
    return { success: true };
  });
}

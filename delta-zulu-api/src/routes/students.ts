import { FastifyInstance } from 'fastify';

export default async function studentRoutes(fastify: FastifyInstance) {
  const authenticate = (fastify as any).authenticate;

  // ADMIN ONLY: List all students
  fastify.get('/', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    
    const students = await fastify.prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: { attempts: { include: { exam: true } } }
    });
    return students;
  });

  // ADMIN OR SELF: Get student by ID
  fastify.get('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    const { id } = request.params;
    
    if (request.user.role !== 'ADMIN' && request.user.id !== Number(id)) {
      return reply.status(403).send({ error: 'No autorizado' });
    }

    const student = await fastify.prisma.user.findUnique({
      where: { id: Number(id) },
      include: { attempts: { include: { exam: true } } }
    });
    
    if (!student) return reply.status(404).send({ error: 'Estudiante no encontrado' });
    return student;
  });

  // ADMIN ONLY: Create student
  fastify.post('/', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });

    const { nombre, apellido, email, password } = request.body;
    try {
      const student = await fastify.prisma.user.create({
        data: {
          nombre,
          apellido,
          email,
          password,
          role: 'STUDENT'
        }
      });
      return student;
    } catch (error) {
      return reply.status(400).send({ error: 'El email ya existe' });
    }
  });

  // ADMIN OR SELF: Update student
  fastify.put('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    const { id } = request.params;
    const { nombre, apellido, email, password } = request.body;

    if (request.user.role !== 'ADMIN' && request.user.id !== Number(id)) {
      return reply.status(403).send({ error: 'No autorizado' });
    }

    const data: any = { nombre, apellido, email };
    if (password) data.password = password;

    return await fastify.prisma.user.update({
      where: { id: Number(id) },
      data
    });
  });

  // ADMIN ONLY: Delete student
  fastify.delete('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    const { id } = request.params;

    // Borrar intentos de examen asociados
    await fastify.prisma.examAttempt.deleteMany({
      where: { studentId: Number(id) }
    });

    await fastify.prisma.user.delete({ where: { id: Number(id) } });
    return { success: true };
  });
}

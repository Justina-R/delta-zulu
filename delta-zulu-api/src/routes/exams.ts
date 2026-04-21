import { FastifyInstance } from 'fastify';

export default async function examRoutes(fastify: FastifyInstance) {
  const authenticate = (fastify as any).authenticate;

  // List exams
  fastify.get('/', async (request, reply) => {
    return await fastify.prisma.exam.findMany({
      include: { _count: { select: { questions: true } } }
    });
  });

  // Get exam with questions
  fastify.get('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    const { id } = request.params;
    const exam = await fastify.prisma.exam.findUnique({
      where: { id: Number(id) },
      include: { questions: true }
    });
    if (!exam) return reply.status(404).send({ error: 'Examen no encontrado' });
    return exam;
  });

  // ADMIN: Create Exam
  fastify.post('/', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    
    const { titulo, courseId, questions } = request.body;
    
    return await fastify.prisma.exam.create({
      data: {
        titulo,
        courseId: courseId ? Number(courseId) : null,
        questions: {
          create: questions // Expects array of { texto, opciones, correcta }
        }
      },
      include: { questions: true }
    });
  });

  // STUDENT: Submit Exam Attempt
  fastify.post('/:id/attempt', { preHandler: [authenticate] }, async (request: any, reply) => {
    const { id } = request.params;
    const { score } = request.body;
    
    return await fastify.prisma.examAttempt.create({
      data: {
        examId: Number(id),
        studentId: request.user.id,
        score: parseFloat(score)
      }
    });
  });
}

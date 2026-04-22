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
      include: { 
        questions: true,
        module: {
          include: {
            course: true
          }
        }
      }
    });
    if (!exam) return reply.status(404).send({ error: 'Examen no encontrado' });
    return exam;
  });

  // ADMIN: Create Exam
  fastify.post('/', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    
    const { titulo, moduleId, questions } = request.body;
    
    return await fastify.prisma.exam.create({
      data: {
        titulo,
        moduleId: moduleId ? Number(moduleId) : null,
        questions: {
          create: questions // Expects array of { texto, opciones, correcta }
        }
      },
      include: { questions: true }
    });
  });

  // ADMIN: Update Exam
  fastify.put('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    const { id } = request.params;
    const { titulo, moduleId, questions } = request.body;

    // Delete existing questions and recreate them (simpler for now)
    await fastify.prisma.question.deleteMany({ where: { examId: Number(id) } });

    const updateData: any = {
      titulo,
      questions: {
        create: questions
      }
    };

    if (moduleId !== undefined) {
      updateData.moduleId = moduleId ? Number(moduleId) : null;
    }

    return await fastify.prisma.exam.update({
      where: { id: Number(id) },
      data: updateData,
      include: { questions: true }
    });
  });

  // ADMIN: Delete Exam
  fastify.delete('/:id', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    const { id } = request.params;
    const examId = Number(id);
    if (isNaN(examId)) return reply.status(400).send({ error: 'ID de examen inválido' });

    try {
      await fastify.prisma.exam.delete({ where: { id: examId } });
      return { success: true };
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Error al eliminar el examen' });
    }
  });

  // STUDENT: Submit Exam Attempt
  fastify.post('/:id/attempt', { preHandler: [authenticate] }, async (request: any, reply) => {
    const { id } = request.params;
    const { answers } = request.body; // Expects { questionIndex: selectedOptionIndex }
    
    const exam = await fastify.prisma.exam.findUnique({
      where: { id: Number(id) },
      include: { questions: true }
    });
    
    if (!exam) return reply.status(404).send({ error: 'Examen no encontrado' });
    
    // Calcular puntaje en el servidor (Seguro)
    let correctCount = 0;
    exam.questions.forEach((q, index) => {
      // El frontend envía las respuestas con el índice de la pregunta
      if (answers[index] === q.correcta) {
        correctCount++;
      }
    });
    
    const calculatedScore = (correctCount / exam.questions.length) * 10;
    
    const attempt = await fastify.prisma.examAttempt.create({
      data: {
        examId: Number(id),
        studentId: request.user.id,
        score: parseFloat(calculatedScore.toFixed(2))
      }
    });

    return { score: attempt.score, passed: attempt.score >= 6 };
  });
}

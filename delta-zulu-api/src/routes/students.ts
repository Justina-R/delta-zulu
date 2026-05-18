import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';

export default async function studentRoutes(fastify: FastifyInstance) {
  const authenticate = (fastify as any).authenticate;

  // ADMIN ONLY: List all students
  fastify.get('/', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });
    
    const students = await fastify.prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: { 
        attempts: { include: { exam: true } },
        courses: true
      }
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
      include: { 
        attempts: { include: { exam: true } },
        courses: true
      }
    });
    
    if (!student) return reply.status(404).send({ error: 'Estudiante no encontrado' });
    return student;
  });

  // ADMIN ONLY: Create student
  fastify.post('/', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });

    const { nombre, apellido, email, password } = request.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const student = await fastify.prisma.user.create({
        data: {
          nombre,
          apellido,
          email,
          password: hashedPassword,
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
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

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

  // ADMIN ONLY: Add course to student
  fastify.post('/:studentId/courses/:courseId', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });

    const studentId = Number(request.params.studentId);
    const courseId = Number(request.params.courseId);

    // Verify student exists and has role STUDENT
    const student = await fastify.prisma.user.findUnique({
      where: { id: studentId }
    });
    if (!student) return reply.status(404).send({ error: 'Estudiante no encontrado' });
    if (student.role !== 'STUDENT') return reply.status(400).send({ error: 'El usuario no es un estudiante' });

    // Verify course exists
    const course = await fastify.prisma.course.findUnique({
      where: { id: courseId }
    });
    if (!course) return reply.status(404).send({ error: 'Curso no encontrado' });

    // Verify if already enrolled to avoid duplicates
    const isEnrolled = await fastify.prisma.user.findFirst({
      where: {
        id: studentId,
        courses: {
          some: { id: courseId }
        }
      }
    });
    if (isEnrolled) {
      return reply.status(400).send({ error: 'El estudiante ya está inscrito en este curso' });
    }

    // Enroll
    await fastify.prisma.user.update({
      where: { id: studentId },
      data: {
        courses: {
          connect: { id: courseId }
        }
      }
    });

    return { success: true, message: 'Curso asignado correctamente' };
  });

  // ADMIN ONLY: Remove course from student
  fastify.delete('/:studentId/courses/:courseId', { preHandler: [authenticate] }, async (request: any, reply) => {
    if (request.user.role !== 'ADMIN') return reply.status(403).send({ error: 'No autorizado' });

    const studentId = Number(request.params.studentId);
    const courseId = Number(request.params.courseId);

    // Verify student exists
    const student = await fastify.prisma.user.findUnique({
      where: { id: studentId }
    });
    if (!student) return reply.status(404).send({ error: 'Estudiante no encontrado' });

    // Verify course exists
    const course = await fastify.prisma.course.findUnique({
      where: { id: courseId }
    });
    if (!course) return reply.status(404).send({ error: 'Curso no encontrado' });

    // Unenroll
    await fastify.prisma.user.update({
      where: { id: studentId },
      data: {
        courses: {
          disconnect: { id: courseId }
        }
      }
    });

    return { success: true, message: 'Curso removido correctamente' };
  });
}

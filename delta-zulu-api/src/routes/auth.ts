import { FastifyInstance } from 'fastify';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', async (request: any, reply) => {
    const { email, password } = request.body;
    
    const user = await fastify.prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) { // In production use bcrypt!
      return reply.status(401).send({ error: 'Credenciales inválidas' });
    }

    const token = fastify.jwt.sign({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });

    return { 
      token, 
      user: { 
        id: user.id, 
        nombre: user.nombre, 
        apellido: user.apellido, 
        email: user.email, 
        role: user.role 
      } 
    };
  });

  // Get current user profile
  fastify.get('/me', { preHandler: [(fastify as any).authenticate] }, async (request: any, reply) => {
    return request.user;
  });
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function authRoutes(fastify) {
    fastify.post('/login', async (request, reply) => {
        const { email, password } = request.body;
        const user = await fastify.prisma.user.findUnique({
            where: { email }
        });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
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
    fastify.get('/me', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        return request.user;
    });
}

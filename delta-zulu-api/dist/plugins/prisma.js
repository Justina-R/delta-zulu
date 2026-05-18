"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const prismaPlugin = (0, fastify_plugin_1.default)(async (server) => {
    const pool = new pg_1.default.Pool({
        connectionString: process.env.DATABASE_URL,
    });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    const prisma = new client_1.PrismaClient({ adapter });
    await prisma.$connect();
    server.decorate('prisma', prisma);
    server.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
        await pool.end();
    });
});
exports.default = prismaPlugin;

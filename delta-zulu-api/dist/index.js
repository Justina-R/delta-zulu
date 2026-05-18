"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const dotenv = __importStar(require("dotenv"));
const prisma_js_1 = __importDefault(require("./plugins/prisma.js"));
const students_js_1 = __importDefault(require("./routes/students.js"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const courses_js_1 = __importDefault(require("./routes/courses.js"));
const exams_js_1 = __importDefault(require("./routes/exams.js"));
dotenv.config();
const fastify = (0, fastify_1.default)({
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
fastify.register(cors_1.default, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
});
fastify.register(jwt_1.default, {
    secret: process.env.JWT_SECRET,
    sign: {
        expiresIn: '1h'
    }
});
fastify.register(prisma_js_1.default);
// Auth Decorator
fastify.decorate('authenticate', async (request, reply) => {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        reply.send(err);
    }
});
// Register Routes
fastify.register(auth_js_1.default, { prefix: '/api/auth' });
fastify.register(students_js_1.default, { prefix: '/api/students' });
fastify.register(courses_js_1.default, { prefix: '/api/courses' });
fastify.register(exams_js_1.default, { prefix: '/api/exams' });
// Root route for debugging
fastify.get('/', async () => {
    return { message: 'Delta Zulu API Operativa', version: '1.0.0' };
});
// Basic Health Check
fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});
// Duplicate health check under /api/health for consistency
fastify.get('/api/health', async () => {
    return { status: 'ok', message: 'API Health is good' };
});
const start = async () => {
    try {
        const port = Number(process.env.PORT) || 3000;
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`Server is running at http://localhost:${port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
if (process.env.NODE_ENV !== 'test') {
    start();
}
exports.default = async (req, res) => {
    await fastify.ready();
    fastify.server.emit('request', req, res);
};

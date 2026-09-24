"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaDB = void 0;
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
    // o ! é uma afirmação para o TypeScript de que essa variável estará definida em tempo de execução.
});
exports.prismaDB = new client_1.PrismaClient({ adapter });
//# sourceMappingURL=prisma.js.map
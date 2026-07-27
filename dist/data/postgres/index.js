"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../../generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const envs_1 = require("../../config/envs");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: envs_1.envs.POSTGRES_URL,
});
exports.prisma = new client_1.PrismaClient({
    adapter,
});
//# sourceMappingURL=index.js.map
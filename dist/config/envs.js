"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    PUBLIC_PATH: (0, env_var_1.get)('PUBLIC_PATH').default('public').asString(),
    POSTGRES_URL: (0, env_var_1.get)('POSTGRES_URL').required().asString(),
    POSTGRES_USER: (0, env_var_1.get)('POSTGRES_USER').required().asString(),
    POSTGRES_DB: (0, env_var_1.get)('POSTGRES_DB').required().asString(),
    POSTGRES_PORT: (0, env_var_1.get)('POSTGRES_PORT').required().asPortNumber(),
    POSTGRES_PASSWORD: (0, env_var_1.get)('POSTGRES_PASSWORD').required().asString(),
    NODE_ENV: (0, env_var_1.get)('NODE_ENV').required().asString(),
};
//# sourceMappingURL=envs.js.map
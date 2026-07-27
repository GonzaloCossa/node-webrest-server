"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./presentation/server");
const routes_1 = require("./presentation/routes");
const envs_1 = require("./config/envs");
(async () => {
    main();
})();
function main() {
    const server = new server_1.Server({
        port: envs_1.envs.PORT,
        routes: routes_1.AppRoutes.routes,
        public_path: envs_1.envs.PUBLIC_PATH,
    });
    server.start();
}
//# sourceMappingURL=app.js.map
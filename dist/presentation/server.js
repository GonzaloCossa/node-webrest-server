"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Server {
    app = (0, express_1.default)();
    port;
    routes;
    publicPath;
    constructor(options) {
        this.port = options.port;
        this.routes = options.routes;
        this.publicPath = options.public_path ?? 'public';
    }
    async start() {
        // Middlewares
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Public Folder
        this.app.use(express_1.default.static(this.publicPath));
        // Routes
        this.app.use(this.routes);
        this.app.get('/*path', (req, res) => {
            const indexPath = path_1.default.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        });
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
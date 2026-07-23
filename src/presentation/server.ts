import express, { Router } from 'express';
import path from 'path'

interface Options {
    port: number,
    routes: Router,
    public_path?: string,
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(options: Options) {
        this.port = options.port;
        this.routes = options.routes;
        this.publicPath = options.public_path ?? 'public';
    }

    async start() {

        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded());

        // Public Folder
        this.app.use(express.static(this.publicPath));

        // Routes
        this.app.use(this.routes);

        this.app.get('/*path', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        });

        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        });
    }
}
import express from 'express';
import path from 'path'

interface Options {
    PORT: number,
    PUBLIC_PATH?: string,
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        this.port = options.PORT;
        this.publicPath = options.PUBLIC_PATH ?? 'public';
    }

    async start() {

        // Middlewares

        // Public Folder
        this.app.use(express.static(this.publicPath));

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
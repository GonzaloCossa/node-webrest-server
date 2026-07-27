"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const server = http_1.default.createServer((req, res) => {
    console.log(req.url);
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write(`<h1>Url: ${req.url}</h1>`);
    // res.end();
    // const data = {
    //     name: 'John Doe', 
    //     age: 30,
    //     city: 'New York',
    // };
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end(JSON.stringify(data));
    if (req.url === '/') {
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }
    ;
    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    ;
    const responseContent = fs_1.default.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
});
server.listen(8080, () => { console.log('Servidor corriendo en el puerto 8080'); });
//# sourceMappingURL=app.http.js.map
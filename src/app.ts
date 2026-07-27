import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';
import { envs } from './config/envs';

(async () => {
    main();
})();

function main(){
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
        public_path: envs.PUBLIC_PATH,
    });

    server.start();
}
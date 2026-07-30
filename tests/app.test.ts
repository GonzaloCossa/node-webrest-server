// import { config } from 'dotenv';
import { Server } from '../src/presentation/server';
import { envs } from '../src/config/envs';

// config({
//     path: '.env.test'
// });

jest.mock('../src/presentation/server')

describe('Should call server start with', () => {
    test('should work', async () => {
        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            "port": envs.PORT,
            "public_path": "public",
            "routes": expect.any(Function)
        });

        expect(Server.prototype.start).toHaveBeenCalled();
});
});
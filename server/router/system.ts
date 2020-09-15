import Router from 'koa-router';

import { getDate } from '../utils/util';
import { Response } from '../interfaces/response';

import { CLINET_VERSION } from '../config/config';

const router = new Router();

router.post('/getClientVersion', async (ctx, next) => {
    console.log(`[System] ${getDate()} get clinet version.`);

    const response: Response = {
        error: 0,
        content: {
            version: CLINET_VERSION,
        }
    };

    ctx.response.body = response;
});

export default router.routes();
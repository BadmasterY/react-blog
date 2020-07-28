import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

import { getDate, mkdirsSync } from '../utils/util';

import { UploadImageRequest, DocsImageRequest } from '../interfaces/image';

import {
    UploadImageResponse,
} from '../interfaces/response';

const router = new Router();

router.post('/uploadImage', async (ctx, next) => {
    const file = ctx.request.files;
    const uploadData: UploadImageRequest = ctx.request.body;
    const { id } = uploadData;

    console.log(`[image] ${getDate()} uploadImage: ${id}`);

    const response: UploadImageResponse = { error: 1 };

    if (file && id) {
        const filePath = path.join(`images/docs/${id}`); // 存储目录

        if (!fs.existsSync(filePath)) {
            mkdirsSync(filePath);
        }

        fs.renameSync(file.file.path, `${filePath}/${file.file.name}`); // 写入文件, 并修改位置

        response.error = 0;
        response.content = {
            url: `/image/docs?id=${id}`,
        };
    } else {
        response.msg = '文件异常!';
    }

    ctx.response.body = response;
});

router.get('/docs', async ctx => {
    const query: DocsImageRequest = ctx.request.query;
    const { id } = query;

    const filePath = path.join(`images/docs/${id}`);

    const files = fs.readdirSync(filePath);
    const image = files[0];
    const url = `${filePath}/${image}`;

    fs.access(url, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`[image] docs Error:`, err);
            return;
        }
    });

    const readStream = fs.createReadStream(url);

    ctx.body = readStream;
});

export default router.routes();
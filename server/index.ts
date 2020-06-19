import http from 'http';
import path from 'path';

import Koa from 'koa';
import KoaBody from 'koa-body';
import cors from 'koa2-cors';
import KoaStatic from 'koa-static';
import mount from 'koa-mount';

import { routes } from './router';
import { HTTP, SERVER } from './config/config';

const app = new Koa();

app.use(cors({ origin: 'true' }));
app.use(mount('/', KoaStatic(path.join(__dirname, 'public'))));
app.use(mount('/article', KoaStatic(path.join(__dirname, 'public'))));
app.use(mount('/management', KoaStatic(path.join(__dirname, 'public'))));
app.use(KoaBody({
    multipart: true, // 解析 multipart bodies, 默认为 false
    jsonLimit: SERVER.jsonLimit, // 控制body的parse转换大小 default 1mb
    formLimit: SERVER.formLimit  //  控制你post的大小  default 56kb
}));
app.use(routes);

app.on('error', error => {
    console.log('[koa] app-level error: ', { error });
});

const server = new http.Server(app.callback());

server.listen(HTTP, () => {
    console.log(`[http] server run at http://${HTTP.host}:${HTTP.port}...`);
});

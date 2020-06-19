import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

import Users from './user';
import Article from './article';
import Comment from './comment';
import Setting from './setting';
import Group from './group';
import System from './system';

const router = new Router();

router.use('/user', Users);
router.use('/article', Article);
router.use('/comment', Comment);
router.use('/system', Setting);
router.use('/group', Group);
router.use('/system', System);

// TODO: 更优雅的路由
router.get('/*', ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('index.html');
});

const routes = router.routes();

export {
    routes,
}
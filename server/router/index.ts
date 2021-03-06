import fs from 'fs';
import Router from 'koa-router';

import Users from './user';
import Article from './article';
import Comment from './comment';
import Setting from './setting';
import Group from './group';
import System from './system';
import Image from './image';

const router = new Router();

router.get('/', ctx => {});

router.get('/article/*', ctx => {});

router.get('/about', ctx => {});

router.get('/user', ctx => {});

router.get('/setting', ctx => {});

router.use('/user', Users);
router.use('/article', Article);
router.use('/comment', Comment);
router.use('/system', Setting);
router.use('/group', Group);
router.use('/system', System);
router.use('/image', Image);

// TODO: 更优雅的路由
router.get('/*', ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('index.html');
});

const routes = router.routes();

export {
    routes,
}
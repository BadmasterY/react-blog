import fs from 'fs';
import Router from 'koa-router';

import Users from './user';
import Article from './article';
import Comment from './comment';
import Setting from './setting';
import Group from './group';

const router = new Router();

router.use('/user', Users);
router.use('/article', Article);
router.use('/comment', Comment);
router.use('/system', Setting);
router.use('/group', Group);

// TODO: 更优雅的路由
router.get('/*', ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('public/index.html');
});

const routes = router.routes();

export {
    routes,
}
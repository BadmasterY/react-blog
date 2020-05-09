/**
 * 创建可食用的数据库实例
 */

import { connectMongoDB, closeMongoDB } from './base/Mongo';
import { Users, Articles, Comments, Settings } from './models';
import { Dao } from './base/Dao';
import { onConectedFn } from './base/Plugin';

const users = new Dao(Users);
const articles = new Dao(Articles);
const comments = new Dao(Comments);
const settings = new Dao(Settings);

connectMongoDB(onConectedFn.bind(null, users, settings));

export {
    users,
    articles,
    comments,
    settings,
}
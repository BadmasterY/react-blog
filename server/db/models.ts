/**
 * 创建模型
 * 可以都写在这个文件
 * 也可以拆分在不同的文件
 */
import { createModel } from './base/Model';
import { Schema } from 'mongoose';

const Users = createModel('users', {
    url: String,
    bio: String,
    avatarUrl: String,
    nickname: String,
    username: String,
    password: String,
    position: Schema.Types.ObjectId,
    removed: Number,
    useState: Number,
});

const Articles = createModel('articles', {
    authorId: Schema.Types.ObjectId,
    title: String,
    content: Object,
    removed: Number,
});

const Comments = createModel('comments', {
    articleId: Schema.Types.ObjectId,
    title: String,
    authorId: Schema.Types.ObjectId,
    replyId: Schema.Types.ObjectId,
    content: String,
    removed: Number,
    datetime: String,
    avatar: String,
});

const Settings = createModel('settings', {
    isUseRegister: Boolean,
    updateUserId: Schema.Types.ObjectId,
});

const Groups = createModel('groups', {
    name: String,
    removed: Number,
    useState: Number, // 账号创建/修改时无法变更为未启用的组
});

export {
    Users,
    Articles,
    Comments,
    Settings,
    Groups,
}
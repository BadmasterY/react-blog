import mongoose, { Schema } from 'mongoose';

interface modelBase {
    id?: string;
    _id?: string;
    createTime?: string;
    updatedAt?: string;
}

interface Users extends modelBase {
    url: string;
    bio: string;
    avatarUrl: string;
    nickname: string;
    username: string;
    password: string;
    position: mongoose.Types.ObjectId;
    removed: number;
    useState: number;
}

interface Articles extends modelBase {
    authorId: Schema.Types.ObjectId;
    title: string;
    content: string;
    removed: number;
}

interface Comments extends modelBase {
    articleId: Schema.Types.ObjectId;
    content: string;
    authorId: Schema.Types.ObjectId;
    removed: number;
    datetime: string;
    avatar: string;
}

interface Settings extends modelBase {
    isUseRegister: boolean;
    updateUserId?: Schema.Types.ObjectId;
}

interface Groups extends modelBase {
    name: string;
    removed: number;
    useState: number;
}

export {
    Users,
    Articles,
    Comments,
    Settings,
    Groups,
}
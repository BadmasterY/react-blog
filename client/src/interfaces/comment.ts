interface UploadComment {
    id?: string;
    articleId: string;
    authorId: string;
    replyId?: string;
    replier?: {
        _id: string;
        nickname: string;
    }[];
    avatar: string;
    content: string;
    datetime: string;
}

export interface List extends UploadComment {
    author: {
        _id: string;
        avatarUrl?: string;
        nickname: string;
        bio: string;
        url: string;
    }[];
    createTime?: string;
    updatedAt?: string;
}

interface CommentState {
    list: List[];
    isReply: boolean;
    reply: CommentReply;
}

interface CommentReply {
    articel?: {
        id: string;
        title: string;
        url: string;
    };
    author?: {
        id: string;
        nickname: string;
        avatarUrl?: string;
        articelId: string;
        url: string;
        bio: string;
    };
}

interface CommentPayload {
    comment?: List;
    list?: List[];
    reply?: CommentReply;
}

interface CommentAction {
    type?: string;
    payload?: CommentPayload;
}

export type Action = CommentAction;
export type State = CommentState;
export type Payload = CommentPayload;
export type Comment = UploadComment;
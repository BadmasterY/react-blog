import { State as CommentState } from './comment';
import { OutputData } from '@editorjs/editorjs';

interface BaseResponse {
    error: 0 | 1;
    msg?: string;
}

interface UserContent {
    id?: string;
    url?: string;
    bio?: string;
    nickname?: string;
    username?: string;
    position?: string;
}

interface UserResponse extends BaseResponse {
    content?: UserContent;
}

interface UserListItem {
    key?: string;
    id?: string;
    nickname?: string;
    username?: string;
    position?: string;
    useState?: number;
}

interface UserListContent {
    maxLength?: number;
    users?: UserListItem[];
}

interface UserListResponse extends BaseResponse {
    content?: UserListContent;
}

interface ArticleListItem {
    _id: string;
    authorId: string;
    author: {
        bio: string;
        url: string;
        nickname: string;
        username: string;
    };
    title: string;
    content: OutputData;
    removed: number;
    createTime: string;
    updatedAt: string;
}

interface ArticleListContent {
    maxLength: number;
    articles?: ArticleListItem[];
}

interface ArticleListResponse extends BaseResponse {
    content?: ArticleListContent;
}

interface ArticleItemContent extends ArticleListItem {
    comments: CommentState;
}

interface ArticleResponse extends BaseResponse {
    content?: ArticleItemContent;
}

interface ArticlesItem {
    key?: string;
    id: string;
    title: string;
    author: string;
    createTime: string;
    updatedAt: string;
}

interface ArticlesResponse extends BaseResponse {
    content?: {
        maxLength: number;
        articles: ArticlesItem[];
    };
}

interface UserUploadAvatarResponse extends BaseResponse {
    content?: {
        avatarUrl: string;
    }
}

interface CommentsItem {
    key?: string;
    id: string;
    authorId: string;
    author: {
        id: string;
        nickname: string;
    };
    avatar: string;
    content: string;
    createTime: string;
    updatedAt: string;
}

interface CommentsResponse extends BaseResponse {
    content?: {
        maxLength: number;
        comments: CommentsItem[];
    }
}

interface GetUserInfoResult extends BaseResponse {
    content?: {
        articles: number;
        comments: number;
    }
}

interface GetSettingResult extends BaseResponse {
    content?: {
        id: string;
        isUseRegister: boolean;
    }
}

interface GroupListItem {
    id: string;
    name: string;
}

interface GroupsItem extends GroupListItem {
    useState: number;
}

interface GetGroupsResponse extends BaseResponse {
    content?: {
        maxLength: number,
        groups: GroupsItem[],
    }
}

interface GetGroupListResponse extends BaseResponse {
    content?: {
        grouplist: GroupListItem[],
    }
}

interface GetArticlesLengthResponse extends BaseResponse {
    content?: {
        length: number;
    }
}

interface GetCommentsLengthResponse extends GetArticlesLengthResponse {}

interface GetSiteVersionResponse extends BaseResponse {
    content?: {
        version: string;
    }
}

export type Response = BaseResponse;
export type UserRes = UserResponse;
export type UserList = UserListResponse;
export type ListContent = UserListItem;
export type ArticleListRes = ArticleListResponse;
export type ArticleItem = ArticleListItem;
export type ArticleRes = ArticleResponse;
export type Articles = ArticlesItem;
export type ArticlesRes = ArticlesResponse;
export type Comments = CommentsItem;
export type CommentsRes = CommentsResponse;
export type UserInfoResult = GetUserInfoResult;
export type UserUploadAvatarRes = UserUploadAvatarResponse;
export type SettingResult = GetSettingResult;
export type GroupItem = GroupsItem;
export type Groups = GetGroupsResponse;
export type GroupListContent = GroupListItem;
export type GroupList = GetGroupListResponse;
export type ArticleLength = GetArticlesLengthResponse;
export type CommentLength = GetCommentsLengthResponse;
export type SiteVersion = GetSiteVersionResponse;
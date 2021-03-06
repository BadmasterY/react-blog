import { Users, Groups } from './models';

interface UserList {
    id?: string;
    nickname?: string;
    username?: string;
    position?: string;
    useState?: number;
}

interface UserDataResult {
    id?: string;
    _id?: string;
    createTime?: string;
    updatedAt?: string;
    url: string;
    bio: string;
    avatarUrl: string;
    nickname: string;
    username: string;
    password: string;
    removed: number;
    useState: number;
    position: Groups[],
}

interface GetUsersRequest {
    page: number;
    pageSize: number;
    query: object;
}

interface RegisterUserRequest {
    username: string;
    nickname: string;
    password: string;
}

interface ResetpassUserRequest {
    id: string;
    oldpass: string;
    newpass: string;
}

interface DeleteUserRequest {
    id: string;
}

interface UpdateUserRequest {
    id: string;
    updateUserData: Users;
}

interface UserInfoRequest {
    id: string;
}

interface UserUploadAvatar {
    userId: string;
    filename: string;
}

interface AddUserRequest {
    username: string;
    password: string;
    position: string;
    useState: number;
}

export {
    UserList as List,
    GetUsersRequest as GetRequest,
    DeleteUserRequest as DeleteRequest,
    UpdateUserRequest as UpdateRequest,
    RegisterUserRequest as RegisterRequest,
    ResetpassUserRequest as ResetpassRequest,
    UserInfoRequest,
    UserUploadAvatar,
    UserDataResult,
    AddUserRequest,
}
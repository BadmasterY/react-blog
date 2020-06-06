interface GetGroupsRequest {
    page: number;
    pageSize: number;
    query: object;
}

interface ResponseGroupList {
    id: string;
    name: string;
    useState: number;
}

interface DeleteGroupRequest {
    id: string;
}

interface UpdateGroupRequest {
    id: string;
    name: string;
    useState: number;
}

interface AddGroupRequest {
    name: string;
    useState: number;
}

export {
    GetGroupsRequest,
    ResponseGroupList,
    DeleteGroupRequest,
    UpdateGroupRequest,
    AddGroupRequest,
}
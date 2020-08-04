// 评论
import { State, Action, Payload } from '../../interfaces/comment';

// actions
export const types = {
    GET: 'commentGet',
    ADD: 'commentAdd',
    DELETE: 'commentDelete',
    REVISE: 'commentRevise',
    SETREPLY: 'commentSetReply',
    CLEARREPLY: 'commentClearReply',
    SETISREPLY: 'commentSetIsReply',
    CLEARISREPLY: 'commentClearIsReply',
};

const initialState: State = {
    list: [],
    isReply: false,
    reply: {},
};

// reducers
export default function reducer(state = initialState, action: Action = {}) {
    const { payload } = action;

    switch (action.type) {
        case types.GET:
            return Object.assign({}, state, { list: payload?.list });
        case types.ADD:
            const newState = Object.assign({}, state);
            if (payload?.comment) newState.list.push(payload.comment);
            return newState;
        case types.DELETE:
            return state;
        case types.REVISE:
            return state;
        case types.SETREPLY:
            return Object.assign({}, state, { reply: payload?.reply });
        case types.CLEARREPLY:
            return Object.assign({}, state, { reply: {} });
        case types.SETISREPLY:
            return Object.assign({}, state, { isReply: true });
        case types.CLEARISREPLY:
            return Object.assign({}, state, { isReply: false });
        default:
            return state;
    }
};

// Action creators
export const actions = {
    commentGet: (payload: Payload) => ({ type: types.GET, payload }),
    commentAdd: (payload: Payload) => ({ type: types.ADD, payload }),
    commentDelete: (id: string) => ({ type: types.DELETE, payload: { id } }),
    commentRevise: (id: string, content: string) => ({ type: types.REVISE, payload: { id, content } }),
    commentSetReply: (payload: Payload) => ({ type: types.SETREPLY, payload }),
    commentClearReply: () => ({ type: types.CLEARREPLY }),
    commentSetIsReply: () => ({ type: types.SETISREPLY }),
    commentClearIsReply: () => ({ type: types.CLEARISREPLY }),
};
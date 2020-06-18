import { Action, State, Payload } from '../../interfaces/system';
const { version } = require('../../../package.json');

// actions
export const types = {
    ISLOADING: 'systemLoading',
    LOADED: 'systemLoaded',
    SETARTICLES: 'systemSetArticles',
    SETCOMMENTS: 'systemSetComments',
};

const initialState: State = {
    VERSION: version,
    isLoading: true,
    articles: 0,
    comments: 0,
}

// reducer
export default function reducer(state = initialState, action: Action = {}) {
    const { payload } = action;

    switch (action.type) {
        case types.ISLOADING:
            return Object.assign({}, state, { isLoading: true });
        case types.LOADED:
            return Object.assign({}, state, { isLoading: false });
        case types.SETARTICLES:
            return Object.assign({}, state, { articles: payload?.articles || 0 });
        case types.SETCOMMENTS:
            return Object.assign({}, state, { comments: payload?.comments || 0 });
        default:
            return state;
    }
}

// Action creators
export const actions = {
    systemLoading: () => ({ type: types.ISLOADING }),
    systemLoaded: () => ({ type: types.LOADED }),
    systemSetArticles: (payload: Payload) => ({ type: types.SETARTICLES, payload }),
    systemSetComments: (payload: Payload) => ({ type: types.SETCOMMENTS, payload }),
}
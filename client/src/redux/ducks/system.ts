import { Action, State, Payload } from '../../interfaces/system';

// actions
export const types = {
    ISLOADING: 'systemLoading',
    LOADED: 'systemLoaded',
};

const initialState: State = {
    isLoading: true,
}

// reducer
export default function reducer(state = initialState, action: Action = {}) {
    const { payload } = action;

    switch (action.type) {
        case types.ISLOADING:
            return Object.assign({}, state, { isLoading: true });
        case types.LOADED:
            return Object.assign({}, state, { isLoading: false });
        default:
            return state;
    }
}

// Action creators
export const actions = {
    systemLoading: () => ({ type: types.ISLOADING }),
    systemLoaded: () => ({ type: types.LOADED }),
}
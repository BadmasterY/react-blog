import { Action, State, Payload } from '../../interfaces/setting';

// actions
export const types = {
    GET: 'settingGet',
    UPDATE: 'settingUpdate',
};

const initialState: State = {
    id: '',
    isUseRegister: true,
}

// reducer
export default function reducer(state = initialState, action: Action = {}) {
    const { payload } = action;

    switch (action.type) {
        case types.GET:
            return Object.assign({}, state, payload);
        case types.UPDATE:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

// Action creators
export const actions = {
    settingGet: (payload: Payload) => ({ type: types.GET, payload }),
    settingUpdate: (payload: Payload) => ({ type: types.UPDATE, payload }),
}
/* eslint-disable prettier/prettier */
const initialState = {
    credit: 0,
    curentAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        // case 'CHANGE_USERNAME_FIELD':
        //     return Object.assign({}, state, { username: action.value });
        // case 'CHANGE_PASSWORD_FIELD':
        //     return Object.assign({}, state, { password: action.value });
        // case 'CHANGE_LOADING_STATE':
        //     return Object.assign({}, state, { loading: action.value });
        // case 'CHANGE_ERROR':
        //     return Object.assign({}, state, { error: action.value });
        // case 'RESET_FORM':
        //     return Object.assign({}, state, { error: '', username: '', password: '', loading: false });
        default:
            return state;
    }
};

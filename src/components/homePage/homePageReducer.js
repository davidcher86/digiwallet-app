/* eslint-disable prettier/prettier */
const initialState = {
    assets: 0,
    totalDebt: 0,
    currentMonthDebt: 0,
    totalAssets: 0,
    userDetails: null,
    creditCards: [],
    creditCardList: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RECIEVE_DATA':
            var data = action.data;
            // return state;
            return Object.assign({}, state, {
                assets: data.assets,
                lastUpdate: data.lastUpdate,
                creditCards: data.creditCards,
                userDetails: data.details ,
                creditCardList: data.creditCards,
            });
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

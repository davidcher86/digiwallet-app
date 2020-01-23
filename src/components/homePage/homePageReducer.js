/* eslint-disable prettier/prettier */
const initialState = {
    assets: 0,
    totalCredit: 0,
    currentMonthCredit: 0,
    totalAssets: 0,
    userDetails: null,
    creditCards: [],
    creditCardList: [],

    credit: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RECIEVE_DATA':
            var data = action.data;
            return Object.assign({}, state, {
                assets: data.assets,
                lastUpdate: data.lastUpdate,
                creditCards: data.creditCards,
                userDetails: data.details ,
                creditCardList: data.creditCards,
                totalCredit: data.totalCredit,
                currentMonthCredit: data.currentMonthCredit,
                credit: data.fixedList,
                sallary: data.sallary,
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

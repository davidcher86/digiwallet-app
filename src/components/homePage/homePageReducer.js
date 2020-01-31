/* eslint-disable prettier/prettier */
const initialState = {
    assets: 0,
    totalCredit: 0,
    currentMonthCredit: 0,
    totalAssets: 0,
    userDetails: null,
    creditCards: [],
    creditCardList: [],
    creditDebt: [],
    dataLaodet: false,
    credit: [],
    pageSettings: {
        isOpenIndex: null,
    },
};

export default (state = initialState, action) => {
    let pageSettings;
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
                creditDebt: data.creditDebt,

                dataLaodet: true,
            });
        case 'CHANGE_OPEN_CREDIT_INDEX':
            pageSettings = state.pageSettings;
            pageSettings.isOpenIndex = (pageSettings.isOpenIndex === action.uid ? null : action.uid);
            return Object.assign({}, state, {pageSettings: pageSettings});
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

/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import loginReducer from './../components/login/loginReducer';
import dashboardReducer from './../components/dashboard/dashboardReducer';
import transactionsReducer from '../components/transactions/transactionsReducer';
import homePage from '../components/homePage/homePageReducer';
// import financialActionList from '../components/transactions/transactionsReducer';
import accountReducer from './../components/account/accountReducer';
// import homePage from './../components/homePage/homePageReducer';

export default combineReducers({
    login: loginReducer,
    // financialActions: financialActionList,
    dashboard: dashboardReducer,
    transactions: transactionsReducer,
    homePage: homePage,
    account: accountReducer,
});

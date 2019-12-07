/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import loginReducer from './../components/login/loginReducer';
import dashboardReducer from './../components/dashboard/dashboardReducer';
import transactionsReducer from '../components/transactions/transactionsReducer';
import homePage from '../components/homePage/homePageReducer';
import newTransactionModalReducer from '../components/newTransactionModal/newTransactionModalReducer';
import accountReducer from './../components/account/accountReducer';
import systemControl from './../components/systemControl/systemControlReducer';
import identity from './../components/identity/identityReducer';

export default combineReducers({
    login: loginReducer,
    dashboard: dashboardReducer,
    transactions: transactionsReducer,
    homePage: homePage,
    account: accountReducer,
    newTransactionModal: newTransactionModalReducer,
    systemControl: systemControl,
    identity: identity,
});

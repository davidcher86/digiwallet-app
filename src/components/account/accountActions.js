import {firebaseAction} from './../../Api';
import {
  startLoading,
  endLoading,
} from './../systemControl/systemControlActions';
import firebase from 'firebase';

export const changeAccountFieldValue = (field, value) => {
  return {
    type: 'UPDATE_ACCOUNT_FORM_ACCOUNT',
    value,
    field,
  };
};

export const changeUserFieldValue = (field, value) => {
  return {
    type: 'UPDATE_ACCOUNT_FORM_USER',
    value,
    field,
  };
};

export const changeCreditFieldValue = (field, value, index) => {
  return {
    type: 'UPDATE_ACCOUNT_FORM_CREDIT',
    value,
    field,
    index,
  };
};

export const changeSallaryFieldValue = (field, value) => {
  return {
    type: 'UPDATE_ACCOUNT_FORM_SALLARY',
    value,
    field,
  };
};

export const changePageSettings = value => {
  return {
    type: 'UPDATE_ACCOUNT_FORM',
    value,
  };
};

export const handleStep = value => {
  return {
    type: 'UPDATE_STEP',
    value,
  };
};

export const handlePickerChange = (itemValue, itemIndex) => {
  return {
    type: 'UPDATE_ACCOUNT_FORM',
    value: itemValue,
  };
};

const defaultCategories = {
  car: ['Gas', 'license Renewel', 'Insuranes'],
  'house Hold': ['Electric Bill', 'Water Bill', 'Gas Bill'],
  shopping: ['groceries', 'cloths', 'food'],
};

export const handleRegisterAccount = (account, uid, navigation) => dispatch => {
  var sortedMainCategories = [];
  // defaultCategories.forEach(item => {
    for (var key in defaultCategories) {
      sortedMainCategories.push(key);
    }
  // });

  const json = {
    sallary: account.sallary,
    creditCards: account.creditCards,
    details: account.user,
    transactions: account.transactions,
    assets: account.assets,
    darkMode: true,
    sortedMainCategories: JSON.stringify(sortedMainCategories),
    categories: JSON.stringify(defaultCategories),
  };

  var dtNow = new Date();
  dtNow.setDate(account.sallary.paymentDate);
  if (dtNow < new Date()) {
    dtNow.setMonth(dtNow.getMonth() + 1);
  }
  json.sallary.paymentDate = dtNow.toISOString();
  json.sallary.lastUpdated = dtNow.toISOString();
  if (json.creditCards.length > 0) {
    for (var i = 0; i < json.creditCards.length; i++) {
      let dt = new Date();
      dt.setDate(json.creditCards[i].billingDate);

      if (new Date() > dt) {
        dt.setMonth(dt.getMonth() + 1);
      }

      json.creditCards[i].nextDebtDate = dt.toISOString();
    }
  }

  dispatch(startLoading());
  firebaseAction(uid, 'account', 'add', json)
    .then(res => {
      navigation.navigate('HomePage');
      dispatch(endLoading());
      return res;
    })
    .catch(err => {
      console.log('Error register new account, Exception:', err);
    });
};

export const setAccountDetails = account => {
  return {
    type: 'SET_ACCOUNT_DETAILS',
    account,
  };
};

export const fetchAccount = uid => {
  return dispatch => {
    const dataRef = firebase.database().ref(`/users/${uid}/account`);

    dispatch(startLoading());
    dataRef
      .once('value')
      .then(function(snapshot) {
        var res = snapshot.val();

        if (res !== null && res.assets !== null) {
          var account = {
            assets: res.assets,
            creditCards: res.creditCards,
            user: res.details,
            sallary: res.sallary,
          };

          dispatch(setAccountDetails(account));
        }
        dispatch(endLoading());
      })
      .catch(r => {
        console.log('Error fetching account from Firebase, Exception: ' + r);
      });
  };
};

export const handleUpdaeAccount = (account, uid, navigation) => dispatch => {
  const json = {
    sallary: account.sallary,
    creditCards: account.creditCards,
    details: account.user,
    assets: account.assets,
  };

  // var dtNow = new Date();
  // dtNow.setDate(account.sallary.paymentDate);
  // console.log('dtNow', account);
  // if (dtNow < new Date()) {
  //   console.log(dtNow.getMonth() + 1);
  //   dtNow.setMonth(dtNow.getMonth() + 1);
  // }
  // console.log(dtNow);
  // account.sallary.paymentDate = dtNow.toISOString();

  dispatch(startLoading());
  firebase
    .database()
    .ref(`/users/${uid}/account`)
    .update({
      assets: account.assets,
      details: account.user,
      sallary: account.sallary,
      creditCards: account.creditCards,
    })
    .then(res => {
      // console.log(res);
      navigation.navigate('HomePage');
      dispatch(endLoading());
    });
};

export const setErrors = errors => {
  return {
    type: 'SET_ACCOUNT_ERRORS',
    errors,
  };
};

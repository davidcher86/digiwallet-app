import {firebaseAction} from './../../Api';
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

export const handleRegisterAccount = (account, uid, navigation) => dispatch => {
  const json = {
    sallary: account.sallary,
    creditCards: account.creditCards,
    details: account.user,
    transactions: account.transactions,
    assets: account.assets,
  };

  firebaseAction(uid, 'account', 'add', json)
    .then(res => {
      navigation.navigate('HomePage');
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
    // firebaseAction(uid, 'transactions', 'read', null, setTransactions)
    // .then(res => {
    //   console.log(res);
    // })

    const dataRef = firebase.database().ref(`/users/${uid}/account`);
    dataRef
      .once('value')
      .then(function(snapshot) {
        var res = snapshot.val();
        var account = {
          assets: res.assets,
          creditCards: res.creditCards,
          user: res.details,
          sallary: res.sallary,
        };

        dispatch(setAccountDetails(account));
      })
      .catch(r => {
        console.log('Error fetching account from Firebase, Exception: ' + r);
      });
  };
};

export const handleUpdaeAccount = (account, uid) => dispatch => {
  console.log('edit: ', account);
  const json = {
    sallary: account.sallary,
    creditCards: account.creditCards,
    details: account.user,
    assets: account.assets,
  };

  firebase
    .database()
    .ref(`/users/${uid}/account`)
    .update({
      'assets': account.assets,
      'details': account.user,
      'sallary': account.sallary,
      'creditCards': account.creditCards,
    })
    .then(res => {
      console.log(res);
    });
  // const jsonToSend = {acount: json};
  // console.log(jsonToSend);
  // return firebaseAction(uid, 'account', 'edit', null, jsonToSend).then(res => {
  //   console.log(res);
  // });

  // firebase.database().ref(`/users/${uid}/account`)
  //     .set(json)
  //     .then(res => {
  //         console.log(res);
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     })
};

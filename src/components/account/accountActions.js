import {firebaseAction} from './../../Api';

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

export const changeCreditFieldValue = (field, value) => {
  return {
    type: 'UPDATE_ACCOUNT_FORM_CREDIT',
    value,
    field,
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
    creditCards: [account.creditCard],
    details: account.user,
    transactions: account.transactions,
    assets: account.assets,
  };

  firebaseAction(uid, 'account', 'add', json)
    .then(res => {
      console.log(res);
      navigation.navigate('HomePage');
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const handleEditAccount = account => dispatch => {
  console.log('edit: ', account);
  const json = {
    sallary: account.sallary,
    creditCard: account.creditCard,
    details: account.user,
    capital: account.amount,
    transactions: account.transactions,
    liability: account.liability,
    assets: account.assets,
  };

  // firebase.database().ref(`/users/${currentUser.uid}/account/${account.uid}`)
  //     .set(json)
  //     .then(res => {
  //         console.log(res);
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     })
};

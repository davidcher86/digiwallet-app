import firebase from 'firebase';

export const changeAccountFieldValue = (field, value) => {
  return {
    type: 'UPDATE_ACCOUNT_FORM_ACCOUNT',
    value,
    field,
  };
};

export const changeUserFieldValue = (field, value) => {
  console.log(field);
  console.log(value);
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

export const handleRegisterAccount = account => dispatch => {
  const {currentUser} = firebase.auth();
  const json = {
    sallary: account.sallary,
    creditCards: [account.creditCard],
    details: account.user,
    transactions: account.transactions,
    assets: account.assets,
  };
  console.log('json: ', json);
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/account`)
    .push(json)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const handleEditAccount = account => dispatch => {
  const {currentUser} = firebase.auth();
  console.log('edit: ', account);
  console.log(currentUser);
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

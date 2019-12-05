import firebase from 'firebase';

export const toggleNewTransactionModal = () => {
  return {
    type: 'TOGGLE_NEW_TRANSACTION',
  };
};

export const changePaymentDetailsFieldValue = (field, value) => {
  return {
    type: 'UPDATE_PAYMENT_DETAILS_FORM',
    value,
    field,
  };
};

export const changeFieldValue = (field, value) => {
  return {
    type: 'UPDATE_NEW_TRANSACTION_FORM',
    value,
    field,
  };
};

export const handleAddNewTransactionAccount = (newTransaction, uid) => dispatch => {
  console.log('add new transaction');
  var data = {
    transactionType: newTransaction.transactionType,
    amount: newTransaction.uid,
    cardType: newTransaction.paymentType.cardType,
    paymentDetails: newTransaction.paymentDetails,
    date: newTransaction.date,
    description: newTransaction.description,
  };
  console.log(data);
  var commentsRef = firebase.database().ref('users/' + uid);
};

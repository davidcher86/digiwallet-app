import firebase from 'firebase';
import {fetchTransactions} from './../transactions/transactionsActions';

export const toggleNewTransactionModal = () => {
  return {
    type: 'TOGGLE_NEW_TRANSACTION',
  };
};

export const closeNewTransactionModal = () => {
  return {
    type: 'CLOSE_NEW_TRANSACTION_MODAL',
  };
};

export const resetNewTransactionForm = () => {
  return {
    type: 'RESET_NEW_TRANSACTION_FORM',
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

export const handleAddNewTransactionAccount = (
  newTransaction,
  uid,
) => dispatch => {
  var data = {
    transactionType: newTransaction.transactionType,
    amount: newTransaction.amount,
    paymentType: newTransaction.paymentType,
    paymentDetails: newTransaction.paymentDetails,
    date: newTransaction.date,
    description: newTransaction.description,
    mainCategory: newTransaction.mainCategory,
    subCategory: newTransaction.subCategory,
  };

  //  firebaseAction(uid, 'transactions', 'push', data)
  //   .then(res => {
  //     console.log(res);
  //     dispatch(resetNewTransactionForm());
  //     dispatch(closeNewTransactionModal());
  //     return res;
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  firebase
    .database()
    .ref(`/users/${uid}/account/transactions`)
    .push(data)
    .then(res => {
      dispatch(resetNewTransactionForm());
      dispatch(closeNewTransactionModal());
      dispatch(fetchTransactions(uid));
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

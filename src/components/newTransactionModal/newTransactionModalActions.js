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

export const changeSelectedCeridetCard = creditCard => {
  return {
    type: 'UPDATE_SELECTED_CREDIT_CARD',
    creditCard,
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
  var dt = new Date();

  var data = {
    transactionType: newTransaction.transactionType,
    amount: newTransaction.amount,
    paymentType: newTransaction.paymentType,
    date: dt.toISOString(),
    paymentsAmount: newTransaction.paymentDetails.paymentAmount,
    creditCardId: newTransaction.paymentDetails.creditCardId,
    description: newTransaction.description,
    mainCategory: newTransaction.mainCategory,
    subCategory: newTransaction.subCategory,
  };

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

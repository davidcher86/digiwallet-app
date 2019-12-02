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

export const handleAddNewTransactionAccount = newTransaction => dispatch => {
  console.log('add new transaction');
  console.log(newTransaction);
};

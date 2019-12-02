const initialState = {
  isModalOpen: false,
  transactionType: 'expense',
  amount: 0,
  paymentType: 'credit',
  paymentDetails: {
    cardType: 'Visa'
  },
  description: '',
  date: '',
};

export default (state = initialState, action) => {
  let {paymentDetails} = state;
  switch (action.type) {
    case 'TOGGLE_NEW_TRANSACTION':
      return Object.assign({}, state, {isModalOpen: !state.isModalOpen});
    case 'UPDATE_NEW_TRANSACTION_FORM':
      return Object.assign({}, state, {[action.field]: action.value});
    case 'UPDATE_PAYMENT_DETAILS_FORM':
      paymentDetails[action.field] = action.value;
      return Object.assign({}, state, { paymentDetails: paymentDetails });
    // case 'CHANGE_ERROR':
    //     return Object.assign({}, state, { error: action.value });
    // case 'RESET_FORM':
    //     return Object.assign({}, state, { error: '', username: '', password: '', loading: false });
    default:
      return state;
  }
};


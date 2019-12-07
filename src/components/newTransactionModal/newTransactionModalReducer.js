const initialState = {
  isModalOpen: false,
  transactionType: 'expense',
  amount: 0,
  categoryList: {
    car: ['Gas', 'license Renewel', 'Insuranes'],
    'house Hold': ['Electric Bill', 'Water Bill', 'Gas Bill'],
  },
  mainCategory: '',
  subCategory: '',
  paymentType: 'credit',
  paymentDetails: {
    cardType: 'Visa',
  },
  description: '',
  date: '2016-05-01',
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
      return Object.assign({}, state, {paymentDetails: paymentDetails});
    case 'CLOSE_NEW_TRANSACTION_MODAL':
      return Object.assign({}, state, {isModalOpen: false});
    case 'RESET_NEW_TRANSACTION_FORM':
      return initialState;
    default:
      return state;
  }
};

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
  paymentAmount: 1,
  selectedCreditCard: null,
  description: '',
};

export default (state = initialState, action) => {
  let {paymentDetails} = state;
  switch (action.type) {
    case 'TOGGLE_NEW_TRANSACTION':
      return Object.assign({}, state, {isModalOpen: !state.isModalOpen});
    case 'UPDATE_NEW_TRANSACTION_FORM':
      return Object.assign({}, state, {[action.field]: action.value});
    case 'UPDATE_SELECTED_CREDIT_CARD':
      return Object.assign({}, state, {selectedCreditCard: action.creditCard});
    case 'CLOSE_NEW_TRANSACTION_MODAL':
      return Object.assign({}, state, {isModalOpen: false});
    case 'RESET_NEW_TRANSACTION_FORM':
      return initialState;
    default:
      return state;
  }
};

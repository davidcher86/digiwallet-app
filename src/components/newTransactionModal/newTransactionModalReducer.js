const initialState = {
  isModalOpen: false,
  transactionType: 'EXPANSE',
  amount: 0,
  // categoryList: {
  //   car: ['Gas', 'license Renewel', 'Insuranes'],
  //   'house Hold': ['Electric Bill', 'Water Bill', 'Gas Bill'],
  // },
  mainCategory: '',
  subCategory: '',
  paymentType: 'CASH',
  paymentsAmount: 1,
  selectedCreditCard: null,
  description: '',
  errors: {},
  pageSettings: {
    activeTab: 'amount',
  },
};

export default (state = initialState, action) => {
  let {paymentDetails, pageSettings, errors} = state;
  switch (action.type) {
    case 'TOGGLE_NEW_TRANSACTION':
      return Object.assign({}, state, {isModalOpen: !state.isModalOpen});
    case 'UPDATE_NEW_TRANSACTION_FORM':
      let currentState = state;
      if (action.field === 'mainCategory' && state.mainCategory !== action.field) {
        return Object.assign({}, state, {mainCategory: action.value, subCategory: ''});
      } else {
        return Object.assign({}, state, {[action.field]: action.value});
      }
    case 'UPDATE_SELECTED_CREDIT_CARD':
      return Object.assign({}, state, {selectedCreditCard: action.creditCard});
    case 'CLOSE_NEW_TRANSACTION_MODAL':
      return Object.assign({}, state, {isModalOpen: false});
    case 'RESET_NEW_TRANSACTION_FORM':
      var resetState = initialState;
      resetState.pageSettings.activeTab = 'amount';
      resetState.paymentType = 'cash';
      return Object.assign({}, state, resetState);
    case 'CHANGE_NEW_TRANS_TAB':
      pageSettings[action.field] = action.value;
      return Object.assign({}, state, {pageSettings: pageSettings});
    case 'SET_NEW_TRANSACTION_ERRORS':
      errors[action.field] = action.value;
      return Object.assign({}, state, {errors: action.errors});
    default:
      return state;
  }
};

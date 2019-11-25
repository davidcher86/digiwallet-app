const initialState = {
  isModalOpen: false,
  amount: 0,
  PaymentType: 0,
  date: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_NEW_TRANSACTION':
            return Object.assign({}, state, { isModalOpen: !state.isModalOpen });
    // case 'CHANGE_PASSWORD_FIELD':
    //     return Object.assign({}, state, { password: action.value });
    // case 'CHANGE_LOADING_STATE':
    //     return Object.assign({}, state, { loading: action.value });
    // case 'CHANGE_ERROR':
    //     return Object.assign({}, state, { error: action.value });
    // case 'RESET_FORM':
    //     return Object.assign({}, state, { error: '', username: '', password: '', loading: false });
    default:
      return state;
  }
};


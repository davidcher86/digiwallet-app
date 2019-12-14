const initialState = {
  transactions: [],
  pageSettings: {
    isOpenIndex: null,
  },
};

export default (state = initialState, action) => {
  let pageSettings;
  switch (action.type) {
    case 'SET_TRANSACTIONS_LIST':
      return Object.assign({}, state, {transactions: action.transactions});
    case 'CHANGE_OPEN_INDEX':
      // console.log(action.uid);
      pageSettings = state.pageSettings;
      pageSettings.isOpenIndex = action.uid;
      return Object.assign({}, state, {pageSettings: pageSettings});
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

const initialState = {
  transactions: [],
  sortedTransaction: [],
  pageSettings: {
    isOpenIndex: null,
  },
};

export default (state = initialState, action) => {
  let pageSettings;
  switch (action.type) {
    case 'SET_TRANSACTIONS_LIST':
      return Object.assign({}, state, {transactions: action.transactions});
    case 'SET_SORTED_TRANSACTIONS_LIST':
      return Object.assign({}, state, {sortedTransaction: action.transactions});
    case 'CHANGE_OPEN_INDEX':
      pageSettings = state.pageSettings;
      pageSettings.isOpenIndex = (pageSettings.isOpenIndex === action.uid ? null : action.uid);
      return Object.assign({}, state, {pageSettings: pageSettings});
    default:
      return state;
  }
};

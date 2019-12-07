const initialState = {
  uid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IDENTITY':
      return Object.assign({}, state, {uid: action.uid});
    default:
      return state;
  }
};

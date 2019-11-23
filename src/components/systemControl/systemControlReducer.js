const initialState = {
  identity: null,
  signedIn: true,
  appControk: {
    newTransactionModalOpen: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

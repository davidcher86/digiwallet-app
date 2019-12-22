const initialState = {
  identity: null,
  signedIn: true,
  appControl: {
    newTransactionModalOpen: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

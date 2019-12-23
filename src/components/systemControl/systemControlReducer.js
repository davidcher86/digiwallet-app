const initialState = {
  identity: null,
  signedIn: true,
  appControl: {
    newTransactionModalOpen: true,
    loaderOn: false,
  },
};

export default (state = initialState, action) => {
  let appControl;
  switch (action.type) {
    case 'DISPLAY_LOADER':
      appControl = state.appControl;
      appControl.loaderOn = true;
      return Object.assign({}, state, {appControl: appControl});
    case 'HIDE_LOADER':
      appControl = state.appControl;
      appControl.loaderOn = false;
      return Object.assign({}, state, {appControl: appControl});
    default:
      return state;
  }
};

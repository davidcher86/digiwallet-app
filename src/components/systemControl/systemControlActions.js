export const onLoginPress = () => dispatch => {
    return toggleDrawerNav();
//   dispatch(toggleDrawerNav());
};

export const toggleDrawerNav = () => {
  return {
    type: 'TOGGLE_DRAWER_NAV',
  };
};

export const toggleNewTransactionModal = () => {
  return {
    type: 'TOGGLE_NEW_TRANSACTION',
  };
};

export const startLoading = () => {
  return {
    type: 'DISPLAY_LOADER',
  };
};

export const endLoading = () => {
  return {
    type: 'HIDE_LOADER',
  };
};

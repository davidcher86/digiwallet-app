export const onLoginPress = () => dispatch => {
    console.log('hsdgere');
    return toggleDrawerNav();
//   dispatch(toggleDrawerNav());
};

export const toggleDrawerNav = () => {
  console.log('here');
  return {
    type: 'TOGGLE_DRAWER_NAV',
  };
};

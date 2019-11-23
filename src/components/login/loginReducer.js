const initialState = {
  username: '',
  password: '',
  pageSettings: {
    loading: false,
    selectedTab: 'login',
  },
  newPassword: '',
  reEnteredPassword: '',
  newEmail: '',
  loading: false,
  error: '',
  validationErrors: {
    newEmailError: '',
    newPassError: '',
    newReEnteredPassError: '',
  },
};

export default (state = initialState, action) => {
  let pageSettings = state.pageSettings;
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, {[action.field]: action.value});
    case 'CHANGE_USERNAME_FIELD':
      return Object.assign({}, state, {username: action.value});
    case 'CHANGE_PASSWORD_FIELD':
      return Object.assign({}, state, {password: action.value});
    case 'CHANGE_LOADING_STATE':
      return Object.assign({}, state, {loading: action.value});
    case 'CHANGE_ERROR':
      return Object.assign({}, state, {error: action.value});
    case 'CHANGE_TAB':
      pageSettings.selectedTab = action.value;
      return Object.assign({}, state, {pageSettings: pageSettings});
    case 'RESET_FORM':
      return Object.assign({}, state, {
        error: '',
        username: '',
        password: '',
        loading: false,
      });
    default:
      return state;
  }
};

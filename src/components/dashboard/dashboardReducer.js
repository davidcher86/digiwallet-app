const initialState = {
  data: {
    expances: {
      mainCategoriesData: [{ y: 100 }],
      subCategoriesData: [{ y: 100 }]
    }
  },
  pageSettings: {
    activeTabIndex: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE_SETTINGS':
      let pageSettings = state.pageSettings;
      pageSettings.activeTabIndex = action.index;
      return Object.assign({}, state, { pageSettings: pageSettings });
    case 'UPDATE_DASHBOARD_DATA':
      let newData = state.data;
      newData.expances.mainCategoriesData = action.data;
      return Object.assign({}, state, { data: newData });
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


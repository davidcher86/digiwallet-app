const initialStateExpances = {
  list: [],
  mainExpanseCategoriesData: [{ y: 100 }],
  selectedExpanseSubCategory: '',
  subExpanseCategoriesData: [{ y: 100 }]
};

const initialStateFlow = {
  list: [],
  mainFlowCategoriesData: [{ y: 0, x: 1, label: 'init' }]
};

const initialBalanace = {
  list: [],
  mainBallanceCategoriesData: [{ y: 100, x: 1, label: 'init' }]
  // mainBallanceCategoriesData: [{ y: 100, x: 1, label: '' }]
};

const initialState = {
  data: {
    expances: initialStateExpances,
    flow: initialStateFlow,
    balance: initialBalanace
  },
  pageSettings: {
    activeTabIndex: 0
  }
};

export default (state = initialState, action) => {
  let newData
  switch (action.type) {
    case 'CHANGE_PAGE_SETTINGS':
      let pageSettings = state.pageSettings;
      pageSettings.activeTabIndex = action.index;
      return Object.assign({}, state, { pageSettings: pageSettings });
    case 'UPDATE_EXPANCE_DATA':
      newData = state.data;
      newData.expances.mainExpanseCategoriesData = action.data;
      return Object.assign({}, state, { data: newData });
    case 'UPDATE_BALANCE_LIST':
      newData = state.data;
      newData.balance.list = action.data;
      return Object.assign({}, state, { data: newData });
    case 'UPDATE_FLOW_LIST':
      newData = state.data;
      newData.flow.list = action.data;
      return Object.assign({}, state, { data: newData });
    case 'UPDATE_EXPANCES_LIST':
      newData = state.data;
      newData.expances.list = action.data;
      return Object.assign({}, state, { data: newData });
    case 'UPDATE_EXPANCES_DATA':
      newData = state.data;
      newData.expances.mainExpanseCategoriesData = action.data;
    case 'UPDATE_BALANCE_DATA':
      newData = state.data;
      newData.balance.mainBallanceCategoriesData = action.data;
      return Object.assign({}, state, { data: newData });
    case 'UPDATE_FLOW_DATA':
      newData = state.data;
      newData.flow.mainFlowCategoriesData = action.data;
      return Object.assign({}, state, { data: newData });
    case 'UPDATE_DASHBOARD_EXPANCE_SUB_DATA':
      newData = state.data;
      newData.expances.subExpanseCategoriesData = action.data;
      return Object.assign({}, state, { data: newData });
    case 'UPDATE_EXPANCE_SELECTED_SUB_CATEGORY_PIE':
      newData = state.data.expances;
      newData.selectedExpanseSubCategory = action.value;
      return Object.assign({}, state, { expances: newData });
    case 'RESET_EXPANCES_DASHBOARD':
      newData = state.data;
      newData.expances.mainExpanseCategoriesData = [{ y: 100 }];
      newData.expances.list = [];
      newData.expances.selectedExpanseSubCategory = '';
      newData.expances.subExpanseCategoriesData = [{ y: 100 }];
      return Object.assign({}, state, { data: newData });
    case 'RESET_FLOW_DASHBOARD':
      newData = state.data;
      newData.flow.mainFlowCategoriesData = [{ y: 0, x: 1, label: 'init' }];
      newData.flow.list = [];
      return Object.assign({}, state, { data: newData });
    case 'RESET_BALANCE_DASHBOARD':
      newData = state.data;
      newData.balance.mainBallanceCategoriesData = [{ y: 100, x: 1, label: 'init' }];
      newData.balance.list = [];
      return Object.assign({}, state, { data: newData });
    default:
      return state;
  }
};


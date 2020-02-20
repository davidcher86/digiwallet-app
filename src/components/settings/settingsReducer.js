const exampleData = {
  car: ['Gas', 'license Renewel', 'Insuranes'],
  'house Hold': ['Electric Bill', 'Water Bill', 'Gas Bill'],
  shopping: ['groceries', 'cloths', 'food'],
};

const initialState = {
  categoryData: [],
  mainCategoryList: [],
  subCategoryList: [],
  newCategory: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MAIN_VALUE_CATEGORIES':
      return Object.assign({}, state, {[action.field]: action.value});
    // case 'RECIEVE_PROFILE_DATA':
    //   var data = action.data;
    //   return Object.assign({}, state, {categoryData: JSON.parse(data.categories)});
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

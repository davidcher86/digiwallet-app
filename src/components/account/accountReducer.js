import {randomString} from './../common/Actions';

const initialState = {
  user: {
    uid: null,
    firstName: '',
    lastName: '',
    gender: 'male',
    birthDate: '2016-05-01'
  },
  creditCards: [
    {
      id: randomString(20),
      name: 'Card1',
      cardType: 'visa',
      billingDate: '1',
      creditLimit: 0
    },
  ],
  sallary: {
    paymentDate: '1',
    amount: 10000
  },
  transactions: {},
  liability: 0,
  assets: 1000,
  validationErrors: {
    firstNameError: '',
    lastNameError: ''
  },
  pageSettings: {
    step: 0
  },
  registerData: {},
  formType: 'NEW',
  errors: {}
};

export default (state = initialState, action) => {
  let {user, creditCards, sallary, pageSettings} = state;
  switch (action.type) {
    case 'UPDATE_ACCOUNT_FORM_ACCOUNT':
      return Object.assign({}, state, {[action.field]: action.value});
    case 'UPDATE_ACCOUNT_FORM_USER':
      user[action.field] = action.value;
      return Object.assign({}, state, {user: user});
    case 'UPDATE_ACCOUNT_FORM_CREDIT':
      var card = creditCards[action.index];
      card[action.field] = action.value;
      creditCards[action.index] = card;
      return Object.assign({}, state, {creditCards: creditCards});
    case 'UPDATE_ACCOUNT_FORM_SALLARY':
      sallary[action.field] = action.value;
      return Object.assign({}, state, {sallary: sallary});
    case 'UPDATE_STEP':
      if (action.value > -1 && action.value < 3) {
        pageSettings.step = action.value;
      }
      return Object.assign({}, state, {pageSettings: pageSettings});
    case 'SET_ACCOUNT_DETAILS':
      // console.log(action.account);
      return Object.assign({}, state, action.account);
    case 'SET_ACCOUNT_ERRORS':
      return Object.assign({}, state, {errors: action.errors});
    default:
      return state;
  }
};

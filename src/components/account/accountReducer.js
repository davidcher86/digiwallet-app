const initialState = {
    user: {
        firstName: '',
        lastName: '',
        gender: 'male',
        birthDate: '2016-05-01'
    },
    creditCard: {
        company: 'Visa',
        billingDate: '1',
        amountLiabilities: 0
    },
    sallary: {
        paymentDate: '1',
        amount: '10000'
    },
    transactions: [],
    liability: 0,
    assets: 0,
    validationErrors: {
        firstNameError: '',
        lastNameError: ''
    },
    pageSettings: {
        step: 0
    }
}

export default (state = initialState, action) => {
    let { user, creditCard, sallary, pageSettings } = state;
    switch (action.type) {
        case 'UPDATE_ACCOUNT_FORM_ACCOUNT':
            return Object.assign({}, state, { [action.field]: action.value });
        case 'UPDATE_ACCOUNT_FORM_USER':
            user[action.field] = action.value;
            return Object.assign({}, state, { user: user });
        case 'UPDATE_ACCOUNT_FORM_CREDIT':
            creditCard[action.field] = action.value;
            return Object.assign({}, state, { creditCard: creditCard });
        case 'UPDATE_ACCOUNT_FORM_SALLARY':
            sallary[action.field] = action.value;
            return Object.assign({}, state, { sallary: sallary });
        case 'UPDATE_STEP':
            if (action.value > -1 && action.value < 3) {
                pageSettings.step = action.value;
            }
            return Object.assign({}, state, { pageSettings: pageSettings });
        default:
            return state;
    }
};
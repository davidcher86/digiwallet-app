// export const setPageSettingsIndex = (index) => {
//     return {
//         type: 'CHANGE_PAGE_SETTINGS',
//         index
//     };
// };

export const setPageSettings = (field, value) => {
    return {
        type: 'CHANGE_PAGE_SETTINGS',
        field,
        value
    };
};

export const updateExpanceData = (data) => {
    return {
        type: 'UPDATE_EXPANCES_DATA',
        data
    };
};

export const updateExpanceList = (data) => {
    return {
        type: 'UPDATE_EXPANCES_LIST',
        data
    };
};

export const updateBalanceList = (data) => {
    return {
        type: 'UPDATE_BALANCE_LIST',
        data
    };
};

export const updateFlowList = (data) => {
    return {
        type: 'UPDATE_FLOW_LIST',
        data
    };
};

export const updateFlowData = (data) => {
    return {
        type: 'UPDATE_FLOW_DATA',
        data
    };
};

export const updateBalanceData = (data) => {
    return {
        type: 'UPDATE_BALANCE_DATA',
        data
    };
};

export const updateExpanceSubData = (data) => {
    return {
        type: 'UPDATE_DASHBOARD_EXPANCE_SUB_DATA',
        data
    };
};

export const updateExpanceSelected = (value) => {
    return {
        type: 'UPDATE_EXPANCE_SELECTED_SUB_CATEGORY_PIE',
        value
    };
};

export const resetFlow = () => {
    return {
        type: 'RESET_FLOW_DASHBOARD'
    };
};

export const resetExpance = () => {
    return {
        type: 'RESET_EXPANCES_DASHBOARD'
    };
};

export const resetBalance = () => {
    return {
        type: 'RESET_BALANCE_DASHBOARD'
    };
};

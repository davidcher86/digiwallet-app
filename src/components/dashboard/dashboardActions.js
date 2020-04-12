export const setPageSettingsIndex = (index) => {
    return {
        type: 'CHANGE_PAGE_SETTINGS',
        index
    };
};

export const updateData = (data) => {
    return {
        type: 'UPDATE_DASHBOARD_DATA',
        data
    };
};

export const updateSubData = (data) => {
    return {
        type: 'UPDATE_DASHBOARD_SUB_DATA',
        data
    };
};

export const updateSelected = (value) => {
    return {
        type: 'UPDATE_SELECTED_SUB_CATEGORY_PIE',
        value
    };
};

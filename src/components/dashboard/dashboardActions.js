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
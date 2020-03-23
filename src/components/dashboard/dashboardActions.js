export const setPageSettings = (field, value) => {
    return {
        type: 'CHANGE_PAGE_SETTINGS',
        field,
        value
    };
};

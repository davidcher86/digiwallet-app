export const setValue = (field, value) => {
  return {
    type: 'SET_MAIN_VALUE_CATEGORIES',
    value,
    field,
  };
};

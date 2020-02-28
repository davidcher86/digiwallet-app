import {
  startLoading,
  endLoading,
} from './../systemControl/systemControlActions';
import firebase from 'firebase';

export const setValue = (field, value) => {
  return {
    type: 'SET_MAIN_VALUE_CATEGORIES',
    value,
    field,
  };
};

export const handleUpdaeCategories = (data, uid) => dispatch => {
  dispatch(startLoading());
  firebase
    .database()
    .ref(`/users/${uid}/account/`)
    .update({categories: JSON.stringify(data)})
    .then(res => {
      dispatch(endLoading());
    })
    .catch(r => {
      console.log('Error Updae Categories on Firebase, Exception: ' + r);
      dispatch(endLoading());
    });
};

export const handleUpdaeSortedCategories = (data, uid) => dispatch => {
  dispatch(startLoading());
  firebase
    .database()
    .ref(`/users/${uid}/account/`)
    .update({sortedMainCategories: JSON.stringify(data)})
    .then(res => {
      dispatch(endLoading());
    })
    .catch(r => {
      console.log('Error Updae Categories on Firebase, Exception: ' + r);
      dispatch(endLoading());
    });
};
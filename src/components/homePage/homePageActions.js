import {startLoading, endLoading} from './../systemControl/systemControlActions';
import firebase from 'firebase';

export const setData = data => {
  return {
    type: 'SET_DATA',
    data,
  };
};

export const fetchData = uid => {
  return dispatch => {
    dispatch(startLoading());
    const dataRef = firebase.database().ref(`/users/${uid}/account`);

    dataRef.once('value').then(function(snapshot) {
      var res = snapshot.val();

      dispatch(setData(res));
      dispatch(endLoading());
    });
  };
};

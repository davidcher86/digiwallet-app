import {
  startLoading,
  endLoading,
} from './../systemControl/systemControlActions';
import firebase from 'firebase';

export const recievehData = data => {
  return {
    type: 'RECIEVE_DATA',
    data,
  };
};

export const fetchData = uid => {
  return dispatch => {
    dispatch(startLoading());
    const dataRef = firebase.database().ref(`/users/${uid}/account`);

    dataRef
      .once('value')
      .then(function(snapshot) {
        var res = snapshot.val();
        console.log(res);
        dispatch(recievehData(res));
        dispatch(endLoading());
      })
      .catch(fail => {
        console.log(fail);
      });
  };
};

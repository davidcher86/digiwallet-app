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

export const fetchData = (uid, navigation) => {
  return dispatch => {
    dispatch(startLoading());
    const dataRef = firebase.database().ref(`/users/${uid}/account`);

    dataRef
      .once('value')
      .then(function(snapshot) {
        var res = snapshot.val();
        // console.log('res', res);
        // console.log('uid', uid);
        if (res && res.assets !== null) {
          dispatch(recievehData(res));
          dispatch(endLoading());
        } else {
          dispatch(endLoading());
          // navigation.navigate('Account', {formType: 'NEW', registered: true, uid: uid});
        }
      })
      .catch(fail => {
        console.log(fail);
      });
  };
};

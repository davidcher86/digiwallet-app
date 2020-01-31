import {rememberUser} from './../common/Actions';
import {firebaseAction} from './../../Api';
import firebase from 'firebase';
import {
  startLoading,
  endLoading,
} from './../systemControl/systemControlActions';
// import {setIdentity} from './../identity/identityActions';

export const changeUsername = value => {
  return {
    type: 'CHANGE_USERNAME_FIELD',
    value,
  };
};

export const changePassword = value => {
  return {
    type: 'CHANGE_PASSWORD_FIELD',
    value,
  };
};

export const changeFieldValue = (field, value) => {
  return {
    type: 'UPDATE_LOGIN_FORM',
    value,
    field,
  };
};

export const setIdentity = uid => {
  return {
    type: 'SET_IDENTITY',
    uid,
  };
};

export const onRegister = (email, password, navigation) => {
  var data = {
    email: email,
    password: password,
  };
  return dispatch => {
    dispatch(startLoading());
    firebaseAction(null, 'authentication', 'register', data)
      .then(r => {
        firebaseAction(null, 'authentication', 'login', data).then(response => {
          dispatch(resetForm());
          dispatch(setIdentity(response.user.uid));
          rememberUser(response.user.uid);
          dispatch(endLoading());
          return navigation.navigate('Account', {
            type: 'NEW',
            registered: true,
          });
        });
      })
      .catch(res => {
        console.log('Error: ', res);
        dispatch(resetForm());
        dispatch(handleError(res.toString()));
        dispatch(endLoading());
        return null;
      });
  };
};

export const recieveData = data => {
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

        if (res && res.assets !== null) {
          var fixedList = [];
          var totalCredit = 0;
          var currentMonthCredit = 0;
          for (var item in res.creditDebt) {
            var creditItem = res.creditDebt[item];
            creditItem.uid = item;
            fixedList.push(creditItem);
            totalCredit += res.creditDebt[item].amount;
            currentMonthCredit += res.creditDebt[item].monthlyPayment;
          }
          res.fixedList = fixedList;
          res.totalCredit = totalCredit;
          res.currentMonthCredit = currentMonthCredit;
          dispatch(recieveData(res));
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

export const onLoginPress = (email, password, navigation) => {
  var data = {
    email: email,
    password: password,
  };

  return dispatch => {
    dispatch(startLoading());
    firebaseAction(null, 'authentication', 'login', data)
      .then(response => {
        if (response.user !== null) {
          rememberUser(response.user.uid);
          dispatch(setIdentity(response.user.uid));
          // console.log('uid', res.user.uid);
          // var res = await fetchData(res.user.uid, navigation);
          // console.log('res', res);
          const dataRef = firebase.database().ref(`/users/${response.user.uid}/account`);
          dataRef.once('value').then(function(snapshot) {
            var res = snapshot.val();

            if (res && res.assets !== null) {
              var fixedList = [];
              var totalCredit = 0;
              var currentMonthCredit = 0;
              for (var item in res.creditDebt) {
                var creditItem = res.creditDebt[item];
                creditItem.uid = item;
                fixedList.push(creditItem);
                totalCredit += res.creditDebt[item].amount;
                currentMonthCredit += res.creditDebt[item].monthlyPayment;
              }
              res.fixedList = fixedList;
              res.totalCredit = totalCredit;
              res.currentMonthCredit = currentMonthCredit;
              dispatch(recieveData(res));
              navigation.navigate('HomePage');
              dispatch(endLoading());
            } else {
              dispatch(endLoading());
              // navigation.navigate('Account', {formType: 'NEW', registered: true, uid: uid});
            }
          });
          // navigation.navigate('HomePage');
          // dispatch(setIdentity(response.user.uid));
        }
        dispatch(endLoading());
        dispatch(resetForm());
      })
      .catch(res => {
        console.log('Error: ', res);
        dispatch(resetForm());
        dispatch(handleError(res.toString()));
        dispatch(endLoading());
      });
  };
};

export const onFacebookRegister = navigation => {
  return dispatch => {
    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.setCustomParameters({
    //   display: 'popup',
    // });

    dispatch(startLoading());
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        dispatch(endLoading());
        // ...
      })
      .catch(function(error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        dispatch(endLoading());
        // ...
      });

    // firebaseAction(null, 'authentication', 'login', data)
    //   .then(res => {
    //     if (res.user !== null) {
    //       rememberUser(res.user.uid);
    //       navigation.navigate('HomePage');
    //       dispatch(setIdentity(res.user.uid));
    //     }
    //     dispatch(endLoading());
    //     dispatch(resetForm());
    //     return res;
    //   })
    //   .catch(res => {
    //     console.log('Error: ', res);
    //     dispatch(resetForm());
    //     dispatch(handleError(res.toString()));
    //     dispatch(endLoading());
    //     return null;
    //   });
  };
};

// export const changeLoading = value => {
//   return {
//     type: 'CHANGE_LOADING_STATE',
//     value,
//   };
// };

export const handleError = value => {
  return {
    type: 'CHANGE_ERROR',
    value,
  };
};

export const resetForm = () => {
  return {
    type: 'RESET_FORM',
  };
};

export const changeTab = value => {
  return {
    type: 'CHANGE_TAB',
    value,
  };
};

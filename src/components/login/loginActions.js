import {rememberUser} from './../common/Actions';
import {firebaseAction} from './../../Api';
import firebase from 'firebase';
import {
  startLoading,
  endLoading,
} from './../systemControl/systemControlActions';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import {setIdentity} from './../identity/identityActions';
// import { GoogleSignin } from 'react-native-google-signin';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

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

        if (res && res.assets !== undefined) {
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
          navigation.navigate('PrimaryNav');
          dispatch(endLoading());
        } else {
          dispatch(endLoading());
          return navigation.navigate('Account', {
            type: 'NEW',
            registered: true,
          });
        }
      })
      .catch(fail => {
        console.log(fail);
        dispatch(endLoading());
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
            }
          });
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

export const onFacebookLogin = navigation => {
  return dispatch => {
    dispatch(startLoading());
    LoginManager.logInWithPermissions(["public_profile"])
      .then(
        (result) => {
          console.log('result', result);
          if (result.isCancelled) {
            Alert.alert('Whoops!', 'You cancelled the sign in.');
          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                console.log('data', data);
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                console.log('cred', credential);
                // firebase.auth().signInWithCredential(credential)
                //   .then(r => {
                //     console.log('r', r);
                //     rememberUser(r.user.uid);
                //     // console.log('currentUser', firebase.auth().currentUser);
                //     navigation.navigate('Account', {
                //       type: 'NEW',
                //       registered: true,
                //       firstName: r.additionalUserInfo.profile.first_name,
                //       lastName: r.additionalUserInfo.profile.last_name,
                //     });
                //     dispatch(endLoading());
                //   })
                //   .catch((error) => {
                //     console.log('error', error.message)
                //     dispatch(endLoading());
                //   });
              });
          }
        },
        (error) => {
          Alert.alert('Sign in error', error);
        },
      );
  };
};

export const onFacebookRegister = navigation => {
  return dispatch => {
    dispatch(startLoading());
    // LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email'])
    LoginManager.logInWithPermissions(["public_profile"])
      .then(
        (result) => {
          console.log('result', result);
          if (result.isCancelled) {
            Alert.alert('Whoops!', 'You cancelled the sign in.');
          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                console.log('credential', credential);
                firebase.auth().signInWithCredential(credential)
                  .then(r => {
                    console.log('r', r);
                    rememberUser(r.user.uid);
                    // console.log('currentUser', firebase.auth().currentUser);
                    navigation.navigate('Account', {
                      type: 'NEW',
                      registered: true,
                      firstName: r.additionalUserInfo.profile.first_name,
                      lastName: r.additionalUserInfo.profile.last_name,
                    });
                    dispatch(endLoading());
                  })
                  .catch((error) => {
                    console.log('error', error.message)
                    dispatch(endLoading());
                  });
              });
          }
        },
        (error) => {
          Alert.alert('Sign in error', error);
        },
      );
  };
};

export const onGoogleRegister = navigation => {
  return async dispatch => {
    try {
      // add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();
      console.log('data', data);
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      console.log('credential', credential);
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      console.log('firebaseUserCredential', firebaseUserCredential);
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
    // dispatch(startLoading());
    // var provider = new firebase.auth.GoogleAuthProvider();

    // await GoogleSignin.hasPlayServices();
    // const userInfo = await GoogleSignin.signIn();
    // console.log('userInfo', userInfo)
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

export const setErrors = errors => {
  return {
    type: 'SET_LOGIN_REGISTER_ERRORS',
    errors,
  };
};

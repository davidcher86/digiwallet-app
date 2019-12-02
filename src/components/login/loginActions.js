// import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';
import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';

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

const rememberUser = async uid => {
  try {
    await AsyncStorage.setItem('digiwalletUserUID', uid);
  } catch (error) {
    console.log('error while setting AsyncStorage item');
  }
};

// let getRememberedUser = async navigation => {
//   try {
//     const username = await AsyncStorage.getItem('digiwalletUserUID');
//     if (username !== null) {
//       return username;
//     }
//   } catch (error) {
//     // Error retrieving data
//   }
// };

export const setIdentity = value => {
  console.log('value:', value);
  return {
    type: 'CHANGE_USERNAME_FIELD',
    value,
  };
};

export const fetchIdentity = uid => {
  uid = 'vna4h0LGzogDF0cDADHZ5T0Aj2';
  var ref = firebase.database().ref('users/vna4h0LGzogDF0cDADHZ5T0Aj2t2/account/-LuvmytchmNViLGsy-RI/');
  return dispatch => {
    console.log('uyi:', uid);
    ref.on('value', snapshot => {
    // ref.once('value').then(snapshot => {
      // dispatch(setIdentity(snapshot));
      console.log('snapshot2: ', snapshot.val());
      // console.log('snapshot: ', snapshot);
    });
  };
};

export const onSignInPress = (email, password, navigation) => {
  return dispatch => {
    dispatch(changeLoading(true));
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(r => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            console.log(response);
            dispatch(resetForm());
            return navigation.navigate('Account');
          })
          .catch(res => {
            console.log(res);
            dispatch(resetForm());
            dispatch(handleError(res.toString()));
            return null;
          });
      })
      .catch(res => {
        console.log(res);
        dispatch(resetForm());
        dispatch(handleError(res.toString()));
        return null;
      });
    };
};

export const onLoginPress = (username, password, navigation) => {
  return dispatch => {
    dispatch(changeLoading(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(r => {
        console.log(r);
        if (r.user !== null) {
          this.getRememberedUser(navigation);
          // .then(user => {
          //   console.log(r);
          // });
          // console.log(user);
          // try {
          //   AsyncStorage.setItem('digiwalletUserUID', r.user.uid);
          //   return navigation.navigate('PrimaryNav');
          // } catch (e) {
          //   console.log('Failed to save AsyncStorage user uid');
          // }
        }
        dispatch(resetForm());
        return r;
      })
      .catch(res => {
        console.log('Error: ', res);
        dispatch(resetForm());
        dispatch(handleError(res.toString()));

        try {
          AsyncStorage.setItem('digiwalletUserUID', 'asdfasdasd');
          return navigation.navigate('PrimaryNav');
        } catch (e) {
          console.log('Failed to save AsyncStorage user uid');
        }
        return null;
      });
  }
};

export const changeLoading = value => {
  return {
    type: 'CHANGE_LOADING_STATE',
    value,
  };
};

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

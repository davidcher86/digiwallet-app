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
    // Error saving data
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

export const onSignInPress = (email, password) => dispatch => {
  console.log(email);
  console.log(password);
  console.log(NavigationActions);
  // Actions.account({ formType: 'new' });
  dispatch(changeLoading(true));
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(r => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          dispatch(resetForm());
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

export const onLoginPress = (username, password, navigation) => dispatch => {
  dispatch(changeLoading(true));
  return firebase
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
      // async storeToken(user) {
      //   try {
      //      await AsyncStorage.setItem("userData", JSON.stringify(user));
      //   } catch (error) {
      //     console.log("Something went wrong", error);
      //   }
      // }
      try {
        AsyncStorage.setItem('digiwalletUserUID', 'asdfasdasd');
        return navigation.navigate('PrimaryNav');
      } catch (e) {
        console.log('Failed to save AsyncStorage user uid');
      }
      return null;
    });
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

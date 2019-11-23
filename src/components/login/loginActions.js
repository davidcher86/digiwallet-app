// import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

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

export const onSignInPress = (email, password) => dispatch => {
  console.log(email);
  console.log(password);
  // Actions.account({ formType: 'new' });
  dispatch(changeLoading(true));
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(r => {
      console.log('r: ', r);
      console.log('r: ', email);
      console.log('r: ', password);
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          dispatch(resetForm());
          // return Actions.dashboard();
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

export const onLoginPress = (username, password) => dispatch => {
  dispatch(changeLoading(true));
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then(r => {
      // console.log(r)
      dispatch(resetForm());
      // Actions.dashboard();
      return null;
    })
    .catch(res => {
      console.log(res);
      dispatch(resetForm());
      dispatch(handleError(res.toString()));
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

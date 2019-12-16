import {rememberUser} from './../common/Actions';
import {firebaseAction} from './../../Api';
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

export const onSignInPress = (email, password, navigation) => {
  var data = {
    email: email,
    password: password,
  };
  return dispatch => {
    dispatch(changeLoading(true));

    firebaseAction(null, 'authentication', 'register', data)
      .then(r => {
        firebaseAction(null, 'authentication', 'login', data).then(response => {
          dispatch(resetForm());
          rememberUser(response.user.uid);
          return navigation.navigate('Account');
        });
      })
      .catch(res => {
        console.log('Error: ', res);
        dispatch(resetForm());
        dispatch(handleError(res.toString()));
        return null;
      });
  };
};

export const onLoginPress = (email, password, navigation) => {
  var data = {
    email: email,
    password: password,
  };

  return dispatch => {
    dispatch(changeLoading(true));

    firebaseAction(null, 'authentication', 'login', data)
      .then(res => {
        if (res.user !== null) {
          rememberUser(res.user.uid);
          navigation.navigate('HomePage');
          dispatch(setIdentity(res.user.uid));
        }
        dispatch(resetForm());
        return res;
      })
      .catch(res => {
        console.log('Error: ', res);
        dispatch(resetForm());
        dispatch(handleError(res.toString()));
        return null;
      });
  };
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

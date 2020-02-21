import {
  startLoading,
  endLoading,
} from './../systemControl/systemControlActions';
import firebase from 'firebase';

export const setOpenIndex = uid => {
  return {
    type: 'CHANGE_OPEN_CREDIT_INDEX',
    uid,
  };
};

export const openCredit = uid => {
  return dispatch => {
    dispatch(setOpenIndex(uid));
  };
};

export const recieveData = data => {
  return {
    type: 'RECIEVE_PROFILE_DATA',
    data,
  };
};

export const fetchProfileData = (uid, navigation) => {
  return dispatch => {
    dispatch(startLoading());
    const dataRef = firebase.database().ref(`/users/${uid}/account`);

    dataRef
      .once('value')
      .then(function(snapshot) {
        var res = snapshot.val();

        if (res && res.assets !== null) {
          // console.log(res);
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
        }
      })
      .catch(fail => {
        console.log(fail);
        dispatch(endLoading());
      });
  };
};

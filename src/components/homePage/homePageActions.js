import {
  startLoading,
  endLoading,
} from './../systemControl/systemControlActions';
import firebase from 'firebase';

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
            fixedList.push(res.creditDebt[item]);
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

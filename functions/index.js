const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('node-fetch');

admin.initializeApp(functions.config().firebase);

const DELETE_ACTION = "DELETE";
const ADD_ACTION = "ADD";

exports.updateNewTransaction = functions.database
  .ref('/users/{uId}/account/transactions')
  .onWrite(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();

    var lastUpdate = new Date();
    var newItem = null;
    var uid = null;
    var actionType = null;

    for (let item in after) {
      if (before !==null) {
        if (!before.hasOwnProperty(item)) {
          uid = item;
          actionType = ADD_ACTION;
          newItem = after[item];
        }
      } else {
        uid = item;
        actionType = ADD_ACTION;
        newItem = after[item];
      }

      if (newItem !==null) {
        var tmpDate = new Date(newItem.date);
        // tmpDate.setDate(tmpDate.getDate() - 1);
        newItem.lastUpdated = tmpDate;

        // newItem.lastUpdated = newItem.date;
        newItem.paymentsRemain = newItem.paymentsAmount;
        newItem.creditCardId = newItem.creditCardId;
        newItem.amountRemain = Number(newItem.amount);
        newItem.monthlyPayment = newItem.amount / newItem.paymentsRemain;
      }
    }

    if (actionType === null) {
      for (let item in before) {
        if (after !==null) {
          if (!after.hasOwnProperty(item)) {
            uid = item;
            actionType = DELETE_ACTION;
            newItem = before[item];
          }
        } else {
          uid = item;
          actionType = DELETE_ACTION;
          newItem = before[item];
        }
      }
    }

    if (newItem !== null && uid !== null && actionType !== null) {
      var dbCreditRef;
      switch (actionType) {
        case DELETE_ACTION:
          console.log('Inintiated with UID: ' + uid + ', action: ' + DELETE_ACTION + ' transaction, on ' + lastUpdate);
          dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/creditDebt/${uid}`);
          dbCreditRef.remove();
          break;
        case ADD_ACTION:
          console.log('Inintiated with UID: ' + uid + ', action: ' + ADD_ACTION + ' transaction, on ' + lastUpdate);
          dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/creditDebt`);
          dbCreditRef.update({[uid]: newItem})
          .then(res => {
            return res;
          });
      }

      var dbRef = admin.database().ref(`/users/${context.params.uId}/account/`)
      dbRef.update({lastUpdate})
      .then(res => {
        return res;
      });
    }

    return null;
  });

exports.updateLastConnected = functions.database
  .ref('/users/{uId}/account/lastConnected')
  .onUpdate(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    console.log(after);
    const dataRef = admin.database().ref(`/users/${context.params.uId}/account`);
      dataRef.once('value').then(function(snapshot) {
        var data = snapshot.val();
        var nowDt = new Date();
        console.log('data', data);
        // create cards debr dates
        var cardsList = data.creditCards;
        var totalCreditDebt = 0;
        var mapCredit = data.creditDebt;
        var sallaryPayDay = false;

        while (nowDt > new Date(data.sallary.paymentDate)) {
          data.assets += data.sallary.amount;
          var payDayDt = new Date(data.sallary.paymentDate)
          payDayDt.setMonth(payDayDt.getMonth() + 1);
          data.sallary.paymentDate = payDayDt.toISOString();
          sallaryPayDay = true;
        }
        // console.log(data.assets);
        for (var i = 0; i < cardsList.length; i++) {
          var cardToHandle = null;
          var creditCardDebtDt = cardsList[i].nextDebtDate;

          if (nowDt > new Date(creditCardDebtDt)) {
            cardToHandle = cardsList[i].id;
          }

          if (cardToHandle !== null) {
            for (var item in mapCredit) {
              if (cardToHandle === mapCredit[item].creditCardId && new Date(mapCredit[item].lastUpdated) < new Date(creditCardDebtDt)) {
                var creditItem = mapCredit[item];
                totalCreditDebt += mapCredit[item].monthlyPayment;

                if (mapCredit[item].paymentsRemain - 1 > 0) {
                  let dt = new Date();
                  mapCredit[item].paymentsRemain = creditItem.paymentsRemain - 1;
                  mapCredit[item].amountRemain = creditItem.amountRemain - creditItem.monthlyPayment;
                  mapCredit[item].lastUpdated = dt.toISOString();
                } else {
                  delete mapCredit[item];
                }
              }
            }

            var dt = new Date(creditCardDebtDt);
            dt.setMonth(dt.getMonth() + 1);
            cardsList[i].nextDebtDate = dt;
          }
        }

        data.creditDebt = mapCredit;
        data.cardsList = cardsList;
        data.assets -= totalCreditDebt;

        if (totalCreditDebt > 0 || sallaryPayDay) {
          dataRef.update(data)
            .then(res => {
              if (totalCreditDebt > 0) {
                console.log('Reduced Monthly credit: ' + totalCreditDebt + ', from account: ' + context.params.uId);
              }
              if (sallaryPayDay) {
                console.log('Added Monthly sallary of: ' + data.sallary.amount + ' to total assets');
              }
              return res;
            });
        }
      });
    return dataRef;
  });


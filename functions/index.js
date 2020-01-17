const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('node-fetch');

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });
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
        newItem.lastUpdated = new Date();
        newItem.paymentsRemain = newItem.paymentsAmount;
        newItem.creditCardId = newItem.creditCardId;
        newItem.amountRemain = newItem.amount;
        newItem.monthlyPayment = newItem.amount / newItem.paymentsRemain;
      }
    }
    console.log(newItem);
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
    console.log('change on updatettttt', change);

    const dataRef = admin.database().ref(`/users/${context.params.uId}/account`);
      dataRef.once('value').then(function(snapshot) {
        var res = snapshot.val();
        console.log('all data', res);

        // create cards debr dates
        var mapCards = res.creditCards;
        var totalCreditDebt = 0;
        var mapCredit = res.creditDebt;
        for (var id in mapCards) {
          if (new Date() > new Date(mapCards[id])) {
              delete mapCards[id];
          }
        }

        console.log('before', mapCredit);
        for (var cardId in mapCards) {
          console.log('creditCardDebtDt', creditCardDebtDt);
          var creditCardDebtDt = new Date(mapCards[cardId]);
          // console.log('creditCardDebtDt', creditCardDebtDt);
          for (var item in mapCredit) {
            console.log('item', item);
            console.log('itemss', mapCredit[item]);
            console.log(cardId + ' is ', mapCredit[item].creditCardId);
            console.log(new Date(mapCredit[item].lastUpdated) < creditCardDebtDt);
            if (cardId === mapCredit[item].creditCardId && new Date(mapCredit[item].lastUpdated) < creditCardDebtDt) {
              var creditItem = mapCredit[item];
              totalCreditDebt += Number(creditItem.monthlyPayment);

              if (Number(mapCredit[item].paymentsRemain) - 1 > 0) {
                let dt = new Date();
                mapCredit[item].paymentsRemain = (Number(creditItem.paymentsRemain) - 1).toString();
                mapCredit[item].amountRemain = (Number(creditItem.amountRemain) - creditItem.monthlyPayment).toString();
                mapCredit[item].lastUpdated = dt.toISOString();
                console.log('Updated item ', mapCredit[item]);
              } else {
                console.log('Deleted item ', mapCredit[item]);
                delete mapCredit[item];
              }
            }
          }
        }
        console.log('Monthly credit of ' + totalCreditDebt + ' reduced from total assets');
        console.log('after', mapCredit);
      });
    return dataRef;
  });


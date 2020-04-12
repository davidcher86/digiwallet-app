const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('node-fetch');

admin.initializeApp(functions.config().firebase);

const DELETE_ACTION = "DELETE";
const ADD_ACTION = "ADD";
const ADD_ACTION_CREDIT = "ADD_CREDIT";
const ADD_ACTION_CASH = "ADD_CASH";
const ADD_ACTION_CHECK = "ADD_CHECK";
const DELETE_ACTION_CREDIT = "DELETE_CREDIT";
const DELETE_ACTION_CASH = "DELETE_CASH";
const DELETE_ACTION_CHECK = "DELETE_CHECK";

exports.updateNewTransaction = functions.database
  .ref('/users/{uId}/account/transactions')
  .onWrite(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    console.log('context', context);
    console.log('after', after);
    var lastUpdate = new Date();
    var newItem = null;
    var uid = null;
    var actionType = null;
    for (let item in after) {
      if (before !==null) {
        if (!before.hasOwnProperty(item)) {
          uid = item;
          switch (after[item].paymentType) {
            case 'CREDIT':
              console.log('CREDIT');
              actionType = ADD_ACTION_CREDIT;
              break;
            case 'CASH':
              console.log('CASH');
              actionType = ADD_ACTION_CASH;
              break;
            case 'CHECK':
              console.log('CHECK');
              actionType = ADD_ACTION_CHECK;
              break;
            default:
              console.log('default item', after[item]);
          }
          // actionType = ADD_ACTION;
          newItem = after[item];
        }
      } else {
        uid = item;
        switch (after[item].paymentType) {
          case 'CREDIT':
            console.log('CREDIT');
            actionType = ADD_ACTION_CREDIT;
            break;
          case 'CASH':
            console.log('CASH');
            actionType = ADD_ACTION_CASH;
            break;
          case 'CHECK':
            console.log('CHECK');
            actionType = ADD_ACTION_CHECK;
            break;
          default:
            console.log('default item', after[item]);
        }
        // actionType = ADD_ACTION;
        newItem = after[item];
      }

      console.log('newItem', newItem);
      if (newItem !==null && newItem.paymentType === 'CREDIT') {
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
            switch (after[item].paymentType) {
              case 'CREDIT':
                console.log('CREDIT');
                actionType = DELETE_ACTION_CREDIT;
                break;
              case 'CASH':
                console.log('CASH');
                actionType = DELETE_ACTION_CASH;
                break;
              case 'CHECK':
                console.log('CHECK');
                actionType = DELETE_ACTION_CHECK;
                break;
              default:
                console.log('default item', after[item]);
            }
            // actionType = DELETE_ACTION;
            newItem = before[item];
          }
        } else {
          uid = item;
          switch (after[item].paymentType) {
            case 'CREDIT':
              console.log('CREDIT');
              actionType = DELETE_ACTION_CREDIT;
              break;
            case 'CASH':
              console.log('CASH');
              actionType = DELETE_ACTION_CASH;
              break;
            case 'CHECK':
              console.log('CHECK');
              actionType = DELETE_ACTION_CHECK;
              break;
            default:
              console.log('default item', after[item]);
          }
          // actionType = DELETE_ACTION;
          newItem = before[item];
        }
      }
    }
    console.log(actionType);

    if (newItem !== null && uid !== null && actionType !== null) {
      var dbCreditRef;
      switch (actionType) {
        case DELETE_ACTION_CASH:
          console.log('Inintiated with UID: ' + uid + ', action: ' + DELETE_ACTION + ' transaction, on ' + lastUpdate);
          dbBalanceRef = admin.database().ref(`/users/${context.params.uId}/account`);
          return dbBalanceRef.transaction(assets => {
            if (assets) {
              if (newItem.transactionType == 'INCOME') {
                assets = assets - parseFloat(newItem.amount);
              } else {
                assets = assets + parseFloat(newItem.amount);
              }
            }
            return assets;
          });
        case DELETE_ACTION_CREDIT:
          console.log('Inintiated with UID: ' + uid + ', action: ' + DELETE_ACTION + ' transaction, on ' + lastUpdate);
          dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/creditDebt/${uid}`);
          dbCreditRef.remove();
          break;
        case ADD_ACTION_CASH:
          console.log('Inintiated with UID: ' + uid + ', action: ' + ADD_ACTION + ' transaction, on ' + lastUpdate);
          console.log(parseFloat(newItem.amount));
          dbBalanceRef = admin.database().ref(`/users/${context.params.uId}/account/assets`);

          return dbBalanceRef.transaction(assets => {
            if (assets) {
              if (newItem.transactionType == 'INCOME') {
                assets = assets + parseFloat(newItem.amount);
              } else {
                assets = assets - parseFloat(newItem.amount);
              }
            }
            return assets;
          });
        case ADD_ACTION_CREDIT:
          console.log('Inintiated with UID: ' + uid + ', action: ' + ADD_ACTION + ' transaction, on ' + lastUpdate);
          dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/creditDebt`);
          dbCreditRef.update({[uid]: newItem})
            .then(res => {
              return res;
            });
          break;
      }

      var dbRef = admin.database().ref(`/users/${context.params.uId}/account/`)
      dbRef.update({lastUpdate})
        .then(res => {
          return res;
        });
      }

    return null;
  });

const getMonthsDiffrence = (firstDate, laterDate) => {
  var date1 = new Date(firstDate);
  var date2 = new Date(laterDate);
  var diffYears = date2.getFullYear() - date1.getFullYear();
  var diffMonths = date2.getMonth() - date1.getMonth();
  var diffDays = date2.getDate() - date1.getDate();

  var months = (diffYears * 12 + diffMonths);
  if (diffDays > 0) {
      months += '.' + diffDays;
  } else if (diffDays < 0) {
      months--;
      months += '.'+ (new Date(date2.getFullYear(), date2.getMonth(),0).getDate() + diffDays);
  }

  return Math.ceil(months);
};

exports.updateLastConnected = functions.database
  .ref('/users/{uId}/account/lastConnected')
  .onUpdate(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();

    const dataRef = admin.database().ref(`/users/${context.params.uId}/account`);
      dataRef.once('value').then(function(snapshot) {
        var data = snapshot.val();
        var nowDt = new Date();

        // create cards debr dates
        var cardsList = data.creditCards;
        var totalCreditDebt = 0;
        var mapCredit = data.creditDebt;
        var sallaryPayDay = false;
        var monthsAmount;

        if (nowDt > new Date(data.sallary.paymentDate) && new Date(data.sallary.paymentDate) > new Date(data.sallary.lastUpdated)) {
          monthsAmount = getMonthsDiffrence(data.sallary.paymentDate, nowDt);

          data.assets += (monthsAmount * data.sallary.amount);
          var payDayDt = new Date(data.sallary.paymentDate);
          payDayDt.setMonth(payDayDt.getMonth() + monthsAmount);
          data.sallary.paymentDate = payDayDt.toISOString();
          data.sallary.lastUpdated = nowDt.toISOString();
          sallaryPayDay = true;
        }

        for (var i = 0; i < cardsList.length; i++) {
          var cardToHandle = null;
          var creditCardDebtDt = cardsList[i].nextDebtDate;

          if (nowDt > new Date(creditCardDebtDt)) {
            cardToHandle = cardsList[i].id;
          }
          var monthsAmount = 0;
          if (cardToHandle !== null) {
            for (var item in mapCredit) {
              if (cardToHandle === mapCredit[item].creditCardId && new Date(mapCredit[item].lastUpdated) < new Date(creditCardDebtDt)) {
                monthsAmount = getMonthsDiffrence(mapCredit[item].lastUpdated, nowDt.toISOString());

                var creditItem = mapCredit[item];
                totalCreditDebt += (mapCredit[item].paymentsRemain >= monthsAmount
                                   ? (monthsAmount * mapCredit[item].monthlyPayment)
                                   : (mapCredit[item].paymentsRemain * mapCredit[item].monthlyPayment));

                if (mapCredit[item].paymentsRemain - monthsAmount > 0) {
                  let dt = new Date();
                  mapCredit[item].paymentsRemain = creditItem.paymentsRemain - monthsAmount;
                  mapCredit[item].amountRemain = creditItem.amountRemain - (creditItem.monthlyPayment * monthsAmount);
                  mapCredit[item].lastUpdated = dt.toISOString();
                } else {
                  list.splice(i, 1);
                  delete mapCredit[item];
                }
              }
            }

            var dt = new Date(creditCardDebtDt);
            dt.setMonth(dt.getMonth() + monthsAmount);
            cardsList[i].nextDebtDate = dt;
          }
        }

        data.creditDebt = mapCredit;
        data.creditCards = cardsList;
        data.assets -= totalCreditDebt;

        if (totalCreditDebt > 0 || sallaryPayDay) {
          dataRef.update(data)
            .then(res => {
              if (totalCreditDebt > 0) {
                console.log('Reduced Monthly credit: ' + totalCreditDebt + ', from account: ' + context.params.uId);
              }
              if (sallaryPayDay) {
                console.log('Added Monthly sallary of:' + data.sallary.amount + (monthsAmount > 1 ? ` (multiple by ${monthsAmount} months)` : '' ) + ' to total assets');
              }
              return res;
            });
        }
      });
    return dataRef;
  });


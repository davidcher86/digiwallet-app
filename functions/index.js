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
  .onUpdate(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();

    var lastUpdate = new Date();
    var newItem = null;
    var uid = null;
    var actionType = null;
    // console.log(context);
    for (let item in after) {
      if (!before.hasOwnProperty(item)) {
        uid = item;
        actionType = ADD_ACTION;
        newItem = after[item];
      }
    }

    if (actionType === null) {
      for (let item in before) {
        if (!after.hasOwnProperty(item)) {
          uid = item;
          actionType = DELETE_ACTION;
          newItem = after[item];
        }
      }
    }
    console.log('uId:', uid);
    if (newItem !== null && uid !== null && actionType !== null) {
      var dbCreditRef;
      switch (actionType) {
        case DELETE_ACTION:
          console.log('Inintiated with UID: ' + uid + ', action: ' + DELETE_ACTION + ' transaction, on ' + lastUpdate);
          dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/credit/${uid}`);
          dbCreditRef.remove();
          break;
        case ADD_ACTION:
          console.log('Inintiated with UID: ' + uid + ', action: ' + ADD_ACTION + ' transaction, on ' + lastUpdate);
          dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/credit`);
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

  // exports.deleteTransaction = functions.database
  // .ref('/users/{uId}/account/transactions/{transactionUID}')
  // .onDelete(async (change, context) => {
  //   const before = change.before.val();
  //   const after = change.after.val();
  //   console.log('change on delete', change);

  //   var lastUpdate = new Date();
  //   var newItem = null;
  //   var uid = null;
  //   for (var item in before) {
  //     // check if the property/key is defined in the object itself, not in parent
  //     if (!after.hasOwnProperty(item)) {
  //       uid = item;
  //       newItem = after[item];
  //       newItem._id = item;
  //     }
  //   }
  //   console.log(newItem);
  //   if (newItem !== null && uid !== null) {
  //     admin.database().ref(`/users/${context.params.uId}/account/credit/${uid}`);
  //     // var dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/credit`);
  //     // dbCreditRef.push(newItem)
  //     // .then(res => {
  //     //   return res;
  //     // });

      // var dbRef = admin.database().ref(`/users/${context.params.uId}/account/`)
      // dbRef.update({lastUpdate})
      // .then(res => {
      //   return res;
      // });
  //   }
  //   return null;
  // });


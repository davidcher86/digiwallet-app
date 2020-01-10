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
    console.log('change on update', change);

    const dataRef = admin.database().ref(`/users/${context.params.uId}/account`);
      dataRef.once('value').then(function(snapshot) {
        var res = snapshot.val();
        console.log(res);
      });
    return null;
  });


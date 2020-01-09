const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('node-fetch');

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });
admin.initializeApp(functions.config().firebase);

exports.updateNewTransaction = functions.database
  .ref('/users/{uId}/account/transactions')
  .onUpdate(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    console.log('change', change);

    var lastUpdate = new Date();
    var newItem = null;
    var uid = null;
    console.log(context);
    for (var item in after) {
      // check if the property/key is defined in the object itself, not in parent
      if (!before.hasOwnProperty(item)) {
        uid = item;
        newItem = after[item];
      }
    }
    console.log('uid:', uid);
    if (newItem !== null && uid !== null) {
      var dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/credit`);
      dbCreditRef.update({[uid]: newItem})
      .then(res => {
        return res;
      });

      var dbRef = admin.database().ref(`/users/${context.params.uId}/account/`)
      dbRef.update({lastUpdate})
      .then(res => {
        return res;
      });
    }
    return null;
  });

  exports.deleteTransaction = functions.database
  .ref('/users/{uId}/account/transactions/{transactionUID}')
  .onDelete(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    console.log('change on delete', change);

    var lastUpdate = new Date();
    var newItem = null;
    var uid = null;
    for (var item in before) {
      // check if the property/key is defined in the object itself, not in parent
      if (!after.hasOwnProperty(item)) {
        uid = item;
        newItem = after[item];
        newItem._id = item;
      }
    }
    console.log(newItem);
    if (newItem !== null && uid !== null) {
      admin.database().ref(`/users/${context.params.uId}/account/credit/${uid}`);
      // var dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/credit`);
      // dbCreditRef.push(newItem)
      // .then(res => {
      //   return res;
      // });

      var dbRef = admin.database().ref(`/users/${context.params.uId}/account/`)
      dbRef.update({lastUpdate})
      .then(res => {
        return res;
      });
    }
    return null;
  });


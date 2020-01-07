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

    // admin.initializeApp({
    //   credential: admin.credential.applicationDefault()
    // });
    var lastUpdate = new Date();
    var newItem = null;
    for (var item in after) {
      // check if the property/key is defined in the object itself, not in parent
      if (!before.hasOwnProperty(item)) {
        newItem = after[item];
        newItem._id = item;
      }
    }

    if (newItem !== null) {
      var dbCreditRef = admin.database().ref(`/users/${context.params.uId}/account/credit`);
      dbCreditRef.push(newItem)
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
    // var data = await dbRef.once('value', (snapshot) => {
    //     var event = snapshot.val();
    //     console.log('snapshot ', snapshot);
    //     console.log('snapshot ', snapshot.val());
    //       return snapshot.val();
    //    })
    //    return data;
    // console.log('functions is triggered');
    // console.log('after', before);
    // console.log('context', context);
    // console.log(Object.keys(after).length);
    // if (Object.keys(after).length === Object.keys(before).length) {
    //   return null;
    // }
    // const timeDate = Date.now();
    // return change.after.ref.update({ timeDate });

    // return change.after.ref.set({ timeDate });
    // return null;
    // return change.after.ref.update({ timeDate });
    // Only edit data when it is first created.
    // if (before.before.exists()) {
    //   return null;
    // }

    // // Exit when the data is deleted.
    // if (!change.after.exists()) {
    //   console.log('sdfsdf', change);
    //   return null;
    // }

    // Grab the current value of what was written to the Realtime Database.
    // const original = change.after.val();
    // console.log('Uppercasing', context.params.pushId, original);
    // const uppercase = original.toUpperCase();

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    // return change.after.ref.parent.child('uppercase').set(uppercase);
  });

  exports.deleteTransaction = functions.database
  .ref('/users/{uId}/account/transactions')
  .onDelete(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    console.log('change', change);

    var lastUpdate = new Date();
    var newItem = null;
    for (var item in before) {
      // check if the property/key is defined in the object itself, not in parent
      if (!after.hasOwnProperty(item)) {
        newItem = after[item];
        newItem._id = item;
      }
    }
    console.log(newItem);
    if (newItem !== null) {
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


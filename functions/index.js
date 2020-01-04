const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('node-fetch');

exports.updateNewTransaction = functions.database
  .ref('/users/{uId}/account/transactions')
  .onWrite((change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    console.log('functions is triggered');
    console.log('after', before);
    console.log('after', after);
    if (before === after) {
      return null;
    }
    const timeDate = Date.now();
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

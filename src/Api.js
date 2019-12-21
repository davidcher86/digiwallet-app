import firebase from 'firebase';

const getDataRef = (uid, targetData) => {
  var refUrl = '';
  switch (targetData) {
    case 'users':
      refUrl = `/users/${uid}`;
      break;
    case 'account':
      refUrl = `/users/${uid}/account`;
      break;
    case 'transactions':
      refUrl = `/users/${uid}/account/transactions`;
      break;
    case 'authentication':
      return firebase.auth();
    default:
      break;
  }

  return firebase.database().ref(refUrl);
};

export function firebaseAction(
  userUID,
  targetData,
  action,
  data,
  fetchAction = null,
) {
  const dataRef = getDataRef(userUID, targetData);
  // var dataRef;
  switch (action) {
    case 'read':
      var data;
      return dataRef.once('value', function(snapshot) {
        data = snapshot.val();
        return data;
      });
    case 'edit':
      return dataRef.update(data);
    case 'add':
      return dataRef.set(data);
    case 'push':
      // console.log('sdfdsfsdfdsf');
      // dataRef = getDataRef(userUID, targetData).onCreate(
      //   (snapshot, context) => {
      //     // Grab the current value of what was written to the Realtime Database.
      //     const original = snapshot.val();
      //     console.log('Uppercasing', context.params.pushId, original);
      //     const uppercase = original.toUpperCase();
      //     // You must return a Promise when performing asynchronous tasks inside a Functions such as
      //     // writing to the Firebase Realtime Database.
      //     // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      //     return snapshot.ref.parent.child('uppercase').set(uppercase);
      //   },
      // );
      return dataRef.set(data);
    case 'delete':
      break;
    case 'register':
      return dataRef.createUserWithEmailAndPassword(data.email, data.password);
    case 'login':
      return dataRef.signInWithEmailAndPassword(data.email, data.password);
    default:
      break;
  }
}

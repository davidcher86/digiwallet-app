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

export function firebaseAction(userUID, targetData, action, data) {
  const dataRef = getDataRef(userUID, targetData);
  switch (action) {
    case 'read':
      return dataRef
        .on('value', function(snapshot) {
          console.log('snapshot', snapshot.val());
          return snapshot.val();
        })
        .then(res => res);
    case 'edit':
      break;
    case 'add':
      return dataRef.set(data);
    case 'push':
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

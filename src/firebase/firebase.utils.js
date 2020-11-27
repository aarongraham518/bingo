import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBl3QXCXB8RbFhSpq7vN0pBjV6LS0MAXc8",
    authDomain: "crwn-db-ca691.firebaseapp.com",
    databaseURL: "https://crwn-db-ca691.firebaseio.com",
    projectId: "crwn-db-ca691",
    storageBucket: "crwn-db-ca691.appspot.com",
    messagingSenderId: "860827044998",
    appId: "1:860827044998:web:cbd44e705f33d2958cd507"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
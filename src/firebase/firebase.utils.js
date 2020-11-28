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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
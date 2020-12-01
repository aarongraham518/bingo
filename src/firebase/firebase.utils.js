import firebase from 'firebase/app';
//used for our database
import 'firebase/firestore';
//used for authentication
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

  /**
   * Creating user profile
   * passing in userAuth which comes from auth
   * 
   */
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    //Query firestore to see if user (uid) exists
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //Pull out a snapShot of userRef place in the database
    //getting back the userRef at the location above
    //note, 'snapShot' only represents the data
    const snapShot = await userRef.get();

    //exists property, lets us know if there is any data there.
    if(!snapShot.exists){
      /**Grab user details that we want to work with
       * by destructoring them from userAuth object
       */
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      /**
       * async request to set this data in our database
       */
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

  //All related to authentication
  export const auth = firebase.auth();

  //our database
  export const firestore = firebase.firestore();

  //Trigger the google popup for authentication and select an account
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  //note, we'll use 'signInWithGoogle' in our signin component
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
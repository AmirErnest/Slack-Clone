import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBDDTtcYZcxOoQ0eVrbGJiTrPfi1K5N1uc",
    authDomain: "slack-clone-challenge-48aa6.firebaseapp.com",
    projectId: "slack-clone-challenge-48aa6",
    storageBucket: "slack-clone-challenge-48aa6.appspot.com",
    messagingSenderId: "907820292091",
    appId: "1:907820292091:web:8b2114c90957e4a57f5d5e"
  };

 const firebaseApp = firebase.initializeApp(firebaseConfig);

 const db = firebaseApp.firestore();

 const auth = firebase.auth(); 

 const provider = new firebase.auth.GoogleAuthProvider();

 export {auth, provider}
 export default db;

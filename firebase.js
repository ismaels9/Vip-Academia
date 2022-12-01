import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCDQSUfbi54QJhdFSAJwB8lThfVvWBBtBo",
    authDomain: "vip-academia.firebaseapp.com",
    databaseURL: "https://vip-academia-default-rtdb.firebaseio.com",
    projectId: "vip-academia",
    storageBucket: "vip-academia.appspot.com",
    messagingSenderId: "292663336079",
    appId: "1:292663336079:web:4de382da55cbf05933a4fa"
  };

  firebase.initializeApp(firebaseConfig);

  export const firebaseAuth = firebase.auth();

  export const firestore = firebase.firestore();

  export const realtime = firebase.database();
  
  export const storage = firebase.storage();
  export default firebase;
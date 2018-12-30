import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBfusUKMM2JZDlhd9uEKLN3iAMgCp_dVpo",
  authDomain: "revents-224619.firebaseapp.com",
  databaseURL: "https://revents-224619.firebaseio.com",
  projectId: "revents-224619",
  storageBucket: "revents-224619.appspot.com",
  messagingSenderId: "128760835956"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;

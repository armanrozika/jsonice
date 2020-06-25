import firebase from "firebase/app"
import "firebase/auth"

var firebaseConfig = {
  apiKey: "AIzaSyBRCi7ldLww74n1mYyhqoT_hNUZMz0BYu4",
  authDomain: "jsonice.com",
  databaseURL: "https://jsonice-f8151.firebaseio.com",
  projectId: "jsonice-f8151",
  storageBucket: "jsonice-f8151.appspot.com",
  messagingSenderId: "641125123132",
  appId: "1:641125123132:web:772690d24f9972c1e9ef39",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase

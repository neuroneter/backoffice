import * as firebase from 'firebase/firebase';
// import 'firebase/firestore';
import 'firebase/firebase-storage';

//Conexion a Firebase
const config = {
  apiKey: "AIzaSyC0BBs3OGb9WZQY7LC23o-9pZCYDL8F0eo",
  authDomain: "backoffice-447b0.firebaseapp.com",
  databaseURL: "https://backoffice-447b0.firebaseio.com",
  projectId: "backoffice-447b0",
  storageBucket: "backoffice-447b0.appspot.com",
  messagingSenderId: "873741884233",
  appId: "1:873741884233:web:e1dca70eda01671dafd898",
  measurementId: "G-007NXHZ4D4"
}

/* Conexion a Juan Firebase
  apiKey: "AIzaSyCojgYpO3o1MZTsWTTEVhZMowAf_zH1k0c",
  authDomain: "bobseller-9ba7e.firebaseapp.com",
  databaseURL: "https://bobseller-9ba7e.firebaseio.com",
  projectId: "bobseller-9ba7e",
  storageBucket: "bobseller-9ba7e.appspot.com",
  messagingSenderId: "392588188069",
  appId: "1:392588188069:web:38d7e68b3c793bcd"
*/

if(!firebase.apps.length){
    firebase.initializeApp(config);
}else{
    firebase.app();  
}


export default firebase;
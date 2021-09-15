import app from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import 'firebase/firestore'
import 'firebase/auth'
 
import firebaseConfig from './config';
 //configuracion para firebase
class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
 
    this.db = app.firestore();
  }
}
 
const firebase = new Firebase();
const db = app.firestore()
const auth = app.auth()
export default {firebase,db,auth};




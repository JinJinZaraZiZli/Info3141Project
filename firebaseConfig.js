import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

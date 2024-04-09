import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
 } else {
   firebase.app();
 }
const firebaseConfig = {
   apiKey: "AIzaSyD76aTPRNZ0ymyIDj5UmrYqGWaegK0HzPU",
   authDomain: "info3141project-f19da.firebaseapp.com",
   projectId: "info3141project-f19da",
   storageBucket: "info3141project-f19da.appspot.com",
   messagingSenderId: "692883357817",
   appId: "1:692883357817:web:018b528ceb3c5ac33954a8",
   measurementId: "G-LHKKY5GVPP"
 };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export default firebase;
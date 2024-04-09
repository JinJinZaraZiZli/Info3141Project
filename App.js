import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostList from './screens/PostList';
import PostDetails from './screens/PostDetails';
import CreatePost from './screens/CreatePost';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const Stack = createStackNavigator();
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
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PostList">
        <Stack.Screen name="PostList" component={PostList} options={{ title: 'Posts' }} />
        <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Post Details' }} />
        <Stack.Screen name="CreatePost" component={CreatePost} options={{ title: 'Create Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);
export default App;

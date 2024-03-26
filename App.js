import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens here
import MainFeed from './screens/MainFeed'; // 메인 피드 화면
import CreatePost from './screens/CreatePost.js'; // 게시물 작성 화면
import Comments from './screens/Comments.js'; // 댓글 화면

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainFeed">
        <Stack.Screen
          name="MainFeed"
          component={MainFeed}
          options={{ title: 'Main' }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ title: 'Post' }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{ title: 'Comment' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

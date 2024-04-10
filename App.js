import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostList from "./screens/PostList";
import CreatePost from "./screens/CreatePost";
import PostDetails from "./screens/PostDetails";
import EditPost from "./screens/EditPost";
import initDB from "./database";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PostList"
          component={PostList}
          options={{ title: "j_choi101747" }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ title: "Create Post" }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ title: "Post Details" }}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{ title: "Edit Post" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

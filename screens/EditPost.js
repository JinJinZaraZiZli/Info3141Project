import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { fetchPostById, updatePost } from "../database";

const EditPost = ({ route, navigation }) => {
  const { postId } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const defaultImage = require("../assets/default.png");

  useEffect(() => {
    fetchPostById(postId, (post) => {
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setImageUri(post.imageUri);
      } else {
        Alert.alert("Error", "Post not found");
        navigation.goBack();
      }
    });
  }, [postId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    updatePost(postId, title, content, imageUri, (success) => {
      if (success) {
        Alert.alert("Success", "Post updated successfully");
        navigation.navigate("PostList");
      } else {
        Alert.alert("Error", "Failed to update post");
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline
      />
      <Image
        source={imageUri ? { uri: imageUri } : defaultImage}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Button title="Choose image" onPress={pickImage} color="#6a1b9a" />
        <Button title="Save Changes" onPress={handleSave} color="#4a148c" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f3e5f5",
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default EditPost;

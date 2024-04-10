import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { insertPost } from "../database";

const CreatePost = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [category, setCategory] = useState("technology");
  const defaultImage = require("../assets/default.png");

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
    insertPost(title, content, author, category, imageUri, (success, data) => {
      if (success) {
        Alert.alert("Success", "Post added successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to add post");
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Content"
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        placeholder="Author"
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Technology" value="technology" />
        <Picker.Item label="Education" value="education" />
        <Picker.Item label="Health" value="health" />
      </Picker>
      <Image
        source={imageUri ? { uri: imageUri } : defaultImage}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Choose image" onPress={pickImage} color="#6a1b9a" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Post" onPress={handleSave} color="#4a148c" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f3e5f5",
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#f3e5f5",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default CreatePost;

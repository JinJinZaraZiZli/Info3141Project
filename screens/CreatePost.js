import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { insertPost } from '../database';

const CreatePost = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSave = () => {
    insertPost(title, content, author, (success, data) => {
      if (success) {
        Alert.alert('Success', 'Post added successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to add post');
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
      <Button title="Save Post" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    height: 50
  }
});

export default CreatePost;

import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';

const PostDetails = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        setPost({ id: doc.id, ...doc.data() });
      });

    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    await firebase.firestore().collection('posts').doc(postId).delete();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post?.title}</Text>
      <Text>{post?.content}</Text>
      <Button title="Delete Post" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default PostDetails;

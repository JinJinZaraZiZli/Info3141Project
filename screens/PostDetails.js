import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { fetchPostById } from '../database';

const PostDetails = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    fetchPostById(postId, setPost);
  }, [postId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.content}>{post?.content}</Text>
      <Text style={styles.info}>Written by: {post?.author}</Text>
      <Text style={styles.info}>On: {post?.created_at}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => navigation.navigate('EditPost', { postId: post?.id })} />
        <Button title="Delete" onPress={() => {
          deletePost(postId, () => {
            alert('Post deleted successfully');
            navigation.goBack();
          });
        }} color="red" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  content: {
    fontSize: 16,
    marginBottom: 10
  },
  info: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20
  }
});

export default PostDetails;

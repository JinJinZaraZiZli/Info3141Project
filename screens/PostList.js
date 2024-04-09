import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { fetchPosts } from '../database';

const PostList = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const updatePosts = navigation.addListener('focus', () => {
      fetchPosts(setPosts);
    });

    return updatePosts;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PostDetails', {
        postId: item.id,
        title: item.title,
        content: item.content
      })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content.slice(0, 60)}...</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <Button
        title="Create New Post"
        onPress={() => navigation.navigate('CreatePost')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  content: {
    fontSize: 16,
  }
});

export default PostList;

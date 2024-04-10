import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { fetchPosts } from "../database";

const PostList = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const updatePosts = navigation.addListener("focus", () => {
      fetchPosts(setPosts);
    });

    return updatePosts;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("PostDetails", {
          postId: item.id,
          title: item.title,
          category: item.category,
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Post list</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button
        title="New Post"
        onPress={() => navigation.navigate("CreatePost")}
        color="#6a1b9a"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    color: "#6a1b9a",
  },
  item: {
    backgroundColor: "#e1bee7",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a148c",
  },
  category: {
    fontSize: 18,
    color: "#6a1b9a",
  },
});

export default PostList;

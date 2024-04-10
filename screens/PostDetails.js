import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { fetchPostById, deletePost } from "../database";
import * as MailComposer from "expo-mail-composer";
import * as SMS from "expo-sms";

const PostDetails = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = React.useState(null);
  const defaultImage = require("../assets/default.png");

  React.useEffect(() => {
    fetchPostById(postId, setPost);
  }, [postId]);

  const sendEmail = () => {
    MailComposer.composeAsync({
      recipients: ["j_choi101747@fanshaweonline.ca"],
      subject: `Sharing Post: ${post?.title}`,
      body: `Title:${post?.title}\nContent:${post?.content}`,
    });
  };

  const sendSMS = () => {
    SMS.sendSMSAsync(["5192807396"], `Post:${post?.title}\n${post?.content}`);
  };

  const imageSource = post?.imageUri ? { uri: post.imageUri } : defaultImage;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.category}>{post?.category}</Text>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.content}>{post?.content}</Text>
      <Text style={styles.info}>Written by: {post?.author}</Text>
      <Text style={styles.info}>On: {post?.created_at}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Edit"
            onPress={() =>
              navigation.navigate("EditPost", { postId: post?.id })
            }
            color="#6a1b9a"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Delete"
            onPress={() => {
              deletePost(postId, (success) => {
                if (success) {
                  alert("Post deleted successfully");
                  navigation.goBack();
                } else {
                  alert("Failed to delete post");
                }
              });
            }}
            color="red"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Email" onPress={sendEmail} color="#4a148c" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="SMS" onPress={sendSMS} color="#4a148c" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4a148c",
  },
  category: {
    fontSize: 18,
    color: "#6a1b9a",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "50%",
    marginTop: 20,
  },
  buttonWrapper: {
    flexBasis: "48%",
    marginBottom: 10,
    paddingHorizontal: 4,
  },
});

export default PostDetails;

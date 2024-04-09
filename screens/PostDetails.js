import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { fetchPostById, deletePost } from "../database";
import * as MailComposer from "expo-mail-composer";
import * as SMS from "expo-sms";

const PostDetails = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    fetchPostById(postId, setPost);
  }, [postId]);

  const sendEmail = () => {
    MailComposer.composeAsync({
      recipients: ["j_choi101747@fanshaweonline.ca"],
      subject: `Sharing Post: ${post?.title}`,
      body: `Hi,\n\nI wanted to share this post with you:\n\n${post?.title}\n${post?.content}\n\nBest Regards,`,
    });
  };

  const sendSMS = () => {
    SMS.sendSMSAsync(
      ["5192807396"],
      `Check out this post:\n${post?.title}\n${post?.content}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.content}>{post?.content}</Text>
      <Text style={styles.info}>Written by: {post?.author}</Text>
      <Text style={styles.info}>On: {post?.created_at}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate("EditPost", { postId: post?.id })}
        />
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
        <Button title="Share via Email" onPress={sendEmail} />
        <Button title="Share via SMS" onPress={sendSMS} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
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
    width: "100%",
    marginTop: 20,
  },
});

export default PostDetails;

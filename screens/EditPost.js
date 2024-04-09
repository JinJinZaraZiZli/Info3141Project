import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { fetchPostById, updatePost } from '../database';

const EditPost = ({ route, navigation }) => {
    const { postId } = route.params;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPostById(postId, (post) => {
            if (post) {
                setTitle(post.title);
                setContent(post.content);
            } else {
                Alert.alert("Error", "Post not found");
                navigation.goBack();
            }
        });
    }, [postId]);

    const handleSave = () => {
        updatePost(postId, title, content, (success) => {
            if (success) {
                Alert.alert("Success", "Post updated successfully");
                navigation.navigate('PostList');
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
            <Button
                title="Save Changes"
                onPress={handleSave}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    }
});

export default EditPost;

import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const MainScreen = ({ navigation }) => {
    const posts = [/* 게시물 데이터 배열 */];

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.id })}>
            <View>
                <Text>{item.title}</Text>
                <Text>{item.excerpt}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                <Text>Create New Post</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MainScreen;

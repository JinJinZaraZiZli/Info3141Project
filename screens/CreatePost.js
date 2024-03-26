import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function CreatePost({ navigation }) {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitPost = () => {
    // 여기에서 게시물 데이터를 서버나 데이터베이스에 제출할 수 있습니다.
    console.log(postText, image);
    // 게시 완료 후 메인 피드로 네비게이션
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        multiline
        placeholder="여기에 글을 작성하세요..."
        style={{ height: 200, padding: 10, width: '90%', borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPostText(text)}
        value={postText}
      />
      <TouchableOpacity onPress={pickImage}>
        <Text>사진 선택</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="게시물 제출" onPress={submitPost} />
    </View>
  );
}

export default CreatePost;

import React, { useState } from 'react';
import { View, Image, Button, TextInput, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddImage = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [altText, setAltText] = useState('');
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      setImageUri(uri);
    }
  };

  const takeImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      setImageUri(uri);
    }
  };

  const useImage = () => {
    if (!imageUri || !altText.trim()) {
      Alert.alert('Error', 'Please select an image and enter alt text.');
      return;
    }
    navigation.navigate('VirtualRoomGallery', { newImage: { uri: imageUri, alt: altText } });
  };

  const clearImage = () => {
    setImageUri(null);
    setAltText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
      </View>
      <TextInput
        style={styles.altTextInput}
        onChangeText={setAltText}
        value={altText}
        placeholder="Alt Text"
      />
      {!imageUri ? (
        <View style={styles.buttons}>
          <Button title="Take Picture" onPress={takeImage} />
          <Button title="Load Picture" onPress={pickImage} />
        </View>
      ) : (
        <View style={styles.buttons}>
          <Button title="Use Picture" onPress={useImage} disabled={!altText.trim()} />
          <Button title="Clear Picture" onPress={clearImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: '90%',
    height: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  altTextInput: {
    width: '90%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default AddImage;

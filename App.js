import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Alert, StyleSheet, Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddImage from './screens/AddImage';

const Stack = createStackNavigator();

const VirtualRoomGallery = ({ navigation }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (navigation.getState().routes.some(route => route.params?.newImage)) {
        const newImage = navigation.getState().routes.find(route => route.params?.newImage)?.params.newImage;
        setImages(currentImages => [newImage, ...currentImages]);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const renderImages = () => {
    return images.map((img, index) => (
      <TouchableOpacity key={index} onPress={() => Alert.alert('Image Alt Text', img.alt)}>
        <Image source={{ uri: img.uri }} style={styles.image} />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gallery}>
        {renderImages()}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddImage')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VirtualRoomGallery">
        <Stack.Screen name="VirtualRoomGallery" component={VirtualRoomGallery} options={{ title: 'J_choi101747 Gallery' }} />
        <Stack.Screen name="AddImage" component={AddImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  gallery: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default App;

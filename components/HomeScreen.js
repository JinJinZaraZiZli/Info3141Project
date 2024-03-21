import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SMS from 'expo-sms';

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const addNewContact = (contact) => {
    setContacts([...contacts, contact]);
    Alert.alert("Contact Added", `Name: ${contact.firstName} ${contact.lastName}`);
  };

  useEffect(() => {
    if (route.params?.newContact) {
      addNewContact(route.params.newContact);
    }
  }, [route.params?.newContact]);

  const sendSMS = async (contact) => {
    const { result } = await SMS.sendSMSAsync(
      [contact.phoneNumber],
      `Hi ${contact.firstName}. This is from Jungwoo's midterm`
    );
  };

  return (
    <View>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => sendSMS(item)}>
            <Text>{item.firstName} {item.lastName}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Add Contact"
        onPress={() => navigation.navigate('ContactInput')}
      />
    </View>
  );
}

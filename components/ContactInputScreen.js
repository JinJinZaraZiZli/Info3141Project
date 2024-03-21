import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ContactInputScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const saveContact = () => {
    navigation.navigate('Home', { newContact: { firstName, lastName, phoneNumber } });
  };

  return (
    <View>
      <TextInput placeholder="First Name" onChangeText={setFirstName} value={firstName} />
      <TextInput placeholder="Last Name" onChangeText={setLastName} value={lastName} />
      <TextInput placeholder="Phone Number" onChangeText={setPhoneNumber} value={phoneNumber} keyboardType="phone-pad" />
      <Button title="Save" onPress={saveContact} />
    </View>
  );
}

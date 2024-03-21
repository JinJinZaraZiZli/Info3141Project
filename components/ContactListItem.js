import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ContactListItem = props => {
    return (
        <TouchableOpacity onPress={() => props.onDelete(props.id)}>
            <View style={styles.listItem}>
                <Text>{props.name} / {props.detail}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default ContactListItem;

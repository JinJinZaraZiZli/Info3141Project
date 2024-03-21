import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet } from 'react-native';

const AddContactModal = props => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredDetail, setEnteredDetail] = useState('');

    const addContactHandler = () => {
        props.onAddContact(enteredName, enteredDetail);
        setEnteredName('');
        setEnteredDetail('');
    };

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Name" 
                    style={styles.input} 
                    onChangeText={setEnteredName} 
                    value={enteredName} 
                />
                <TextInput 
                    placeholder="Number/Email" 
                    style={styles.input} 
                    onChangeText={setEnteredDetail} 
                    value={enteredDetail} 
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="CANCEL" color="red" onPress={props.onCancel} />
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" color="green" onPress={addContactHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    button: {
        width: '40%'
    }
});

export default AddContactModal;

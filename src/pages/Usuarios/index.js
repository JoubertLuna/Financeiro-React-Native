import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default function Usuarios() {
    return (
        <View style={styles.container}>
            <Text>Usuarios</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
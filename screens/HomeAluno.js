import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firebaseAuth, firestore as bd } from '../firebase';

const HomeAluno = () => {
    const navigation = useNavigation()
    const handleSingOut = () => {
        firebaseAuth
            .signOut()
            .then(() => {
                navigation.replace("LogIn")
            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
    }, [])

    return (
        <View style={styles.container}>
            <Text>
                Home Aluno
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleSingOut}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    )

}

export default HomeAluno

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    button: {
        backgroundColor: "yellow",
        width: "60%",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40

    },
    buttonText: {
        color: "black",
        fontWeight: '700',
        fontSize: 16
    },
})
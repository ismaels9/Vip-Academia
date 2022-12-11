import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import { firebaseAuth } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeProfessor({ route, navigation }) {
    const handleSingOut = () => {
        firebaseAuth
            .signOut()
            .then(() => {
                navigation.replace("Login")
                AsyncStorage.removeItem('@loggedUserCache');
            })
            .catch(error => Alert.alert("Erro", error.message))
    }
    const loggedUser = route.params
    return (
        <View style={styles.container}>
            <Image
                resizeMethod='scale'
                style={styles.logo}
                source={require('../../assets/logo.jpg')} />
            <Text style={styles.titulo}> Bem-Vindo, {loggedUser.Name}</Text>
            <View style={styles.containerView}>
                <TouchableOpacity style={[styles.opcao, styles.primaryColor]} onPress={() => navigation.navigate("DefinirTreino")}>
                    <Ionicons name="document-text-outline" size={50} coclor="black" />
                    <Text style={styles.opcaoText}>DEFINIR TREINO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.opcao, styles.primaryColor]} onPress={() => navigation.navigate("CriarTreino")}>
                    <Ionicons name="add-circle-outline" size={50} color="black" />
                    <Text style={styles.opcaoText}>CRIAR TREINO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.opcao, styles.primaryColor]} onPress={() => navigation.navigate("EditarTreino")}>
                    <Ionicons name="pencil-outline" size={50} color="black" />
                    <Text style={styles.opcaoText}>EDITAR TREINO</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerView}>
                <TouchableOpacity style={[styles.opcao, styles.primaryColor]} onPress={() => navigation.navigate("VerAlunos")}>
                    <Ionicons name="people-outline" size={50} color="black" />
                    <Text style={styles.opcaoText}>VER ALUNOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.opcao, styles.primaryColor]} onPress={handleSingOut}>
                    <Ionicons name="log-out-outline" size={50} color="black" />
                    <Text style={styles.opcaoText}>SAIR</Text>
                </TouchableOpacity>
                <View style={[styles.opcao, styles.secundaryColor]}></View>
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "black",
    },
    opcao: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height:150,
        width: "30%",
        paddingTop: 20,
        paddingBottom:20,
        marginLeft: "1%",
        marginRight: "1%",
    },
    primaryColor:{
        backgroundColor: "#F7C724",
    },
    secundaryColor:{
        backgroundColor: "black",
    },
    containerView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom:10,
        width: "100%",
    },
    titulo: {
        color: 'white',
        fontWeight: '900',
        fontSize: 20,
        marginBottom: 20
    },
    logo: {
        marginBottom: 30,
        marginTop: 10,
        width: '40%',
        resizeMode: 'contain',

    },
    opcaoText: {
        fontWeight: '700',
    }
})
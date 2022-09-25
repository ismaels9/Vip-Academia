import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { firebaseAuth } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function HomeProfessor({route, navigation}) {
    const handleSingOut = () => {
        firebaseAuth
            .signOut()
            .then(() => {
                AsyncStorage.removeItem('@usuarioLogadoCache');
                navigation.replace("LogIn") 
            })
            .catch(error => alert(error.message))
    }

    const usuarioLogado = route.params
    return (
        <View style={styles.container}>
            <Image
            resizeMethod='scale'
                style={styles.logo}
                source={require('../assets/logo_menor.jpg')} />
            <Text style={styles.titulo}> Bem-Vindo, {usuarioLogado.Nome}</Text>
            <View style={styles.containerView}>
                <TouchableOpacity style={styles.opcao} onPress= {() => navigation.navigate("DefinirTreino")}>
                <Ionicons name="document-text-outline" size={50} coclor="black" />
                        <Text style={styles.opcaoText}>
                            Definir Treino
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.opcao} onPress= {() => navigation.navigate("CriarTreino")}>
                <Ionicons name="add-circle-outline" size={50} color="black" />
                        <Text style={styles.opcaoText}>
                            Criar treino
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.opcao} onPress= {() => navigation.navigate("EditarTreino")}>
                <Ionicons name="pencil-outline" size={50} color="black" />
                        <Text style={styles.opcaoText}>
                            Editar treino
                        </Text>
                </TouchableOpacity>
                </View>
                <View style = {styles.containerView}>
                <TouchableOpacity style={styles.opcao} onPress= {() => navigation.navigate("VerAlunos")}>
                <Ionicons name="people-outline" size={50} color="black" />
                        <Text style={styles.opcaoText}>
                            Ver Alunos
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.opcao} onPress= {() => navigation.navigate("Mensagens")}>
                <Ionicons name="chatbox-ellipses-outline" size={50} color="black" />
                        <Text style={styles.opcaoText}>
                            Mensagens
                        </Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.opcao} onPress={handleSingOut}>
            <Ionicons name="log-out-outline" size={50} color="black" />
                <Text style={styles.opcaoText}>Sair</Text>

            </TouchableOpacity>


            </View>


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        paddingLeft: 5,
        paddingRight: 5
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
    opcao:{
        flex: 1,
        backgroundColor: "yellow",
        paddingTop: 30,
        paddingBottom: 30,
        margin:5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerView:{
        flex: 0.24,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    titulo:{
        color: 'white',
        fontWeight: '900',
        fontSize: 20,
        marginBottom:20
    }, 
    logo: {
       position: 'absolute',
       top: 80

    },
    opcaoText: {
        fontWeight:'700',
        textTransform: 'uppercase'
        
    }
})
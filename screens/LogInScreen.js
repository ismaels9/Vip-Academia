import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal, Alert } from "react-native";
import { firebaseAuth, firestore as bd } from '../firebase';
import Loading from '../Components/Loading'
import { tradutor } from '../tradutor'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogInScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [telefone, setTelefone] = useState('');
    const [usuarioLogado, setUsuarioLogado] = useState({});
    const [loadingVisible, setLoadingVisible] = useState(false);

    useEffect(() => {
        getData();
        if (usuarioLogado !== null && Object.keys(usuarioLogado).length > 0) {          
            if (usuarioLogado.Tipo == 'Aluno') {
                navigation.replace("HomeAluno", usuarioLogado)
            } else if (usuarioLogado.Tipo == 'Professor') {
                navigation.replace("HomeProfessor", usuarioLogado)
            }
        }
    })


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@usuarioLogadoCache')
            setUsuarioLogado (jsonValue != null ? JSON.parse(jsonValue) : {});
        } catch (e) {
            alert(e.message)
        }
    }
    const salvaCache = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@usuarioLogadoCache', jsonValue)

        } catch (e) {
            alert(e.message);
        }
    }


    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                if (usuarioLogado.Tipo == "Professor") {
                    salvaCache(usuarioLogado);
                    setLoadingVisible(false);
                    navigation.replace("HomeProfessor", usuarioLogado);
                }
                else if (usuarioLogado.Tipo == "Aluno") {
                    salvaCache(usuarioLogado);
                    setLoadingVisible(false);
                    navigation.replace("HomeAluno", usuarioLogado);
                }
            }
        })
        return unsubscribe
    }, [usuarioLogado])


    const getUser = async () => {

        await bd.collection('Usuários').where("Email", "==", email)
            .get()
            .then((querySnapshot) => {
                let usuario_adquirido = {};
                querySnapshot.forEach((doc) => {
                    usuario_adquirido = {
                        id: doc.id,
                        Nome: doc.data().Nome,
                        Tipo: doc.data().Tipo,
                        Email: doc.data().Email,
                    }
                })
                setUsuarioLogado(usuario_adquirido);
            })
    }


    const entrarPressed = () => {
        setLoadingVisible(true);
        handleLogIn();
    }
    const registrarPressed = () => {
        if (nomeUsuario == '' || telefone == '' || email == '' || senha === '') {
            Alert.alert("Erro", "Por favor, preencha todos os campos")
        } else {
            setLoadingVisible(true);
            handleSingUp();
        }
    }

    const jaTenhoContaPressed = () => {
        setEmail('');
        setSenha('');
        setOpenModal('false');
    }
    const handleSingUp = () => {
        firebaseAuth
            .createUserWithEmailAndPassword(email, senha)
            .then(userCredentials => {
                const dadosCadastro = {
                    Nome: nomeUsuario,
                    Telefone: telefone,
                    Email: email,
                    Tipo: "Aluno",
                    ID_Treino: "",
                }
                const res = bd.collection('Usuários').doc(email).set(dadosCadastro);
                const user = userCredentials.user;
                setUsuarioLogado(dadosCadastro);
                salvaCache(dadosCadastro);

            })
            .catch(error => {
                alert(tradutor(error.code, error.message))
                setLoadingVisible(false)
            })
    }
    const handleLogIn = () => {
        firebaseAuth
            .signInWithEmailAndPassword(email, senha)
            .then(userCredentials => {
                getUser();
                const user = userCredentials.user;
            })
            .catch(error => {
                alert(tradutor(error.code, error.message));
                setLoadingVisible(false);
            })
    }
    const forgotPassword = () => {
        setLoadingVisible(true);
        firebaseAuth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Verifique sua caixa de e-mail.');
                setLoadingVisible(false);

            })
            .catch((error) => {
                setLoadingVisible(false)
                alert(tradutor(error.code, error.message))

            });
    }


    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <Loading visible={loadingVisible} />

            <Image
                style={styles.logo}
                source={require('../assets/logo.jpg')} />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Senha"
                    value={senha}
                    onChangeText={text => setSenha(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TouchableOpacity>
                    <Text style={styles.esqueciSenha} onPress={forgotPassword}>
                        Esqueci a Senha
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={entrarPressed}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setOpenModal(true)}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Registrar</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType="slide" transparent={true} visible={openModal}>
                <View style={styles.modalRegistro}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo.jpg')} />
                    <TextInput
                        placeholder="Nome"
                        value={nomeUsuario}
                        onChangeText={text => setNomeUsuario(text)}
                        style={styles.input} />
                    <TextInput
                        placeholder="Telefone"
                        value={telefone}
                        keyboardType="numeric"
                        onChangeText={text => setTelefone(text)}
                        style={styles.input} />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input} />
                    <TextInput
                        placeholder="Senha"
                        value={senha}
                        onChangeText={text => setSenha(text)}
                        style={styles.input}
                        secureTextEntry />
                    <TouchableOpacity
                        onPress={registrarPressed}
                        style={[styles.buttonRegister]}>
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={jaTenhoContaPressed}
                        style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText}>Já tenho conta</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    inputContainer: {
        width: "80%",

    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        textAlign: 'center',
        width: "80%",
        alignSelf: 'center'
    },
    buttonContainer: {
        width: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: "yellow",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonText: {
        color: "black",
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: "black",
        marginTop: 5,
        borderColor: "yellow",
        borderWidth: 2
    },
    buttonOutlineText: {
        color: "yellow",
        fontWeight: '700',
        fontSize: 16,
    },
    modalRegistro: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: 'center',
        borderRadius: 20,
        width: "80%",
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonRegister: {
        backgroundColor: "yellow",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 5
    },
    esqueciSenha: {
        color: "white",
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: '700',


    }
})
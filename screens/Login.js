import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal, Alert } from "react-native";
import { firebaseAuth, firestore as bd } from '../firebase';
import Loading from '../Components/Loading'
import { tradutor } from '../tradutor'
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskInput from "react-native-mask-input";


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loggedUser, setLoggedUser] = useState({});
    const [loadingVisible, setLoadingVisible] = useState(false);

    useEffect(() => {
        getData();
        if (Object.keys(loggedUser).length > 0) {
            if (loggedUser.Tipo == 'Aluno') {
                navigation.replace("HomeAluno", loggedUser)
            } else if (loggedUser.Tipo == 'Professor') {
                navigation.replace("HomeProfessor", loggedUser)
            }
        }
    }, [loggedUser])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@loggedUserCache')
            setLoggedUser(jsonValue != null ? JSON.parse(jsonValue) : {});
        } catch (e) {
            Alert.alert("Erro", e.message)
        }
    }

    const salvaCache = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@loggedUserCache', jsonValue)

        } catch (e) {
            Alert.alert("Erro", e.message)
        }
    }


    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                if (loggedUser.Tipo == "Professor") {
                    salvaCache(loggedUser);
                    setLoadingVisible(false);
                    navigation.replace("HomeProfessor", loggedUser);
                }
                else if (loggedUser.Tipo == "Aluno") {
                    salvaCache(loggedUser);
                    setLoadingVisible(false);
                    navigation.replace("HomeAluno", loggedUser);
                }
            }
        })
        return unsubscribe
    }, [loggedUser])


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
                        ID_Treino: doc.data().ID_Treino,
                        Telefone: doc.data().Telefone
                    }
                })
                setLoggedUser(usuario_adquirido);
            })
    }


    const entrarPressed = () => {
        setLoadingVisible(true);
        handleLogIn();
    }
    const registrarPressed = () => {
        if (name == '' || phone == '' || email == '' || password === '') {
            Alert.alert("Erro", "Por favor, preencha todos os campos")
        } else {
            setLoadingVisible(true);
            handleSignUp();
        }
    }

    const jaTenhoContaPressed = () => {
        setEmail('');
        setPassword('');
        setOpenModal('false');
    }
    const handleSignUp = () => {
        firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const dadosCadastro = {
                    Nome: name,
                    Telefone: phone,
                    Email: email,
                    Tipo: "Aluno",
                    ID_Treino: "",
                }
                const res = bd.collection('Usuários').doc(email).set(dadosCadastro);
                handleLogIn()
            })
            .catch(error => {
                Alert.alert("Erro", tradutor(error.code, error.message))
                setLoadingVisible(false)
            })
    }
    const handleLogIn = () => {
        console.log('aqui')
        firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                console.log('aqui2')

                getUser();
                const user = userCredentials.user;
            })
            .catch(error => {
                console.log('aqui3')

                Alert.alert("Erro", tradutor(error.code, error.message))
                setLoadingVisible(false);
            })
    }
    const forgotPassword = () => {
        setLoadingVisible(true);
        firebaseAuth.sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Redefinição de Senha", "Verifique sua caixa de e-mail")
                setLoadingVisible(false);

            })
            .catch((error) => {
                setLoadingVisible(false)
                Alert.alert("Erro", tradutor(error.code, error.message))

            });
    }
    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Loading visible={loadingVisible} />

            <Image
                source={require('../assets/logo.jpg')}
                style={styles.logo} />
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
                    value={password}
                    onChangeText={text => setPassword(text)}
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
                        source={require('../assets/logo.jpg')}
                        style={styles.logo} />
                    <TextInput
                        placeholder="Nome"
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.input} />
                    <MaskInput
                        style={styles.input}
                        placeholder="Telefone"
                        value={phone}
                        onChangeText={(masked, unmasked) => {
                            setPhone(unmasked);
                        }}
                        keyboardType='numeric'
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                        autoCapitalize='none'

                    />
                    <TextInput
                        placeholder="Senha"
                        value={password}
                        onChangeText={text => setPassword(text)}
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
        backgroundColor: "#F7C724",
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
        borderColor: "#F7C724",
        borderWidth: 2
    },
    buttonOutlineText: {
        color: "#F7C724",
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
        backgroundColor: "#F7C724",
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
    },
    logo: {
        width: '50%',
        resizeMode: 'contain'

    }
})
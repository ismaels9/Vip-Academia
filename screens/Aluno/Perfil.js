import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaskInput from "react-native-mask-input";
import Loading from "../../Components/Loading";
import { firebaseAuth, firestore as bd } from "../../firebase";


export default function Hoje({ route }) {
    const [user, setUser] = useState(route.params.user);
    const [name, setName] = useState(user.Name);
    const [telephone, setTelephone] = useState(user.Telephone);
    const [phoneEditable, setPhoneEditable] = useState(false)
    const [nameEditable, setNameEditable] = useState(false)
    const [loadingVisible, setLoadingVisible] = useState(false)

    const renderizaBotaoName = ((item) => {
        if (nameEditable == true) {
            return (
                <TouchableOpacity onPress={() => handleChangeName()}>
                    <Ionicons name="checkmark-outline" size={30} color="#F7C724" style={styles.icone} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => { setNameEditable(true) }}>
                    <Ionicons name="pencil-outline" size={30} color="#F7C724" style={styles.icone} />
                </TouchableOpacity>
            )
        }

    })

    const phoneButtonRender = (() => {
        if (phoneEditable) {
            return (
                <TouchableOpacity onPress={() => handleChangePhone()}>
                    <Ionicons name="checkmark-outline" size={30} color="#F7C724" style={styles.icone} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => { setPhoneEditable(true) }}>
                    <Ionicons name="pencil-outline" size={30} color="#F7C724" style={styles.icone} />
                </TouchableOpacity>
            )
        }
    })

    const handleChangeName = (() => {
        Keyboard.dismiss()
        bd.collection('Users').doc(user.Email).update({ Name: name })
        Alert.alert("Sucesso", "Nome alterado com sucesso")
        setNameEditable(false)
    })

    const handleChangePhone = (() => {
        Keyboard.dismiss()
        bd.collection('Users').doc(user.Email).update({ Telephone: telephone })
        Alert.alert("Sucesso", "Nome alterado com Sucesso")
        setPhoneEditable(false)
    })

    const handleChangePassword = (() => {
        setLoadingVisible(true);
        firebaseAuth.sendPasswordResetEmail(user.Email)
            .then(() => {
                Alert.alert("Redefinição de Senha","Verifique sua caixa de e-mail")
                setLoadingVisible(false);

            })
            .catch((error) => {
                setLoadingVisible(false)
                Alert.alert("Erro",tradutor(error.code, error.message))

            });
    })


    return (
        <SafeAreaView style={styles.view}>
            <Loading visible={loadingVisible} />
            <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
            <View style={styles.mainViewData}>
                <View>
                    <View style={styles.viewUserData}>
                        <Ionicons name="person-outline" size={30} color="#f7c724" style={styles.icone} />
                        <Text style={styles.textUserData}>Nome:</Text>
                        <TextInput
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.textUserData}
                            editable={nameEditable} />

                        {renderizaBotaoName()}
                    </View>
                    <View style={styles.viewUserData}>
                        <Ionicons name="call-outline" size={30} color="#F7C724" style={styles.icone} />
                        <Text style={styles.textUserData}>Telefone:</Text>
                        <MaskInput
                            style={styles.textUserData}
                            editable={phoneEditable}
                            value={telephone}
                            onChangeText={(masked, unmasked) => {
                                setTelephone(unmasked);
                            }}
                            keyboardType='numeric'
                            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        />
                        {phoneButtonRender()}
                    </View>
                </View>
                <View style={styles.viewOptions}>
                    <View style={styles.viewUserData}>
                        <Ionicons name="key-outline" size={30} color="#F7C724" style={styles.icone} />
                        <TouchableOpacity onPress={handleChangePassword}><Text style={styles.textUserData}>ALTERAR SENHA</Text></TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.textFooter}>Powered by VIP ACADEMIA</Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "black",
    },

    logo: {
        width: '35%',
        marginTop: -50,
        resizeMode: 'contain',
        marginBottom: -30,
        alignSelf: 'center'
    },
    viewUserData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    textUserData: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        margin: 5,
        padding: 5
    },
    mainViewData: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
    },
    icone: {
        marginRight: 10,
        marginLeft: 10
    },
    textFooter: {
        color: '#555454',
        fontSize: 15,
        fontWeight: 'bold',
    },
    viewOptions: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
    },

})
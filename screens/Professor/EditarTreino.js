import React, { useState, useEffect } from "react";
import { View, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { firestore as bd } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';




export default function EditarTreino({ navigation }) {
    const [fichas, setFichas] = useState([])

    useEffect(() => {
        getFichas()
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Editar fichas de treino",
            headerTitleAlign: 'center',
            textAlign: 'center',
        })
    })

    const getFichas = async () => {
        await bd.collection('Fichas')
            .get()
            .then((querySnapshot) => {
                let fichas_adquiridas = [];
                querySnapshot.forEach((doc) => {
                    let ficha_adquirida = {
                        id: doc.id,
                        Nome: doc.data().Nome,
                        Segunda: doc.data().Segunda,
                        Terca: doc.data().Terca,
                        Quarta: doc.data().Quarta,
                        Quinta: doc.data().Quinta,
                        Sexta: doc.data().Sexta,
                    }
                    fichas_adquiridas.push(ficha_adquirida);
                })
                if (fichas_adquiridas.length > 0) {
                    setFichas(fichas_adquiridas);
                }
                else {
                    alert("VOCÊ NÃO POSSUI FICHAS CADASTRADAS")
                    navigation.goBack();

                }
            }).catch(error => {
                alert(error.code, error.message)
            })
    }

    const apertouFicha = ((ficha_clicada) => {
        Alert.alert(
            "Selecione uma opção",
            "Você deseja ver ou editar a ficha?",
            [
                { text: "Cancelar", onPress: (() => { }) },
                {
                    text: "Ver",
                    onPress: (() => {
                        navigation.replace("TelaVerTreino", ficha_clicada)
                    }),
                },
                {
                    text: "Editar",
                    onPress: (() => {
                        navigation.replace("TelaEditarTreino", ficha_clicada)
                    }),
                },
            ]
        );

    })

    const apertouExcluir = (() => {
        Alert.alert(
            "Tem certeza que deseja excluir a ficha?", "",
            [
                {
                    text: "Sim",
                    onPress: (() => {
                        try{
                            const res = bd.collection('Fichas').doc(ficha_clicada.id).delete();
                            alert("Ficha excluída com sucesso");
                            navigation.goBack();

                        }catch(e){
                            alert(e.message)
                        }
                    }),
                },
                { text: "Não", onPress: (() => { }) },
            ]
        );
    })

    return (
        <ScrollView style={styles.view}>
            <Text style={styles.textFichas}>
                Fichas
            </Text>
            {
                fichas.map((item, index) => {
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.itemContainer} onPress={() => apertouFicha(item)}>
                                <Ionicons name="document-text-outline" size={35} color="white" />
                                <Text style={styles.textName}>{item.Nome}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => apertouExcluir(item)}>
                                <Ionicons name="close-circle-outline" size={30} color="red" style={{ alignSelf: 'flex-end' }} />
                            </TouchableOpacity>
                        </View>

                    )
                })}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    view: {
        backgroundColor: "black"
    },
    textFichas: {
        fontSize: 25,
        textAlign: 'center',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10,
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: '600',
        color: 'white'

    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: 'grey',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
})
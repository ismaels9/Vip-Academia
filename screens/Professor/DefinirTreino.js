import React, { useEffect, useState } from "react";
import { View, Modal, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { firestore as bd } from '../../firebase'
import Ionicons from '@expo/vector-icons/Ionicons';
import DialogWithList from "../../Components/DialogWithList";




export default function DefinirTreino({ navigation }) {
    const [alunos, setAlunos] = useState([]);
    const [filteredAlunos, setFilteredAlunos] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [pressedAluno, setPressedAluno] = useState({});
    const [fichas, setFichas] = useState([]);
    const [somenteSemFicha, setSomenteSemFicha] = useState(false)
    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Definir treino para Aluno",
            headerSearchBarOptions: {
                placeholder: "Digite o nome do Aluno",
                headerIconColor: 'white',
                textColor: 'gray',
                onChangeText: (event) => {
                    searchFilterFunction(event.nativeEvent.text);
                },
            },
        })
            , []
    })

    useEffect(() => {
        getUsers()
        getFichas()
    }, [])
    const getUsers = async () => {
        await bd.collection('Usuários').where("Tipo", '==', "Aluno")
            .get()
            .then((querySnapshot) => {
                let usuarios_adquiridos = [];
                querySnapshot.forEach((doc) => {
                    let usuario_adquirido = {
                        id: doc.id,
                        Nome: doc.data().Nome,
                        Tipo: doc.data().Tipo,
                        Email: doc.data().Email,
                        Treino: doc.data().ID_Treino,
                        Telefone: doc.data().Telefone,
                    }
                    usuarios_adquiridos.push(usuario_adquirido);
                })
                usuarios_adquiridos.sort((a, b) => a.Nome < b.Nome)
                usuarios_adquiridos.sort((a, b) => a.ID_Treino > b.ID_Treino)
                setAlunos(usuarios_adquiridos);
                setFilteredAlunos(usuarios_adquiridos);
            }).catch(error => {
                Alert.alert("Erro",error.code, error.message)
            })
    }
    const getFichas = async () => {
        await bd.collection('Fichas')
            .get()
            .then((querySnapshot) => {
                let fichas_adquiridas = [];
                querySnapshot.forEach((doc) => {
                    let ficha_adquirida = {
                        id: doc.id,
                        Nome: doc.data().Nome,
                    }
                    fichas_adquiridas.push(ficha_adquirida);
                })
                setFichas(fichas_adquiridas);
            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })
    }
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = alunos.filter(item => {
                const itemData = item.Nome ? item.Nome.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredAlunos(newData);

        } else {
            setFilteredAlunos(alunos);
        }
    }
    const alunoSemTreino = ((id) => {
        const usuario = filteredAlunos.find((usuario, index, array) => usuario.id === id);
        if (usuario.Treino === "") {
            return (
                <View style={styles.semTreino}>
                    <Ionicons name="alert-circle-outline" size={30} color="red" />
                </View>
            )
        }
    })

    const renderizaDialog = (() => {
        if (fichas.length > 0) {
            return (
                <DialogWithList
                    visible={visibleModal}
                    Fechar={() => setVisibleModal(false)}
                    Lista={fichas}
                    Aluno={pressedAluno} 
                />
            )
        } else {
        }
    })

    const apertouAluno = ((item) => {
        setPressedAluno(item)
        setVisibleModal(true)
    })

    const toggleSwitch = () => setSomenteSemFicha(previousState => !previousState);

    const alunosMostrando = ((item, index) => {
        if(somenteSemFicha && item.Treino==""){
            return (
                <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => apertouAluno(item)}>
                <Ionicons name="person-outline" size={35} color="white" />
                <View>
                    <Text style={styles.textName}>{item.Nome}</Text>
                    <Text style={styles.textEmail}>{item.Email}</Text>
                </View>
                {alunoSemTreino(item.id)}
            </TouchableOpacity>
            )

        }else if(!somenteSemFicha){
            return(
            <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => apertouAluno(item)}>
                        <Ionicons name="person-outline" size={35} color="white" />
                        <View>
                            <Text style={styles.textName}>{item.Nome}</Text>
                            <Text style={styles.textEmail}>{item.Email}</Text>
                        </View>
                        {alunoSemTreino(item.id)}
                    </TouchableOpacity>
            )
        }
    })
    return (
        <ScrollView style={{backgroundColor: 'black'}}>

            <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center'}}>
                <Text style={{color: 'red', paddingRight: 10, fontSize: 15}} >Somente alunos sem ficha</Text>
            <Switch
                trackColor={{ false: "#767577", true: 'red' }}
                thumbColor={somenteSemFicha ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={somenteSemFicha}
            />
            </View>

            {filteredAlunos.map((item, index) => {
                return (
                    alunosMostrando(item,index)

                )
            })}
            {renderizaDialog()}

        </ScrollView>
    )
}
const styles = StyleSheet.create({
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
        marginLeft: 10
    },
    textSemTreino: {
        color: "red",

    },
    semTreino: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10
    }
})
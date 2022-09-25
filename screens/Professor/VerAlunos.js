import React, { useEffect, useState } from "react";
import { View, Modal, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { firestore as bd } from '../../firebase'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function VerAlunos({navigation}) {
    const [alunos, setAlunos] = useState([]);
    const [filteredAlunos, setFilteredAlunos] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [pressedAluno, setPressedAluno] = useState({});

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Aluno Cadastrados",
            headerSearchBarOptions: {
                placeholder: "Digite o nome do Aluno",
                headerIconColor: 'white',
                textColor: 'gray',
                onChangeText: (event) => {
                    searchFilterFunction(event.nativeEvent.text);
                },
            },
        })
    ,[]})

    useEffect(() => {
        getUsers()
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
                usuarios_adquiridos.sort((a,b) => a.Nome < b.Nome)
                usuarios_adquiridos.sort((a,b) => a.ID_Treino > b.ID_Treino)
                setAlunos(usuarios_adquiridos);
                setFilteredAlunos(usuarios_adquiridos);
            }).catch(error => {
                alert(error.code, error.message)
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

    const treinoAluno = ((item) => {
        if(item == ""){
            return(
            <Text style={{fontSize: 14, marginLeft: 10, color: 'red',}}>Ficha Associada: Aluno sem treino</Text>
            )
 
        }else{
            return(
            <Text style={{fontSize: 14, marginLeft: 10, color: 'white',}}>Ficha Associada: {item}</Text>
            )
        }

    })

    const apertouAluno = ((aluno_clicado) => {
        Alert.alert(
            "Selecione uma opção",
            "Você deseja editar ficha do aluno ou excluir o aluno?",
            [
                { text: "Cancelar", onPress: (() => { }) },
                {
                    text: "Editar",
                    onPress: (() => {
                        navigation.replace("DefinirTreino")
                    }),
                },
                {
                    text: "Excluir", onPress: (() => {
                        Alert.alert(
                            "Tem certeza que deseja excluir o aluno?", "",
                            [
                                {
                                    text: "Sim",
                                    onPress: (() => {
                                        try{
                                            const res = bd.collection('Usuários').doc(aluno_clicado.id).delete();
                                            alert("Usuário excluído com sucesso");
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
                },

            ]
        );

    })


    return(

        <ScrollView style={styles.view}>

            {filteredAlunos.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => apertouAluno(item)}>
                        <Ionicons name="person-outline" size={35} color="white" />
                        <View>
                            <Text style={styles.textName}>{item.Nome}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center', marginLeft: 10,}}>
                            <Ionicons name="at-outline" size={15} color="yellow" />
                                <Text style={styles.textEmail}>{item.Email}   </Text>
                                <Ionicons name="call-outline" size={15} color="yellow" />
                                <Text style={styles.textEmail}>{item.Telefone}</Text>
                            </View>
                            {treinoAluno(item.Treino)}
                            </View>
                    </TouchableOpacity>

                )
            })}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    view: {
        backgroundColor: "black"
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
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: 'dotted',
        padding: 3
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
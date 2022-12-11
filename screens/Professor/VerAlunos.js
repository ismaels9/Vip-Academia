import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { firestore as bd } from '../../firebase'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getUsers } from "../../Components/Functions";

export default function VerAlunos({navigation}) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
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
        getData()
        }, [])

    const getData = (async() => {
        let aux = await getUsers('all', 'Normal')
        if(aux == 'No matching documents.'){
            Alert.alert("Sem alunos cadastrados", "Não existem alunos cadastrados")
            navigation.goBack()
        }
        aux.sort((a,b) => a.Name > b.Name)
        setUsers(aux)
        setFilteredUsers(aux)
    }) 

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = users.filter(item => {
                const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredUsers(newData);

        } else {
            setFilteredUsers(users);
        }
    }

    const userWorkoutLog = ((item) => {
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

    const userPressed = ((pressedUser) => {
        Alert.alert(
            "Selecione uma opção",
            "Você deseja editar a ficha do aluno ou excluir o aluno?",
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
                            "Confirmação de exclusão", "Tem certeza que deseja excluir o aluno?", 
                            [
                                { text: "CANCELAR", onPress: (() => { }) },
                                {
                                    text: "SIM",
                                    onPress: (() => {
                                        try {
                                            const res = bd.collection('Users').doc(pressedUser.id).delete();
                                            Alert.alert("Sucesso", "Aluno excluído com sucesso");
                                            navigation.goBack();

                                        } catch (e) {
                                            Alert.alert("Erro", e.message)
                                        }
                                    }),
                                },
                                
                            ]
                        );
                    })
                },

            ]
        );

    })
    return(
        <ScrollView style={styles.view}>

            {filteredUsers.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => userPressed(item)}>
                        <Ionicons name="person-outline" size={35} color="white" />
                        <View>
                            <Text style={styles.textName}>{item.Name}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center', marginLeft: 10,}}>
                            <Ionicons name="at-outline" size={15} color="#F7C724" />
                                <Text style={styles.textEmail}>{item.Email}   </Text>
                                <Ionicons name="call-outline" size={15} color="#F7C724" />
                                <Text style={styles.textEmail}>{item.Telephone}</Text>
                            </View>
                            {userWorkoutLog(item.WorkoutLog)}
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
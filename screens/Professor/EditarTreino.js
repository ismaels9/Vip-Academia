import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { firestore as bd } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getWorkoutLogs } from "../../Components/Functions";

export default function EditarTreino({ navigation }) {
    const [workoutLogs, setWorkoutLogs] = useState([])
    const [filteredWorkoutLogs, setFilteredWorkoutLogs] = useState([]);


    useEffect(() => {
        getData()
        if(workoutLogs == 'No matching documents.'){
            Alert.alert("Sem ficha cadastradas", "Não existem fichas cadastradas")
            navigation.goBack()
        }
    }, [])

    const getData = (async () => {
        let aux = await getWorkoutLogs('all')
        setWorkoutLogs(aux) 
        setFilteredWorkoutLogs(aux)
    })

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Editar fichas de treino",
            headerSearchBarOptions: {
                placeholder: "Digite o nome da Ficha",
                headerIconColor: 'white',
                textColor: 'gray',
                onChangeText: (event) => {
                    searchFilterFunction(event.nativeEvent.text);
                },
            },
        })
    })
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = workoutLogs.filter(item => {
                const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredWorkoutLogs(newData);

        } else {
            setFilteredWorkoutLogs(workoutLogs);
        }
    }

    const workoutLogPressed = ((workoutLogPressed) => {
        Alert.alert(
            "Selecione uma opção",
            "Você deseja ver ou editar a ficha?",
            [
                { text: "Cancelar", onPress: (() => { }) },
                {
                    text: "Ver",
                    onPress: (() => {
                        navigation.replace("VerTreino", workoutLogPressed)
                    }),
                },
                {
                    text: "Editar",
                    onPress: (() => {
                        navigation.replace("EditarFichaJaCriada", workoutLogPressed)
                    }),
                },
            ]
        );

    })

    const deletePressed = ((workoutLogPressed) => {
        Alert.alert(
            "Exclusão de ficha", "Tem certeza que deseja excluir a ficha?",
            [
                { text: "CANCELAR", onPress: (() => { }) },
                {
                    text: "SIM",
                    onPress: (() => {
                        try{ 
                            const res = bd.collection('WorkoutLogs').doc(workoutLogPressed.id).delete();       
                            bd.collection('Users').where("WorkoutLog", "==", workoutLogPressed.id)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                doc.ref.update({WorkoutLog: ""});
                            }
                            )
                        })
                            Alert.alert("Sucesso","Ficha excluída com sucesso");
                            navigation.goBack();
                        }catch(e){
                            Alert.alert("Erro" ,e.message)
                        }
                    }),
                },
                
            ]
        );
    })

    return (
        <ScrollView style={styles.view}>
            <Text style={styles.textFichas}>
                Fichas
            </Text>
            {
                filteredWorkoutLogs.map((item, index) => {
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.itemContainer} onPress={() => workoutLogPressed(item)}>
                                <Ionicons name="document-text-outline" size={35} color="white" />
                                <Text style={styles.textName}>{item.Name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deletePressed(item)}>
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
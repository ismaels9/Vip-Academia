import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { firestore as bd } from '../../firebase'
import Ionicons from '@expo/vector-icons/Ionicons';
import DialogWithList from "../../Components/DialogWithList";
import { getUsers, getWorkoutLogs } from "../../Components/Functions";

export default function DefinirTreino({ navigation }) {
    const [user, setUser] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [pressedUser, setPressedUser] = useState({});
    const [workoutLogs, setWorkoutLogs] = useState([]);
    const [withoutWorkoutLog, setWithoutWorkoutLog] = useState(false)
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
        }), []
    })
    useEffect(() => {
        getData()
    }, [])

    const getData = (async () => {
        let auxUser = await getUsers('all', 'Normal')
        auxUser.sort((a, b) => a.Name > b.Name)
        setUser(auxUser)
        setFilteredUsers(auxUser)
        let auxLogs = await getWorkoutLogs('all')
        setWorkoutLogs(auxLogs);

    })

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = user.filter(item => {
                const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredUsers(newData);

        } else {
            setFilteredUsers(user);
        }
    }
    const userWithoutWorkoutLog = ((id) => {
        const auxUser = filteredUsers.find((auxUser) => auxUser.id === id);
        if (auxUser.WorkoutLog === "") {
            return (
                <View style={styles.semTreino}>
                    <Ionicons name="alert-circle-outline" size={30} color="red" />
                </View>
            )
        }
    })

    const rendersDialog = (() => {
        if (workoutLogs.length > 0 && workoutLogs !== 'No Matching Documents.') {
            let workoutLogsArray = []
            workoutLogs.forEach((item) => {
                let workoutLogsAux = { label: item.Name, value: item.Name }
               workoutLogsArray.push(workoutLogsAux)
          })
          console.log(workoutLogs)
            return (
                <DialogWithList
                    visible={visibleModal}
                    Close={() => setVisibleModal(false)}
                    workoutLogs={workoutLogsArray}
                    user={pressedUser}
                />
            )
        }
    })

    const userPressed = ((item) => {
        if( workoutLogs == 'No matching documents.'){
            Alert.alert('Sem fichas cadastradas', 'Cadastre uma ficha primeiro')
        } else{
        setPressedUser(item)
        setVisibleModal(true)
        }
    })

    const toggleSwitch = () => setWithoutWorkoutLog(previousState => !previousState);
    
    const usersShowing = ((item, index) => {
        if (withoutWorkoutLog && item.WorkoutLog == "") {
            return (
                <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => userPressed(item)}>
                    <Ionicons name="person-outline" size={35} color="white" />
                    <View>
                        <Text style={styles.textName}>{item.Name}</Text>
                        <Text style={styles.textEmail}>{item.Email}</Text>
                    </View>
                    {userWithoutWorkoutLog(item.id)}
                </TouchableOpacity>
            )

        } else if (!withoutWorkoutLog) {
            return (
                <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => userPressed(item)}>
                    <Ionicons name="person-outline" size={35} color="white" />
                    <View>
                        <Text style={styles.textName}>{item.Name}</Text>
                        <Text style={styles.textEmail}>{item.Email}</Text>
                    </View>
                    {userWithoutWorkoutLog(item.id)}
                </TouchableOpacity>
            )
        }
    })
    return (
        <ScrollView style={{ backgroundColor: 'black' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ color: 'red', paddingRight: 10, fontSize: 15 }} >Somente alunos sem ficha</Text>
                <Switch
                    trackColor={{ false: "#767577", true: 'red' }}
                    thumbColor={withoutWorkoutLog ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={withoutWorkoutLog}
                />
            </View>

            {filteredUsers.map((item, index) => {
                return (
                    usersShowing(item, index)
                )
            })}
            {rendersDialog()}

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
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { firestore as bd } from '../../firebase'
import Ionicons from '@expo/vector-icons/Ionicons';
import DialogWithList from "../../Components/DialogWithList";

export default function DefinirTreino({ navigation }) {
    const [user, setUser] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [pressedUser, setPressedUser] = useState({});
    const [exerciseSheet, setExerciseSheet] = useState([]);
    const [withoutExerciseSheet, setWithoutExerciseSheet] = useState(false)
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
        getExercisesSheets()
    }, [])
    const getUsers = async () => {
        await bd.collection('Usuários').where("Tipo", '==', "Aluno")
            .get()
            .then((querySnapshot) => {
                let auxUsersArray = [];
                querySnapshot.forEach((doc) => {
                    let auxUsers = {
                        id: doc.id,
                        Name: doc.data().Nome,
                        Role: doc.data().Tipo,
                        Email: doc.data().Email,
                        ExerciseSheet: doc.data().ID_Treino,
                        Telephone: doc.data().Telefone,
                    }
                    auxUsersArray.push(auxUsers);
                })
                auxUsersArray.sort((a, b) => a.Name < b.Name)
                auxUsersArray.sort((a, b) => a.ExerciseSheet > b.ExerciseSheet)
                setUser(auxUsersArray);
                setFilteredUsers(auxUsersArray);
            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })
    }
    const getExercisesSheets = async () => {
        await bd.collection('Fichas')
            .get()
            .then((querySnapshot) => {
                let auxExercisesSheetsArray = [];
                querySnapshot.forEach((doc) => {
                    let auxExerciseSheet = {
                        id: doc.id,
                        Name: doc.data().Nome,
                    }
                    auxExercisesSheetsArray.push(auxExerciseSheet);
                })
                setExerciseSheet(auxExercisesSheetsArray);
            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })
    }
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
    const userWithoutExerciseSheet = ((id) => {
        const auxUser = filteredUsers.find((auxUser) => auxUser.id === id);
        if (auxUser.ExerciseSheet === "") {
            return (
                <View style={styles.semTreino}>
                    <Ionicons name="alert-circle-outline" size={30} color="red" />
                </View>
            )
        }
    })

    const rendersDialog = (() => {
        if (exerciseSheet.length > 0) {
            return (
                <DialogWithList
                    visible={visibleModal}
                    Close={() => setVisibleModal(false)}
                    exerciseSheet={exerciseSheet}
                    user={pressedUser}
                />
            )
        } else {
        }
    })

    const userPressed = ((item) => {
        setPressedUser(item)
        setVisibleModal(true)
    })

    const toggleSwitch = () => setWithoutExerciseSheet(previousState => !previousState);

    const usersShowing = ((item, index) => {
        if (withoutExerciseSheet && item.ExerciseSheet == "") {
            return (
                <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => userPressed(item)}>
                    <Ionicons name="person-outline" size={35} color="white" />
                    <View>
                        <Text style={styles.textName}>{item.Name}</Text>
                        <Text style={styles.textEmail}>{item.Email}</Text>
                    </View>
                    {userWithoutExerciseSheet(item.id)}
                </TouchableOpacity>
            )

        } else if (!withoutExerciseSheet) {
            return (
                <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => userPressed(item)}>
                    <Ionicons name="person-outline" size={35} color="white" />
                    <View>
                        <Text style={styles.textName}>{item.Name}</Text>
                        <Text style={styles.textEmail}>{item.Email}</Text>
                    </View>
                    {userWithoutExerciseSheet(item.id)}
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
                    thumbColor={withoutExerciseSheet ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={withoutExerciseSheet}
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
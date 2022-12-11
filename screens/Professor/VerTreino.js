import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalVariables from './../../Components/GlobalVariables'

export default function VerTreino({ route, navigation }) {
    const workoutLogToSee = route.params
    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Ver ficha de treino",
            headerTitleAlign: 'center',
            textAlign: 'center',
        })
    })
    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.view}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Nome da Ficha: {workoutLogToSee.Nome}</Text>
                {GlobalVariables.weekDays.map((item, index) => {
                    return (
                        <View style={styles.viewDias} key={index}>
                            <Text style={styles.textoDias}>{item.label}</Text>
                            {workoutLogToSee[item.value].map((item, index) => {
                                return (
                                    <View key={index} style={{ width: '85%' }}>
                                        <View style={styles.itemContainer} onPress={() => { }}>
                                            <Ionicons name="barbell-outline" size={35} color="white" style={{ paddingRight: 10 }} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.textName}>{item.Exercise}</Text>
                                                <Text style={styles.textDescricao}>{item.Description}</Text>
                                            </View>
                                        </View>

                                    </View>
                                )
                            })}
                        </View>
                    )
                })}

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        backgroundColor: 'black',
    },
    view: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: '600',
        color: 'white'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
    textDescricao: {
        fontSize: 14,
        marginLeft: 10,
        color: 'grey',
    },
    textoDias: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginRight: 10
    },
    viewDias: {
        padding: 10,
        width: "100%",
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: 'white',
        borderRadius: 10,
        margin: 5
    }
})
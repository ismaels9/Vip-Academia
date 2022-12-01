import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function VerTreino({route, navigation}) {
    const fichaEditada = route.params
    console.log(fichaEditada)

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Ver ficha de treino",
            headerTitleAlign: 'center',
            textAlign: 'center',
        })
    })

    const verificaDia = ((dia, arrayDia) => {
        if (arrayDia != undefined) {
            return (
                <View style={styles.viewDias}>
                    <Text style={styles.textoDias}>{dia}</Text>
                    {listaExercicio(arrayDia)}
                </View>
            )
        }

    })

    const listaExercicio = ((array)=> {
        return(
            <View>
            {array.map((item, index) => {
                return (
                    <View key={index} style={{width: '85%'}}>
                        <View style={styles.itemContainer} onPress={() => {}}>
                            <Ionicons name="barbell-outline" size={35} color="white" style={{paddingRight:10}}/>
                            <View style={{flexDirection:'column'}}>
                            <Text style={styles.textName}>{item.Exercicio}</Text>
                            <Text style={styles.textDescricao}>{item.Descricao}</Text>
                            </View>
                        </View>
                        
                    </View>
                )
            })}
            </View>
        )
    }) 
    
    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.view}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Nome da Ficha: {fichaEditada.Nome}</Text> 
            {verificaDia("Segunda",fichaEditada.Segunda)}
            {verificaDia("Terça",fichaEditada.Terca)}
            {verificaDia("Quarta",fichaEditada.Quarta)}
            {verificaDia("Quinta",fichaEditada.Quinta)}
            {verificaDia("Sexta",fichaEditada.Sexta)}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollview: {
        flex:1,
        backgroundColor: 'black',
    },
    view:{
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textName:{
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
    textoDias:{
        color: 'white', 
        fontSize: 15, 
        fontWeight: 'bold', 
        alignSelf:'flex-start',
        marginRight: 10
    },
    viewDias:{
        padding: 10,
        width: "100%",
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: 'white',
        borderRadius: 10,
        margin: 5
    }
})
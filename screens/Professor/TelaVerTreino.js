import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { firestore as bd } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TelaVerTreino({route, navigation}) {
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
    
    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.view}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Nome da Ficha: {fichaEditada.Nome}</Text> 
            <View style={styles.viewDias}>
            <Text style={styles.textoDias}>Segunda</Text>

            {
                fichaEditada.Segunda.map((item, index) => {
                    return (
                        <View key={index} style={{width: '100%'}}>
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
            <View style={styles.viewDias}>
            <Text style={styles.textoDias}>Terça</Text>

            {
                fichaEditada.Terca.map((item, index) => {
                    return (
                        <View key={index} style={{width: '100%'}}>
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
            <View style={styles.viewDias}>
            <Text style={styles.textoDias}>Quarta</Text>

            {
                fichaEditada.Quarta.map((item, index) => {
                    return (
                        <View key={index} style={{width: '100%'}}>
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
            <View style={styles.viewDias}>
            <Text style={styles.textoDias}>Quinta</Text>

            {
                fichaEditada.Quinta.map((item, index) => {
                    return (
                        <View key={index} style={{width: '100%'}}>
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
            <View style={styles.viewDias}>
            <Text style={styles.textoDias}>Sexta</Text>

            {
                fichaEditada.Sexta.map((item, index) => {
                    return (
                        <View key={index} style={{width: '100%'}}>
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
import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import GlobalVariables from '../../Components/GlobalVariables'

export default function Hoje({ route }) {
    const [workoutLog, setWorkoutLog] = useState(route.params.workoutLog);
    const [workoutSelectedDay, setWorkoutSelectedDay] = useState(workoutLog.Monday)
    const [selectedDay, setSelectedDay] = useState('Monday')


    const handleClick = ((item) => {
        setSelectedDay(item)
        setWorkoutSelectedDay(workoutLog[item])
    })

    function isSelected(dayPressed){
        if(dayPressed == selectedDay){
            return styles.backColorYellow
        }
        return styles.backColorGray
    }

    const renderizaLista = (() => {
        if (workoutLog == 'Without Workout Log') {
            return (
                <View style={styles.viewError}>
                    <Image source={require('../../assets/botao-x.png')} style={styles.iconeErro} />
                    <Text style={styles.textErro}>
                        Sem ficha de treino 😕
                    </Text>
                    <Text style={styles.textErrod}>
                        Por Favor, solicite a um professor, o cadastro de sua ficha de treino
                    </Text>

                </View>
            )
        } else {
            return (
                <ScrollView style={styles.scrollViewExercicios}>
                    <View style={styles.itemsContainer}>
                        <View style={styles.simbolos}>
                            <Image source={require('../../assets/dashed-circle.png')} style={styles.circle} tintColor='#f7c724' />
                            <Image source={require('../../assets/vertical-line.png')} style={styles.circle} tintColor='#f7c724' />
                        </View>
                        <View style={styles.textos}>
                            <Text style={styles.textName}>ínicio do treino</Text>
                        </View>
                    </View>
                    {workoutSelectedDay.map((item, index) => {
                        return (
                            <View style={styles.itemsContainer} key={index}>
                                <View style={styles.simbolos}>
                                    <Image source={require('../../assets/dashed-circle.png')} style={styles.circle} tintColor='#f7c724' />
                                    <Image source={require('../../assets/vertical-line.png')} style={styles.circle} tintColor='#f7c724' />
                                </View>
                                <View style={styles.textos}>
                                    <Text style={styles.textName}>{item.Exercise}</Text>
                                    <Text style={styles.textDescricao}>{item.Description}</Text>

                                </View>
                            </View>
                        )
                    })}
                    <View style={styles.itemsContainer}>
                        <View style={styles.simbolos}>
                            <Image source={require('../../assets/dashed-circle.png')} style={styles.circle} tintColor='#f7c724' />
                        </View>
                        <View style={styles.textos}>
                            <Text style={styles.textName}>fim do treino</Text>
                        </View>
                    </View>

                </ScrollView>
            )
        }
    })
    return (
        <SafeAreaView style={styles.view}>
            <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
            <ScrollView horizontal={true} style={styles.scrollView}>
                {GlobalVariables.weekDays.map((item, index) => {
                    return(
                    <TouchableOpacity style={[styles.viewDay, isSelected(item.value)]} onPress={() => {handleClick(item.value) }} key={index}>
                        <Text style={styles.textDays}>{item.label}</Text>
                    </TouchableOpacity>
                    )

                })}
            </ScrollView>
            {renderizaLista()}

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "black",
        alignItems: 'center'
    },

    logo: {
        width: '35%',
        marginTop: -50,
        resizeMode: 'contain',
        marginBottom: -30
    },
    scrollView: {
        width: '100%',
        maxHeight: 40,
        marginBottom: 20,
        minHeight: 40,

    },

    iconeErro: {
        width: '40%',
        resizeMode: 'contain',
        height: '40%',
        alignSelf: 'center',
        marginTop: -40
    },
    viewError: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50
    },
    textErro: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'

    },
    textErrod: {
        color: '#555454',
        fontSize: 14,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        textTransform: 'uppercase',
        textAlign: 'justify'
    },
    viewDay: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center'
    },
    backColorYellow: {
        backgroundColor: '#f7c724'
    },
    backColorGray: {
        backgroundColor: '#555454'
    },
    textDays: {
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 13
    },
    circle: {
        width: 40,
        resizeMode: 'contain',
        height: 40
    },
    itemsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        minWidth: '80%',
        maxWidth: '80%',
        justifyContent: 'flex-start',
    },
    textName: {
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    textDescricao: {
        color: '#555454',
        marginLeft: 10,
    },
    simbolos: {
        alignItems: 'center',
    },
    textos: {
        alignSelf: 'flex-start',
        paddingTop: 5

    }

})
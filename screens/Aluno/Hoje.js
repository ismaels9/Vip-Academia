import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Alert, } from 'react-native';
import ProgressBar from "../../Components/ProgressBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';

export default function Hoje({route}) {
    const [progress, setProgress] = useState('0');
    const [workoutLog, setWorkoutLog] = useState(route.params.workoutLog);
    const [workoutDay, setWorkoutDay] = useState('Without Workout Today')
    let weekday = ['Sunday',
   'Monday',
   'Tuesday',
  'Wednesday',
  'Thursday',
    'Friday',
   'Saturday'][new Date().getDay()];   

    const [checkItem, setCheckItem] = useState([]);
    let totalChecked = 0;

    const handleOnChange = (position) => {
        const updatedcheckItem = checkItem.map((item, index) =>
            index === position ? !item : item
        );
        setCheckItem(updatedcheckItem);
        const totalItensChecked = updatedcheckItem.reduce(
            (count, currentState) => {
                if (currentState === true) {
                    return count + 1;
                }
                return count;
            },
            0
        );
        totalChecked = totalItensChecked;
        setProgress(Math.round(((totalChecked / checkItem.length) * 100)).toString())
    };

    useEffect(() => {
        if(workoutLog != 'Without WLogorkout ' && workoutLog[weekday] != undefined){
            let arrayAux = [];
            setWorkoutDay(workoutLog[weekday])
            arrayAux = Array(Object.keys(workoutLog[weekday]).length).fill(false);
            setCheckItem(arrayAux)
        }
        else if(workoutLog[weekday] === undefined){
            setWorkoutDay('Without Workout Today')
        }
    }, [])

    const exercisesRender = (() => {
        if (workoutDay != 'Without Workout Today') {
            return (
                <ScrollView style={styles.scrollView}>
                    {workoutDay.map((item, index) => {
                        return (
                            <View style={styles.itemContainer} key ={index}>
                                <TouchableOpacity style={styles.touchable} onPress={(() => { })}>
                                    <View style={styles.viewIcon}>
                                        <Ionicons name="barbell-outline" size={35} color="white" />
                                    </View>
                                    <View style={styles.viewTextos}>
                                        <Text style={styles.textName}>{item.Exercise}</Text>
                                        <Text style={styles.textDescricao}>{item.Description} </Text>
                                    </View>
                                    </TouchableOpacity>
                                    <View style={styles.viewCheckbox}>
                                        <CheckBox
                                            disabled={false}
                                            value={checkItem[index]}
                                            onValueChange={() => handleOnChange(index)}
                                            style={styles.checkbox}
                                            color={checkItem[index] ? '#f7c724' : undefined}
                                        />
                                    </View>
                                
                            </View>
                        )
                    })}

                </ScrollView>
            )
        }else if(workoutLog == "Without Workout Log"){
            return(
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

        } else if(workoutDay === 'Without Workout Today') {
            return (
                <View style={styles.viewError}>
                    <Image source={require('../../assets/descansar-icon.png')} tintColor = '#F7C724'style={styles.iconeErro} />
                    <Text style={styles.textErro}>
                        Sem Treino hoje
                    </Text>
                    <Text style={styles.textErrod}>
                    ✨ Parece que hoje é seu dia de descanso para repor as energias! ✨
                    </Text>

                </View>
            )

        }
    })
    return (
        <View style={styles.view}>
            <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
            <Text style={styles.tittle}>
                HOJE
            </Text>
            <ProgressBar progress={progress} />
            {exercisesRender()}
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "black",
        alignItems: 'center'
    },
    tittle: {
        color: 'white',
        fontWeight: 'bold'
    },
    logo: {
        width: '35%',
        marginTop: -50,
        resizeMode: 'contain',
        marginBottom: -30
    },
    textName: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    itemContainer: {
        flexDirection: 'row',
        width: '90%',
        margin: 10,
        height: 80,
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        borderBottomWidth: 5,
        borderEndWidth: 1,
        borderStartWidth: 1,
        borderTopWidth: 1,
        borderColor: '#555454',
        alignItems: 'center',
    },
    textDescricao: {
        color: '#555454',
        textTransform: 'lowercase',
        fontSize: 13
    },
    scrollView: {
        width: '100%',
    },
    checkbox: {
        borderColor: '#555454',
        width: 25,
        height: 25,
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    viewCheckbox: {
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width: '7%'
    },
    viewIcon: {
        borderRightWidth: 1,
        borderColor: '#555454',
        height: '100%',
        justifyContent: "center",
        alignItems:'center',
        width: '20%',
    },
    viewTextos: {
        justifyContent: 'center',
        height: '100%',
        width: '73%',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    touchable:{
        flexDirection: 'row',
        height: '100%'
    },
    iconeErro:{
        width: '40%',
        resizeMode: 'contain',
        height: '40%',
        alignSelf: 'center',
        marginTop: -40
    },
    viewError:{
        flex:1,
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
        textAlign:'center'

    },
    textErrod:{
        color: '#555454',
        fontSize: 14,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        textTransform: 'uppercase',
        textAlign:'justify'
    }

})
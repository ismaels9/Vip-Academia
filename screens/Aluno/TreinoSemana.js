import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function Hoje({ route, navigation }) {
    const [ficha, setFicha] = useState(route.params.ficha);
    const [selectedDay, setSelectedDay] = useState({ index: 0, fichaDia: ficha.Segunda })
    const [backColor, setBackColor] = useState([styles.backColorYellow, styles.backColorGray, styles.backColorGray, styles.backColorGray, styles.backColorGray])


    const handleClick = ((item) => {
        let aux = backColor.fill(styles.backColorGray)
        aux[item] = styles.backColorYellow
        setBackColor(aux)
        switch (item) {
            case 0:
                setSelectedDay({ index: 0, fichaDia: ficha.Segunda })
                break;
            case 1:
                setSelectedDay({ index: 1, fichaDia: ficha.Terca })
                break;
            case 2:
                setSelectedDay({ index: 2, fichaDia: ficha.Quarta })
                break;
            case 3:
                setSelectedDay({ index: 3, fichaDia: ficha.Quinta })
                break;
            case 4:
                setSelectedDay({ index: 4, fichaDia: ficha.Sexta })
                break;

        }
    })

    const renderizaLista = (() => {
        if (ficha == 'Sem Ficha') {
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
                    {selectedDay.fichaDia.map((item, index) => {
                        return (
                            <View style={styles.itemsContainer} key={index}>
                            <View style={styles.simbolos}>
                                <Image source={require('../../assets/dashed-circle.png')} style={styles.circle} tintColor='#f7c724' />
                                <Image source={require('../../assets/vertical-line.png')} style={styles.circle} tintColor='#f7c724' />
                            </View>
                            <View style={styles.textos}>
                                <Text style={styles.textName}>{item.Exercicio}</Text>
                                <Text style={styles.textDescricao}>{item.Descricao}</Text>

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
                <TouchableOpacity style={[styles.viewDay, backColor[0]]} onPress={() => { handleClick(0) }}>
                    <Text style={styles.textDays}>Segunda-Feira</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.viewDay, backColor[1]]} onPress={() => { handleClick(1) }}>
                    <Text style={styles.textDays}>Terça-Feira</Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.viewDay, backColor[2]]} onPress={() => { handleClick(2) }}>
                    <Text style={styles.textDays}>Quarta-Feira</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.viewDay, backColor[3]]} onPress={() => { handleClick(3) }}>
                    <Text style={styles.textDays}>Quinta-Feira</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.viewDay, backColor[4]]} onPress={() => { handleClick(4) }}>
                    <Text style={styles.textDays}>Sexta-Feira</Text>
                </TouchableOpacity>
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
        MinWidth: '80%',
        maxHeight: 80,
        maxWidth: '80%',
        justifyContent: 'flex-start'
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
    textos:{
        alignSelf: 'flex-start',
        paddingTop: 5

    }

})
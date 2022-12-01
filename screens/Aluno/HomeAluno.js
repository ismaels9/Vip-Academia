import { Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from '@react-navigation/drawer'
import Hoje from './Hoje'
import TreinoSemana from './TreinoSemana'
import Perfil from './Perfil'
import { firebaseAuth, firestore as bd } from '../../firebase';
import { useState, useEffect } from "react";

const HomeAluno = ({ route, navigation }) => {
    const Drawer = createDrawerNavigator();
    const usuarioLogado = route.params;
    const [ficha, setFicha] = useState([]);
    const HandleSingOut = () => {
        firebaseAuth
            .signOut()
            .then(() => {
                navigation.replace("Login")
                AsyncStorage.removeItem('@loggedUserCache');
            })
            .catch(error => Alert.alert("Erro", error.message))
    }

    useEffect(() => {
        if (usuarioLogado.ID_Treino != "") {
            bd.collection('Fichas').doc(usuarioLogado.ID_Treino)
                .get()
                .then((querySnapshot) => {
                    var ficha_adquirida = {
                        id: querySnapshot.id,
                        Nome: querySnapshot.data().Nome,
                        Segunda: querySnapshot.data().Segunda,
                        Terca: querySnapshot.data().Terca,
                        Quarta: querySnapshot.data().Quarta,
                        Quinta: querySnapshot.data().Quinta,
                        Sexta: querySnapshot.data().Sexta,
                        Modified: querySnapshot.data().Modified
                    }
                    setFicha(ficha_adquirida);

                }).catch(e => {
                    console.log('erro', e.message)
                    setFicha('Sem Ficha')
                })
        } else {
            setFicha('Sem Ficha')
        }
    }, [])
    if (Object.keys(ficha).length != 8 && ficha != 'Sem Ficha') {
        return null
    }

    return (
        <Drawer.Navigator initialRouteName="Hoje"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: 'black',
                    width: 240,
                    paddingVertical: 20,
                    color: 'white',
                },
                drawerActiveBackgroundColor: "#f7c724",
                drawerInactiveTintColor: '#fff',
                drawerActiveTintColor: 'black',

            }}>
            <Drawer.Screen name="HOJE" initialParams={{ ficha: ficha }} options={{ navigationBarColor: "black", navigationBarHidden: true, headerTintColor: '#f7c724', headerStyle: { backgroundColor: 'black', }, headerTitleStyle: { color: 'black' }, headerShadowVisible: false }} component={Hoje} />
            <Drawer.Screen name="TREINOS DA SEMANA" initialParams={{ ficha: ficha }} options={{ navigationBarColor: "black", navigationBarHidden: true, headerTintColor: '#f7c724', headerStyle: { backgroundColor: 'black', }, headerTitleStyle: { color: 'black' }, headerShadowVisible: false }} component={TreinoSemana} />
            <Drawer.Screen name="PERFIL" initialParams={{ usuario: usuarioLogado }} options={{ navigationBarColor: "black", navigationBarHidden: true, headerTintColor: '#f7c724', headerStyle: { backgroundColor: 'black', }, headerTitleStyle: { color: 'black' }, headerShadowVisible: false }} component={Perfil} />
            <Drawer.Screen name="SAIR" component={HandleSingOut} />
        </Drawer.Navigator>
    )

}

export default HomeAluno

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "black",
        paddingVertical: 20
    },
})
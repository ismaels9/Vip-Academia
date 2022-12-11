import { Alert, StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from '@react-navigation/drawer'
import Hoje from './Hoje'
import TreinoSemana from './TreinoSemana'
import Perfil from './Perfil'
import { firebaseAuth, firestore as bd } from '../../firebase';
import { useState, useEffect } from "react";
import {getWorkoutLogs, getUsers} from '../../Components/Functions'
import NetInfo from "@react-native-community/netinfo";
import Loading from "../../Components/Loading";


const HomeAluno = ({ route, navigation }) => {
    const Drawer = createDrawerNavigator();
    const [loggedUser, setLoggedUser] = useState(route.params);
    const [workoutLog, setWorkoutLog] = useState([]);
    const [dataFetched, setDataFetched] = useState(false)
    const HandleSingOut = () => {
        firebaseAuth
            .signOut()
            .then(() => {
                navigation.replace("Login")
                AsyncStorage.removeItem('@loggedUserCache');
                AsyncStorage.removeItem('@workoutLogCache');

            })
            .catch(error => Alert.alert("Erro", error.message))
    }

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                getData()
                updateCache('@loggedUserCache', loggedUser)
                updateCache('@workoutLogCache', workoutLog)
                updateLastLogin()
            } else {
                setWorkoutLog(getCacheData('@workoutLogCache'))
                setDataFetched(true)
            }
        })
    }, [])

    const updateLastLogin =(() => {
        bd.collection('Users').doc(loggedUser.Email).update({ LastLogin: new Date().toLocaleDateString('pt-BR')})

    })

    const updateCache = (async (variable, value)=>{
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(variable, jsonValue)
        } catch (e) {
            Alert.alert("Erro", e.message)
        }

    })
    const getCacheData = async (variable) => {
        try {
            const jsonValue = await AsyncStorage.getItem(variable)
            if(jsonValue != null){
                setLoggedUser(JSON.parse(jsonValue))
            }
        } catch (e) {
            Alert.alert("Erro", e.message)
        }
    }

    const getData = (async ()=>{
        let aux1 = await getUsers(loggedUser.Email)
        setLoggedUser(aux1)
        if (aux1.WorkoutLog == ""){
            setWorkoutLog('Without Workout Log')
            setDataFetched(true)

        } else{
            let aux = await getWorkoutLogs(aux1.WorkoutLog)
            setWorkoutLog(aux)
            setDataFetched(true)
        }
    }) 

    if (!dataFetched) {
        return (
            <View style={styles.loading}>
                <Loading visible={true}/>
                <Text style={{color: 'white'}}>CARREGANDO DADOS</Text>
            </View>
        )
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
            <Drawer.Screen name="HOJE" initialParams={{ workoutLog: workoutLog }} options={{ navigationBarColor: "black", navigationBarHidden: true, headerTintColor: '#f7c724', headerStyle: { backgroundColor: 'black', }, headerTitleStyle: { color: 'black' }, headerShadowVisible: false }} component={Hoje} />
            <Drawer.Screen name="TREINOS DA SEMANA" initialParams={{ workoutLog: workoutLog }} options={{ navigationBarColor: "black", navigationBarHidden: true, headerTintColor: '#f7c724', headerStyle: { backgroundColor: 'black', }, headerTitleStyle: { color: 'black' }, headerShadowVisible: false }} component={TreinoSemana} />
            <Drawer.Screen name="PERFIL" initialParams={{ user: loggedUser }} options={{ navigationBarColor: "black", navigationBarHidden: true, headerTintColor: '#f7c724', headerStyle: { backgroundColor: 'black', }, headerTitleStyle: { color: 'black' }, headerShadowVisible: false }} component={Perfil} />
            <Drawer.Screen name="SAIR" component={HandleSingOut} />
        </Drawer.Navigator>
    )

}

export default HomeAluno

const styles = StyleSheet.create({
    loading:{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
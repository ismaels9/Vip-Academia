import { useNavigation } from "@react-navigation/native";
import {Alert, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createDrawerNavigator} from '@react-navigation/drawer' 
import Hoje from './Hoje'
import TreinoSemana from './TreinoSemana'
import Perfil from './Perfil'
import { firebaseAuth} from '../../firebase';


const HomeAluno = ({route, navigation}) => {
    const Drawer = createDrawerNavigator();
    const HandleSingOut = () => {
        firebaseAuth
            .signOut()
            .then(() => {
                navigation.replace("LogIn")
                AsyncStorage.removeItem('@loggedUserCache');
            })
            .catch(error => Alert.alert("Erro",error.message))
    }
    const usuarioLogado = route.params
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
                <Drawer.Screen name="HOJE" initialParams={{ ficha: usuarioLogado.ID_Treino }} options={{headerShown: true, navigationBarColor:"black", navigationBarHidden: true, headerTintColor: '#f7c724', headerStyle:{backgroundColor: 'black',}, headerTitleStyle:{color:'black'}, headerShadowVisible: false}} component={Hoje}/>
                <Drawer.Screen name="TREINOS DA SEMANA" component={TreinoSemana}/>
                <Drawer.Screen name="PERFIL" component={Perfil}/>
                <Drawer.Screen name="SAIR" component={HandleSingOut}/>
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
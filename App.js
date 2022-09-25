import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import LogInScreen from './screens/LogInScreen';
import HomeProfessor from './screens/HomeProfessor';
import HomeAluno from './screens/HomeAluno';
import DefinirTreino from './screens/Professor/DefinirTreino';
import EditarTreino from './screens/Professor/EditarTreino';
import Mensagens from './screens/Professor/Mensagens';
import VerAlunos from './screens/Professor/VerAlunos';
import CriarTreino from './screens/Professor/CriarTreino';
import TelaEditarTreino from './screens/Professor/TelaEditarTreino';
import TelaVerTreino from './screens/Professor/TelaVerTreino';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = {'LogIn'}>
          <Stack.Screen options={{headerShown: false,navigationBarColor:"black", navigationBarHidden: true}}name="LogIn" component={LogInScreen}/>
          <Stack.Screen options={{headerShown: false, navigationBarColor:"black", navigationBarHidden: true,}} name="HomeProfessor" component={HomeProfessor}/>
          <Stack.Screen options={{headerShown: false, navigationBarColor:"black", navigationBarHidden: true,}} name="HomeAluno" component={HomeAluno}/>
          <Stack.Screen options={{headerShown: true,navigationBarColor:"black", navigationBarHidden: true, headerStyle:styles.header, headerTintColor: "white"}}name="DefinirTreino" component={DefinirTreino}/>
          <Stack.Screen options={{headerShown: true, navigationBarColor:"black", navigationBarHidden: true, headerStyle:styles.header, headerTintColor: "white"}} name="EditarTreino" component={EditarTreino}/>
          <Stack.Screen options={{headerShown: false, navigationBarColor:"black", navigationBarHidden: true, headerStyle:styles.header, headerTintColor: "white"}} name="Mensagens" component={Mensagens}/>
          <Stack.Screen options={{headerShown: true,navigationBarColor:"black", navigationBarHidden: true, headerStyle:styles.header, headerTintColor: "white"}}name="VerAlunos" component={VerAlunos}/>
          <Stack.Screen options={{headerShown: true, navigationBarColor:"black",navigationBarHidden: true, headerStyle:styles.header, headerTintColor: "white"}} name="CriarTreino" component={CriarTreino}/>
          <Stack.Screen options={{headerShown: true, navigationBarColor:"black",navigationBarHidden: true, headerStyle:styles.header, headerTintColor: "white"}} name="TelaEditarTreino" component={TelaEditarTreino}/>
          <Stack.Screen options={{headerShown: true, navigationBarColor:"black",navigationBarHidden: true, headerStyle:styles.header, headerTintColor: "white"}} name="TelaVerTreino" component={TelaVerTreino}/>



        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    backgroundColor: 'black'
}
});

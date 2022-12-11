import { TouchableOpacity, View, Text } from "react-native";
import { firestore as bd } from "./firebase";
import GlobalVariables from './Components/GlobalVariables'

export default function ChangeTheLife() {

    const ChangeAll = (() => {

        bd.collection('Users').where("Role", '==', "Aluno").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                bd.collection('Users').doc(doc.data().Email).update({ Role: 'Normal' });
            })
        }).catch((error) => {
            alert(error.message)

        })

        alert('DONE')
    })

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 300 }}>
            <TouchableOpacity onPress={ChangeAll}>
                <Text> CHANGE ALL</Text>
            </TouchableOpacity>

        </View>
    );
}


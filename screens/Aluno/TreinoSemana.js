import React from "react";
import {View, StyleSheet,Text} from 'react-native';

export default function TreinoSemana() {
    return(
        <View style={styles.view}>
        <Text>
            Mensagens
        </Text>
    </View>
    )
}
const styles = StyleSheet.create({
    view:{
        backgroundColor: "green"
    }
})
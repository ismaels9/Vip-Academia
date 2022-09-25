import React from "react";
import {View, Modal, ActivityIndicator, StyleSheet,Text} from 'react-native';

export default function Mensagens({visible}) {
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
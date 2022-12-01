import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function ShowExercisePopup(props) {
    return(
        <View style={styles.fullBar}>
            <View style={[styles.progressBar , {width:`${props.progress}%`}]}>
                <Text style={styles.text}>{`${props.progress}%`}</Text>
            </View>
        </View>
    )
}const styles = StyleSheet.create({
    fullBar:{height: 15,
        width: '90%',
        backgroundColor: 'gray',
        borderRadius: 40,
        margin: 10,
        justifyContent: "center",
    },
    progressBar:{
        height: '100%',
        backgroundColor: '#F7C724',
        borderRadius: 40, 
        paddingRight: 10, 
        justifyContent: "flex-start",
        alignItems: 'flex-end'
    },
    text:{
        color: 'black', 
        fontWeight: '700',
        fontSize: 12,
    }
})
import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import Ionicons from '@expo/vector-icons/Ionicons';
import { firestore as bd } from "../firebase"

export default function DialogWithList(props) {
    const [dropdownList, setDropdownList] = useState(props.workoutLogs);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)

    useEffect (() => {
        console.log(dropdownList)
    }, [])

    const SaveButtonPressed = ((value) => {
        bd.collection('Users').doc(props.user.Email).update({ WorkoutLog: value });
        Alert.alert("Treino Alterado", "Ficha atribuida à aluno com sucesso")
        props.Close()
    })
    return (
        <Modal visible={props.visible} transparent >
            <View style={styles.container}>
                <View style={styles.subView}>
                    <TouchableOpacity onPress={() => { setOpen(false); props.Close() }} style={styles.fecharButton}>
                        <Ionicons name="close-outline" size={22} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.textNome}>
                        Aluno: {props.user.Name}
                    </Text>

                    <DropDownPicker style={styles.dropdown}
                        placeholder="Selecione uma ficha"
                        open={open}
                        value={value}
                        items={dropdownList}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setDropdownList}
                        theme="DARK"
                        onSelectItem={() => { setIsSaveButtonDisabled(false) }}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={() => { SaveButtonPressed(value) }} disabled={isSaveButtonDisabled}>
                        <Text style={styles.saveButtonText}>
                            SALVAR
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255 ,255, 0.8)',

    },
    dropdown: {
        justifyContent: 'center'

    },
    fecharButton: {
        alignItems: 'flex-end'
    },
    subView: {
        width: '80%',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#000000',
        borderWidth: 2,

    },
    textNome: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 20,
        alignSelf: 'center',
        color: 'white'

    },
    textSelecione: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        alignSelf: 'center',
        color: 'white'

    },
    saveButton: {
        backgroundColor: '#F7C724',
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingBottom: 15,
        paddingRight: 20,
        paddingTop: 15,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
    },
    saveButtonText: {
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 15
    }
});
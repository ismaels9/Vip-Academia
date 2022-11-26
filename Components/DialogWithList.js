import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet,Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import Ionicons from '@expo/vector-icons/Ionicons';
import {firestore as bd} from "../firebase"



export default function DialogWithList(props) {
        const [listaDropdown, setListaDropdown] = useState([]);
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [isSalvarDisabled, setIsSalvarDisabled] = useState(true)

    
        useState(() => {
             let objetos = []
            props.Lista.forEach((item) => {
                let objeto = { label: item.Nome, value: item.Nome }
                objetos.push(objeto)
            })
            setListaDropdown(objetos)

        },[]);

        const salvarButton = ((value) => {
            bd.collection('Usuários').doc(props.Aluno.Email).update({ID_Treino: value});
            Alert.alert("Treino Alterado","Ficha atribuida à aluno com sucesso")
            props.Fechar()
        })
        return (
            <Modal visible={props.visible} transparent >
                <View style={styles.container}>
                    <View style={styles.subView}>
                        <TouchableOpacity onPress={() => {setOpen(false); props.Fechar()}} style={styles.fecharButton}>
                            <Ionicons name="close-outline" size={22} color="white" />
                        </TouchableOpacity>
                        <Text style = {styles.textNome}>
                            Aluno: {props.Aluno.Nome}
                        </Text>
    
                        <DropDownPicker style={styles.dropdown}
                        placeholder= "Selecione uma ficha"
                            open={open}
                            value={value}
                            items={listaDropdown}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setListaDropdown}
                            theme = "DARK"
                            onSelectItem={() => {setIsSalvarDisabled(false)}}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress= {() => {salvarButton(value)}} disabled={isSalvarDisabled}>
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
            //backgroundColor: 'white',
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
        textNome:{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 20,
            alignSelf: 'center',
            color: 'white'
    
        },
        textSelecione:{
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 8,
            alignSelf: 'center',
            color: 'white'
    
        },
        saveButton:{
            backgroundColor: '#F7C724',
            alignSelf: 'center',
            alignItems: 'center',
            paddingLeft: 20,
            paddingBottom: 15,
            paddingRight: 20,
            paddingTop: 15,
            borderRadius: 10,
            marginTop: 20,
            justifyContent:'center',
        },
        saveButtonText:{
            alignSelf: 'center',
            fontWeight: '700',
            fontSize: 15 
        }
    });
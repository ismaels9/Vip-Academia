import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { firestore as bd } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalVariables from "../../Components/GlobalVariables";
import { getExercisesList } from "../../Components/Functions";

export default function EditarFichaJaCriada({ route, navigation }) {
    const workoutLogToEdit = route.params
    const [workoutLogName, setWorkoutLogName] = useState(workoutLogToEdit.Name)
    const [exercises, setExercises] = useState([]);
    const [description, setDescription] = useState('');
    const [openDaysDropdown, setOpenDaysDropdown] = useState(false); 
    const [valueDaysDropdown, setValueDaysDropdown] = useState('');
    const [openMuscleGroupDropdown, setopenMuscleGroupDropdown] = useState(false);
    const [valueMuscleGroupDropdown, setValueMuscleGroupDropdown] = useState('');
    const [openExercisesDrown, setOpenExercisesDropdown] = useState(false);
    const [valueExercisesDropdown, setValueExercisesDropdown] = useState('');
    const [exercisesList, setExercisesList] = useState([]);
    const [addedExercises, setAddedExercises] = useState();
    const [isNameEditable, setIsNameEditable] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [valueDaysModalDropdown, setValueDaysModalDropdown] = useState('');
    const [openDaysModalDropdown, setOpenDaysModalDropdown] = useState(false);
    const [modalExercisesList, setModalExercisesList] = useState([]);


    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: false,
            headerTitle: "Editar ficha de treino",
            headerTitleAlign: 'center',
            textAlign: 'center',
        })
            , []
    })

    useEffect(() => {
        getAllExercises()
        let aux = [];
        GlobalVariables.weekDays.forEach((item) => {
            aux.push({day: item.value, exercises: workoutLogToEdit[item.value]})
        })
        setAddedExercises(aux)
    }, [])

    const getAllExercises = ( async () => {
        let listAux = []
        for (const item in GlobalVariables.muscleGroups){
            let aux = {name: GlobalVariables.muscleGroups[item].value, exercises: await getExercisesList(GlobalVariables.muscleGroups[item].value)}
            listAux.push(aux)
        }
        console.log(listAux)
        setExercisesList(listAux)
    })

    const selectedMuscleGroup = (selectedMuscleGroup) => {
        exercisesList.map((item) => {
            if (item.name == selectedMuscleGroup) {
                setExercises(item.exercises)
            }
        })
    }

    const exercisesDropdown = (() => {
        if (valueMuscleGroupDropdown != "" && exercises.length > 0) {
            return (
                <View>
                    <Text style={styles.label}>Selecione o Exercício</Text>
                    <DropDownPicker style={styles.dropdown}
                        placeholder=""
                        open={openExercisesDrown}
                        value={valueExercisesDropdown}
                        items={exercises}
                        setOpen={setOpenExercisesDropdown}
                        setValue={setValueExercisesDropdown}
                        setItems={setExercises}
                        theme="LIGHT"
                        onOpen={() => { setopenMuscleGroupDropdown(false); setOpenDaysDropdown
                    (false) }}
                        scrollViewProps={{ nestedScrollEnabled: true }}
                    />
                </View>
            )
        }
    })

    const resetList = (() => {
        addedExercises.map((item) => {
            if (valueDaysModalDropdown == item.day) {
                setModalExercisesList(item.exercises)
            }
        })
    })

    const modalEditExercises = (() => {
        return (
            <Modal transparent visible={isModalVisible}>
                <View style={styles.modal}>
                    <View style={styles.viewModal}>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Ionicons name="close-outline" size={27} color='white' style={{ alignSelf: 'flex-end' }} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', color: 'white', marginBottom: 20 }}>Remover exercícios adicionados</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, alignSelf: 'center', color: 'white', marginBottom: 5 }}>Selecione o dia</Text>
                        <DropDownPicker style={styles.dropdown}
                            placeholder=""
                            open={openDaysModalDropdown}
                            value={valueDaysModalDropdown}
                            items={GlobalVariables.weekDays}
                            setOpen={setOpenDaysModalDropdown}
                            setValue={setValueDaysModalDropdown}
                            theme='LIGHT'
                            onChangeValue={resetList}
                        />
                        <ScrollView style={styles.scroll}>
                            {modalExercisesList.map((item, index) => {
                                return (
                                    <View key={index} style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        marginLeft: 10,
                                        maxWidth: '82%'
                                    }}>
                                        <View>
                                            <Text style={styles.textName}>{item.Exercise}</Text>
                                            <Text style={styles.textdescription}>{item.Description}</Text>
                                        </View>
                                        <TouchableOpacity style={{ marginLeft: 15, alignItems: "flex-end" }} onPress={() => { removeItem(item) }}>
                                            <Ionicons name="close-circle-outline" size={27} color='red' style={{ marginLeft: 0, }} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    })

    const removeItem = ((item) => {
        Alert.alert(
            "Remoção de item",
            "Tem certeza que deseja remover o exercicio?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim", onPress: () => {
                        let aux = modalExercisesList;
                        aux.splice(aux.indexOf(item), 1);
                        let aux1 = addedExercises;
                        aux1.map((item) => {
                            if (valueDaysModalDropdown == item.day) {
                                item.exercises = aux
                            }
                        })
                        setAddedExercises(aux1);
                        setModalExercisesList([]);
                        resetList();
                    }
                }
            ]
        );
    })

    const addExercisePressed = (() => {
        if (workoutLogName == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Nome da Ficha")
        } else if (valueDaysDropdown == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Dia")
        } else if (valueMuscleGroupDropdown == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Grupo Muscular")
        } else if (valueExercisesDropdown == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Exercício")
        } else if (description == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Descrição do Treino")
        } else {
            let auxExercises = addedExercises;
            let exercise = {
                Exercise: valueExercisesDropdown,
                Description: description,
                MuscleGroup: valueMuscleGroupDropdown
            }
            auxExercises.map((item) => {
                if(item.day == valueDaysDropdown){
                    item.exercises.push(exercise)
                }
            })
            setAddedExercises(auxExercises);
            setIsNameEditable(false);
            setValueExercisesDropdown('');
            Alert.alert("Ficha Alterada", "Exercício adicionado");
        }
    })

    const editExercisesPressed = (() => {
        if (addedExercises.every(day => day.exercises.length<=0)) {
            Alert.alert("Nenhum exercício adicionado!", "Adicione um exercício primeiro")
        } else {
            setIsModalVisible(true);
        }
    })

    const savePressed = (() => {
        if (addedExercises.every(day => day.exercises.length<=0)) {
            Alert.alert("Erro", "Adicione ao menos um exercício antes de salvar a ficha")
        } else {
            let objetoAux = {
                Name: workoutLogName,
                Monday: addedExercises[0].exercises,
                Tuesday: addedExercises[1].exercises,
                Wednesday: addedExercises[2].exercises,
                Thursday: addedExercises[3].exercises,
                Friday: addedExercises[4].exercises,
                Modified: new Date().toLocaleString()
            }
            const res = bd.collection('WorkoutLogs').doc(workoutLogName).set(objetoAux);
            Alert.alert("Sucesso", "Ficha salva com sucesso");
            navigation.goBack();
        }
    })
    return (
        <KeyboardAvoidingView style={styles.view}>
            <Text style={styles.label}>Nome da Ficha</Text>
            <TextInput
                placeholder=""
                onChangeText={text => setWorkoutLogName(text)}
                style={styles.input}
                editable={isNameEditable}
                defaultValue={workoutLogName}
            />
            <View style={{ width: "80%" }}>
                <Text style={styles.label}>Selecione o dia</Text>
                <DropDownPicker style={styles.dropdown}
                    placeholder=""
                    open={openDaysDropdown}
                    value={valueDaysDropdown}
                    items={GlobalVariables.weekDays}
                    setOpen={setOpenDaysDropdown
            }
                    setValue={setValueDaysDropdown}
                    onClose={() => setOpenDaysDropdown
                (false)}
                    theme='LIGHT'
                    onOpen={() => { setopenMuscleGroupDropdown(false); setOpenExercisesDropdown(false) }}
                    scrollViewProps={{ nestedScrollEnabled: true }}
                />
                <Text style={styles.label}>Selecione um Grupo Muscular</Text>
                <DropDownPicker style={styles.dropdown}
                    placeholder=""
                    open={openMuscleGroupDropdown}
                    value={valueMuscleGroupDropdown}
                    items={GlobalVariables.muscleGroups}
                    setOpen={setopenMuscleGroupDropdown}
                    setValue={setValueMuscleGroupDropdown}
                    theme='LIGHT'
                    onOpen={() => { setOpenDaysDropdown
                (false); setOpenExercisesDropdown(false) }}
                    onChangeValue={(valueMuscleGroupDropdown) => { selectedMuscleGroup(valueMuscleGroupDropdown) }}
                    scrollViewProps={{ nestedScrollEnabled: true }}
                />

                {exercisesDropdown()}

            </View>
            <Text style={styles.label}>Descrição do Treino (Séries, Repetições)</Text>
            <TextInput
                onChangeText={text => setDescription(text)}
                style={[styles.input, styles.biggerInput]}
            />
            <View style={styles.viewBotoes}>
                <TouchableOpacity style={styles.button} onPress={addExercisePressed}>
                    <Text style={styles.buttonText}>
                        ADICIONAR EXERCÍCIO
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={editExercisesPressed}>
                    <Text style={styles.buttonText}>
                        EDITAR EXERCÍCIOS ADICIONADOS
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewBotoes}>
                <TouchableOpacity style={styles.button} onPress={() => { savePressed() }}>
                    <Text style={styles.buttonText}>
                        SALVAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => { navigation.goBack() }}>
                    <Text style={styles.buttonText}>
                        CANCELAR
                    </Text>
                </TouchableOpacity>
            </View>
            {modalEditExercises()}
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "black",
        backgroundColor: "black",
        alignItems: 'center',
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        marginBottom: 15,
        textAlign: 'center',
        width: "80%",
        alignSelf: 'center'

    },
    biggerInput: {
        height: 60

    },
    button: {
        backgroundColor: "#F7C724",
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: "50%",

    },
    dropdown: {
        marginBottom: 15,
        alignSelf: 'center',
        zIndex: 9,

    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 13,
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: 3
    },
    viewBotoes: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center'

    },
    textdescription: {
        fontSize: 14,
        marginLeft: 10,
        color: 'grey',

    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: '600',
        color: 'white'

    },
    viewModal: {
        flex: 0.8,
        backgroundColor: "black",
        backgroundColor: "black",
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 15

    },
    textExercicio: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 10
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255 ,255, 0.8)',
    }
})
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { firestore as bd } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CriarTreino({ navigation }) {
    const [nomeFicha, setNomeFicha] = useState('')
    const [dias, setDias] = useState([{ label: "Segunda", value: "Segunda" }, { label: "Terça", value: "Terca" }, { label: "Quarta", value: "Quarta" }, { label: "Quinta", value: "Quinta" }, { label: "Sexta", value: "Sexta" }])
    const [grupoMuscular, setGrupoMuscular] = useState([{ label: "Bíceps", value: "Biceps" }, { label: "Costas", value: "Costas" }, { label: "Ombro", value: "Ombro" }, { label: "Peito", value: "Peito" }, { label: "Perna", value: "Perna" }, { label: "Tríceps", value: "Triceps" }])
    const [exercicios, setExercicios] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [openDias, setOpenDias] = useState(false);
    const [valueDias, setValueDias] = useState('');
    const [openGM, setOpenGM] = useState(false);
    const [valueGM, setValueGM] = useState('');
    const [openEx, setOpenEx] = useState(false);
    const [valueEx, setValueEx] = useState('');
    const [exerciciosLista, setExerciciosLista] = useState([]);
    const [exerciciosAdicionados, setExerciciosAdicionados] = useState([[], [], [], [], []]);
    const [editarNome, setEditarNome] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const [valueModal, setValueModal] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [listaModal, setListaModal] = useState([])
    var listaCompleta = [];

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Criar ficha de treino",
            headerTitleAlign: 'center',
            textAlign: 'center',
        })
            , []
    })
    useEffect(() => {
        getListaExerciciosBiceps()
        getListaExerciciosCostas()
        getListaExerciciosOmbro()
        getListaExerciciosPeito()
        getListaExerciciosPerna()
        getListaExerciciosTriceps()
        setExerciciosLista(listaCompleta)

    }, [])

    const getListaExerciciosBiceps = async () => {
        await bd.collection('Biceps')
            .get()
            .then((querySnapshot) => {
                let Biceps = [];
                querySnapshot.forEach((doc) => {
                    let ficha_adquirida_biceps = {
                        label: doc.id,
                        value: doc.data().Nome,
                    }
                    Biceps.push(ficha_adquirida_biceps);
                })
                listaCompleta.push(Biceps)

            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })
    }
    const getListaExerciciosCostas = async () => {
        await bd.collection('Costas')
            .get()
            .then((querySnapshot) => {
                let Costas = [];
                querySnapshot.forEach((doc) => {
                    let ficha_adquirida_costas = {
                        label: doc.id,
                        value: doc.data().Nome,
                    }
                    Costas.push(ficha_adquirida_costas);

                })
                listaCompleta.push(Costas)


            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })
    }
    const getListaExerciciosPerna = async () => {

        await bd.collection('Perna')
            .get()
            .then((querySnapshot) => {
                let Perna = [];
                querySnapshot.forEach((doc) => {
                    let ficha_adquirida_perna = {
                        label: doc.id,
                        value: doc.data().Nome,
                    }
                    Perna.push(ficha_adquirida_perna);


                })
                listaCompleta.push(Perna)

            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })
    }
    const getListaExerciciosPeito = async () => {

        await bd.collection('Peito')
            .get()
            .then((querySnapshot) => {
                let Peito = [];
                querySnapshot.forEach((doc) => {
                    let ficha_adquirida_peito = {
                        label: doc.id,
                        value: doc.data().Nome,
                    }
                    Peito.push(ficha_adquirida_peito);
                })
                listaCompleta.push(Peito)
            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })
    }
    const getListaExerciciosOmbro = async () => {
        await bd.collection('Ombro')
            .get()
            .then((querySnapshot) => {
                let Ombro = [];
                querySnapshot.forEach((doc) => {
                    let ficha_adquirida_ombro = {
                        label: doc.id,
                        value: doc.data().Nome,
                    }
                    Ombro.push(ficha_adquirida_ombro);
                })
                listaCompleta.push(Ombro)


            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })
    }

    const getListaExerciciosTriceps = async () => {
        await bd.collection('Triceps')
            .get()
            .then((querySnapshot) => {
                let Triceps = [];
                querySnapshot.forEach((doc) => {
                    let ficha_adquirida_triceps = {
                        label: doc.id,
                        value: doc.data().Nome,
                    }
                    Triceps.push(ficha_adquirida_triceps);
                })
                listaCompleta.push(Triceps)
            }).catch(error => {
                Alert.alert("Erro", error.code, error.message)
            })

    }

    const grupoMuscularSelecionado = (grupoMuscularSelecionado) => {
        if (exerciciosLista.length == 6) {
            switch (grupoMuscularSelecionado) {
                case "Biceps":
                    setExercicios(exerciciosLista[0])
                    break;
                case "Costas":
                    setExercicios(exerciciosLista[1])
                    break;
                case "Ombro":
                    setExercicios(exerciciosLista[2])
                    break;
                case "Peito":
                    setExercicios(exerciciosLista[3])
                    break;
                case "Perna":
                    setExercicios(exerciciosLista[4])
                    break;
                case "Triceps":
                    setExercicios(exerciciosLista[5])
                    break;
                default:
                    setExercicios([])
            }
        }
    }

    const exerciciosDropdown = (() => {
        if (valueGM != "" && exercicios.length > 0) {
            return (
                <View>
                    <Text style={styles.label}>Selecione o Exercício</Text>
                    <DropDownPicker style={styles.dropdown}
                        placeholder=""
                        open={openEx}
                        value={valueEx}
                        items={exercicios}
                        setOpen={setOpenEx}
                        setValue={setValueEx}
                        setItems={setExercicios}
                        theme="LIGHT"
                        onOpen={() => { setOpenGM(false); setOpenDias(false) }}
                        scrollViewProps={{ nestedScrollEnabled: true }}
                    />
                </View>
            )
        }

    })
    const redefiniLista = (() => {
        switch (valueModal) {
            case 'Segunda':
                setListaModal(exerciciosAdicionados[0])
                break;
            case 'Terca':
                setListaModal(exerciciosAdicionados[1])
                break;
            case 'Quarta':
                setListaModal(exerciciosAdicionados[2])
                break;
            case 'Quinta':
                setListaModal(exerciciosAdicionados[3])
                break;
            case 'Sexta':
                setListaModal(exerciciosAdicionados[4])
                break;
        }
    })

    const modalEdtExercicio = (() => {
        redefiniLista

        return (
            <Modal transparent visible={visibleModal}>
                <View style={styles.modal}>
                    <View style={styles.viewModal}>

                        <TouchableOpacity onPress={() => setVisibleModal(false)}>
                            <Ionicons name="close-outline" size={27} color='white' style={{ alignSelf: 'flex-end' }} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', color: 'white', marginBottom: 20 }}>Remover exercícios adicionados</Text>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, alignSelf: 'center', color: 'white', marginBottom: 5 }}>Selecione o dia</Text>
                        <DropDownPicker style={styles.dropdown}
                            placeholder=""
                            open={openModal}
                            value={valueModal}
                            items={dias}
                            setOpen={setOpenModal}
                            setValue={setValueModal}
                            theme='LIGHT'
                            onChangeValue={redefiniLista}
                        />
                        <ScrollView style={styles.scroll}>
                            <Text style={styles.textExercicio}>
                                ExercÍcios cadastrados para {valueModal.toLowerCase()}
                            </Text>
                            {listaModal.map((item, index) => {
                                return (

                                    <View key={index} style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        marginLeft: 10,
                                    }}>

                                        <View>
                                            <Text style={styles.textName}>{item.Exercicio}</Text>
                                            <Text style={styles.textDescricao}>{item.Descricao}</Text>
                                        </View>
                                        <TouchableOpacity style={{ marginLeft: 15, alignItems: "flex-end" }} onPress={() => { removerItem(item) }}>
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

    const removerItem = ((item) => {
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
                        let aux = listaModal;
                        aux.splice(aux.indexOf(item), 1);
                        let aux1 = exerciciosAdicionados;
                        switch (valueModal) {
                            case 'Segunda':
                                aux1[0] = aux;
                                setExerciciosAdicionados(aux1);
                                setListaModal([]);
                                redefiniLista();
                                break;
                            case 'Terca':
                                aux1[1] = aux;
                                setExerciciosAdicionados(aux1);
                                setListaModal([]);
                                redefiniLista();
                                break;
                            case 'Quarta':
                                aux1[2] = aux;
                                setExerciciosAdicionados(aux1);
                                setListaModal([]);
                                redefiniLista();
                                break;
                            case 'Quinta':
                                aux1[3] = aux;
                                setExerciciosAdicionados(aux1);
                                setListaModal([]);
                                redefiniLista()
                                break;
                            case 'Sexta':
                                aux1[4] = aux;
                                setExerciciosAdicionados(aux1);
                                setListaModal([]);
                                redefiniLista();
                                break;
                        }
                    }
                }
            ]
        );

    })

    const AdicionarExercicioPressed = (() => {
        if (nomeFicha == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Nome da Ficha")
        } else if (valueDias == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Dia")
        } else if (valueGM == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Grupo Muscular")
        } else if (valueEx == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Exercício")
        } else if (descricao == '') {
            Alert.alert("Preencha todos os campos", "Preencha o campo Descrição do Treino")
        } else {
            let exerciciosAux = exerciciosAdicionados;
            let exercicio = {
                Exercicio: valueEx,
                Descricao: descricao,
                GrupoMuscular: valueGM
            }
            switch (valueDias) {
                case 'Segunda':
                    exerciciosAux[0].push(exercicio);
                    break;
                case 'Terca':
                    exerciciosAux[1].push(exercicio);
                    break;
                case 'Quarta':
                    exerciciosAux[2].push(exercicio);
                    break;
                case 'Quinta':
                    exerciciosAux[3].push(exercicio)
                    break;
                case 'Sexta':
                    exerciciosAux[4].push(exercicio)
                    break;
            }
            setExerciciosAdicionados(exerciciosAux);
            setEditarNome(false);
            setValueEx('');
            Alert.alert("Ficha Alterada", "Exercício adicionado");
        }

    })

    const EditarExercicioPressed = (() => {
        if (exerciciosAdicionados[0].length == 0 && exerciciosAdicionados[1].length == 0 && exerciciosAdicionados[2].length == 0 && exerciciosAdicionados[3].length == 0 && exerciciosAdicionados[4].length == 0) {
            Alert.alert("Nenhum exercício adicionado!", "Adicione um exercício primeiro")
        } else {
            setVisibleModal(true);


        }

    })

    const salvarPressed = (() => {
        if (exerciciosAdicionados[0].length == 0 && exerciciosAdicionados[1].length == 0 && exerciciosAdicionados[2].length == 0 && exerciciosAdicionados[3].length == 0 && exerciciosAdicionados[4].length == 0) {
            Alert.alert("Erro", "Adicione ao menos um exercício antes de salvar a ficha")
        } else {
            let objetoAux = {
                Nome: nomeFicha,
                Segunda: exerciciosAdicionados[0],
                Terca: exerciciosAdicionados[1],
                Quarta: exerciciosAdicionados[2],
                Quinta: exerciciosAdicionados[3],
                Sexta: exerciciosAdicionados[4],
                Modified: new Date().toLocaleString()
            }
            const res = bd.collection('Fichas').doc(nomeFicha).set(objetoAux);
            Alert.alert("Sucesso", "Ficha salva com sucesso");
            navigation.goBack();
        }
    })
    return (
        <KeyboardAvoidingView style={styles.view}>
            <Text style={styles.label}>Nome da Ficha</Text>
            <TextInput
                placeholder=""
                onChangeText={text => setNomeFicha(text)}
                style={styles.input}
                editable={editarNome}
            />
            <View style={{ width: "80%" }}>
                <Text style={styles.label}>Selecione o dia</Text>
                <DropDownPicker style={styles.dropdown}
                    placeholder=""
                    open={openDias}
                    value={valueDias}
                    items={dias}
                    setOpen={setOpenDias}
                    setValue={setValueDias}
                    setItems={setDias}
                    onClose={() => setOpenDias(false)}
                    theme='LIGHT'
                    onOpen={() => { setOpenGM(false); setOpenEx(false) }}
                    scrollViewProps={{ nestedScrollEnabled: true }}
                />
                <Text style={styles.label}>Selecione um Grupo Muscular</Text>
                <DropDownPicker style={styles.dropdown}
                    placeholder=""
                    open={openGM}
                    value={valueGM}
                    items={grupoMuscular}
                    setOpen={setOpenGM}
                    setValue={setValueGM}
                    setItems={setGrupoMuscular}
                    theme='LIGHT'
                    onOpen={() => { setOpenDias(false); setOpenEx(false) }}
                    onChangeValue={(text) => { grupoMuscularSelecionado(text) }}
                    scrollViewProps={{ nestedScrollEnabled: true }}
                />

                {exerciciosDropdown()}

            </View>
            <Text style={styles.label}>Descrição do Treino (Séries, Repetições)</Text>
            <TextInput
                onChangeText={text => setDescricao(text)}
                style={[styles.input, styles.biggerInput]}
            />
            <View style={styles.viewBotoes}>
                <TouchableOpacity style={styles.button} onPress={AdicionarExercicioPressed}>
                    <Text style={styles.buttonText}>
                        ADICIONAR EXERCÍCIO
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={EditarExercicioPressed}>
                    <Text style={styles.buttonText}>
                        EDITAR EXERCÍCIOS ADICIONADOS
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewBotoes}>
                <TouchableOpacity style={styles.button} onPress={() => { salvarPressed() }}>
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
            {modalEdtExercicio()}
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
    textDescricao: {
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
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';

export default function addReceber({ navigation }) {

    const api = 'http://192.168.1.10:8090/apitarefas/';

    const [strData, setStrData] = useState('DATA TAREFA');


    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [valor, setValor] = useState('');


    const [dados, setDados] = useState([]);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                setDados(JSON.parse(value));
            }
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const [date, setDate] = useState(new Date());
    const [dataInserir, setDataInserir] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        //setDate(currentDate);

        //alert(currentDate.getMinutes());

        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();

        var formatterDay;
        if (day < 10) {
            formatterDay = '0' + day;
        } else {
            formatterDay = day;
        }

        var formatterMonth;
        if (month < 10) {
            formatterMonth = '0' + month;
        } else {
            formatterMonth = month;
        }

        //DATA NO MODELO BRASILEIRO
        var dateFormattedBra = formatterDay + '/' + formatterMonth + '/' + year;

        //DATA NO MODELO AMERICANO
        var dateFormatted = year + '-' + formatterMonth + '-' + formatterDay;

        setDataInserir(dateFormatted);

        //alert(dateFormatted);
        setStrData(dateFormattedBra);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');

    };

    async function add() {
        const cpf = dados.cpf;
        const obj = { titulo, descricao, dataInserir, horaInserir, cpf };


        const res = await Axios.post(api + 'addReceber.php', obj);

        if (res.data.success === true) {
            //mensagemSalvar();
            navigation.navigate('Receber')

        }

        if (res.data.success === 'Preencha o Valor!') {
            alert('Preencha o Valor!');
        }

    }

    return (
        <View style={styles.modal}>

            <Animatable.View
                animation="bounceInUp"
                useNativeDriver  >

                <TextInput
                    type="text"
                    style={styles.input}
                    placeholder="Insira um Título"
                    value={titulo}
                    onChangeText={(titulo) => setTitulo(titulo)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Insira a Descrição"
                    value={descricao}
                    onChangeText={(descricao) => setDescricao(descricao)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Insira o Valor"
                    value={valor}
                    onChangeText={(valor) => setValor(valor)}
                />

                <View style={styles.datas}>

                    <TouchableOpacity
                        style={styles.areaData}
                        onPress={showDatepicker}
                    >

                        <FontAwesome name="calendar" color="#000" size={17} />
                        <Text> {strData}</Text>

                    </TouchableOpacity>

                </View>

                {show && (
                    <DateTimePicker
                        locale="pt-br"

                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <TouchableOpacity
                    style={styles.botaoModal}
                    onPress={add}
                >
                    <Text style={styles.textoBotaoModal}>Salvar</Text>
                </TouchableOpacity>


            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#e9ecea',
        marginTop: 15,
    },

    textoModal: {

        color: '#FFF',

        marginLeft: 15,
        fontSize: 16,

    },

    input: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 8,
        padding: 8,
        color: '#000',
        fontSize: 13
    },
    botaoModal: {
        backgroundColor: '#00335c',
        borderRadius: 5,
        margin: 5,
        padding: 12,
        color: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',

    },
    textoBotaoModal: {
        fontSize: 16,
        color: '#FFF',

    },
    areaData: {
        flexDirection: 'row',
        padding: 15,
        marginRight: 10,
    },

    areaHora: {
        flexDirection: 'row',
        padding: 15,
        marginRight: 10,
    },
    datas: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

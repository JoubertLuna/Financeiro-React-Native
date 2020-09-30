import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, SafeAreaView, Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ListItem from '../../componentes/List';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Home({ navigation }) {

    const [date, setDate] = useState(new Date());
    const [dataBuscar, setDataBuscar] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        //setDate(currentDate);

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

        setDataBuscar(dateFormatted);
        //setStrDate(dateFormattedBra);
        //buscar(dateFormatted);
        //alert(dateFormatted);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const usuarios = [
        { id: '1', nome: 'admin' },
        { id: '2', nome: 'joubert Luna' },
    ]

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

    return (
        <SafeAreaView>
            <View
                style={styles.header}>
                <Image
                    source={require('../../../assets/img/doka02.png')}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                />
                <Text style={{ color: '#FFF', fontSize: 17 }}>LISTA DE TAREFAS</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('addTarefas')}
                >

                    <Ionicons name="ios-add" size={35} color="#FFF"></Ionicons>

                </TouchableOpacity>
            </View>

            <View>

                <TouchableOpacity
                    style={styles.areaBusca}
                    onPress={showDatepicker}
                >

                    <FontAwesome name="calendar" color="#000" size={20} />
                    <Text>SELECIONE UMA DATA</Text>
                    <Icon name="search" color="#000" size={25} />


                </TouchableOpacity>

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
            </View>

            <FlatList
                data={usuarios}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ListItem
                        data={item}
                        deletar={() => mensagemDelete(item.id)}
                        editar={() => concluir(item.id)}
                    />
                )}
                ItemSeparatorComponent={() => <Separator />}

            >

            </FlatList>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3CB371',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 35
    },

    areaBusca: {
        backgroundColor: '#e1e1e1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,

    },

});

const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>



import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from './src/pages/painel-tarefas/Home';
import Tarefas from './src/pages/painel-tarefas/Tarefas';
import Clientes from './src/pages/painel-tarefas/Clientes';
import Login from './src/pages/Login';
import addTarefas from './src/pages/painel-tarefas/add-tarefas';
import addClientes from './src/pages/painel-tarefas/add-clientes';

import Movimentacoes from './src/pages/painel-tesouraria/Home';
import Pagar from './src/pages/painel-tesouraria/Pagar';
import Receber from './src/pages/painel-tesouraria/Receber';
import addReceber from './src/pages/painel-tesouraria/addReceber';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsTarefas() {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Tarefas') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } else if (route.name === 'Clientes') {
            iconName = focused ? 'ios-people' : 'ios-people';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3f64c7',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tarefas" component={Tarefas} />
      <Tab.Screen name="Clientes" component={Clientes} />

    </Tab.Navigator>

  );
}

function TabsFinanceiro() {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Movimentacoes') {
            iconName = focused
              ? 'dollar-sign'
              : 'dollar-sign';
          } else if (route.name === 'Receber') {
            iconName = focused ? 'money-bill-alt' : 'money-bill-alt';
          } else if (route.name === 'Pagar') {
            iconName = focused ? 'cash-register' : 'cash-register';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3f64c7',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Movimentacoes" component={Movimentacoes} />
      <Tab.Screen name="Receber" component={Receber} />
      <Tab.Screen name="Pagar" component={Pagar} />

    </Tab.Navigator>

  );
}

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={TabsTarefas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tarefas"
          component={Tarefas}
          options={{ headerShown: false }}

        />

        <Stack.Screen
          name="Clientes"
          component={Clientes}
          options={{ headerShown: false }}

        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="addTarefas"
          component={addTarefas}
          options={{
            title: 'Inserir Tarefa',
            headerStyle: {
              backgroundColor: '#00335c'
            },
            headerTintColor: '#FFF'
          }}

        />

        <Stack.Screen
          name="addClientes"
          component={addClientes}
          options={{
            title: 'Inserir Clientes',
            headerStyle: {
              backgroundColor: '#00335c'
            },
            headerTintColor: '#FFF'
          }}

        />

        <Stack.Screen
          name="Movimentacoes"
          component={TabsFinanceiro}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Pagar"
          component={Pagar}
          options={{ headerShown: false }}

        />

        <Stack.Screen
          name="Receber"
          component={Receber}
          options={{ headerShown: false }}

        />

        <Stack.Screen
          name="addReceber"
          component={addReceber}
          options={{
            title: 'Contas a Receber',
            headerStyle: {
              backgroundColor: '#00335c'
            },
            headerTintColor: '#FFF'
          }}

        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
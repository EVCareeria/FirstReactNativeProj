import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import JsonListPressable from './JsonListPressable';
import YleTekstiTV from './YleTekstiTV'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import HelloWorld from'./HelloWorld';
import {Octicons} from '@expo/vector-icons';
import YLETekstiTV100 from './YLETekstiTV100';
import HelloWorldInput from './HelloWorldInput';
import NWTuotteetListPop from './NWTuotteetListPop';
import NWTuotteetListModular from './NWTuotteetListModular';



export default function App() {
  const Tab = createMaterialTopTabNavigator();
  const iconSize = 22;
  return (
    <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor:'#ffffff',
        inactiveTintColor:'#000000',
        showLabel: true,
        labelStyle: {fontSize: 10},
        showIcon: true,
        indicatorStyle: {height: 100},
        style: {backgroundColor: '#31b3c0', paddingTop: 40,},
      }}
    >
      <Tab.Screen name="HelloWorld" component={HelloWorld} options={{ tabBarIcon: () => <Octicons name="home" size={iconSize} color="#333" /> }} />
      <Tab.Screen name="HelloWorldInput" component={HelloWorldInput} options={{ tabBarIcon: () => <Octicons name="mail" size={iconSize} color="#333" /> }} />
      <Tab.Screen name="JsonListPressable" component={JsonListPressable} options={{ tabBarIcon: () => <Octicons name="desktop-download" size={iconSize} color="#333" /> }} />
      <Tab.Screen name="YLETekstiTV100" component={YLETekstiTV100} options={{ tabBarIcon: () => <Octicons name="broadcast" size={iconSize} color="#333" /> }} />
      <Tab.Screen name="YleTekstiTV" component={YleTekstiTV} options={{ tabBarIcon: () => <Octicons name="versions" size={iconSize} color="#333" /> }} />
      <Tab.Screen name="NWTuotteetListModular" component={NWTuotteetListModular} options={{ tabBarIcon: () => <Octicons name="database" size={iconSize} color="#333" /> }} />
      <Tab.Screen name="NWTuotteetListPop" component={NWTuotteetListPop} options={{ tabBarIcon: () => <Octicons name="list-unordered" size={iconSize} color="#333" /> }} />
      </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  container2: {
    flex: 2,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  container3: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import JsonListPressable from './JsonListPressable';
import YleTekstiTV from './YleTekstiTV'

export default function App() {
  return (
    <View style={styles.container1}>
      <Text>Tämä on luomani eka reactNative sofsssta!</Text>
      <View style={styles.container2}>
        <JsonListPressable />
      </View>
      <View style={styles.container3}>
        <YleTekstiTV />
        <Text>Mitä tähän sit keksisi enää!?</Text>
      </View>
      <StatusBar style="auto" />
      </View>
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HelloWorld() {
    const [counter, setCounter] = React.useState(0);
    setTimeout(() => setCounter(counter + 1), 10000)
  return (
      <View style={styles.container}>
        <View style={styles.generalStyle}>
            <View>
                <Text style={{width: 250, height:250, backgroundColor: 'steelblue'}}>Terve maailma aka. Hello world!</Text>
                <Text style={styles.bigCentered}>{counter}</Text>
            </View>
         </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      position: 'relative'
    },
    bigCentered: {
        color: 'blue',
        fontSize: 72,
        justifyContent: 'center',
        position: 'relative'
    },
    generalStyle: {
        flex: 2,
        width: '100%',
        backgroundColor: 'lightgreen',
        alignContent: 'center',
        position: 'relative',
    }
  });
  
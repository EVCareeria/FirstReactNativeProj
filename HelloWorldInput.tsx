import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function HelloWorldInput() {
    const [counter, setCounter] = React.useState(0);
    const [name, setName] = useState('');
    const [outputName, changeOutputName] = useState('');
    const [nimiLista, setNimiLista] = useState<string[]>([]);
    const showName = (name: string) => {
        changeOutputName(name);
        setNimiLista(array => [...array, '\n' + name]);
    }


    setTimeout(() => setCounter(counter + 1), 10000)
  return (
        <View style={styles.container}>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'stretch'}}>
                <View style={{alignItems:'center', flex:6}}>
                <Image
                    style={styles.logoCareeria}
                    source={{
                        uri: 'https://Careeria.fi/static/careeria/careeria_logo_alpha_230x67_once.gif',
                    }}
                    />
                
                    <Text style={{fontSize: 15}}> Hello, I just made this react program :)</Text>
                                <Text style={styles.bigCentered}>Terve maailma aka. Hello world!</Text>
                                <Text style={styles.generalStyle}>{counter}</Text>
                                
                            
                            <View style={styles.LowerStyle}>
                            <Text style={{textAlign: 'center', fontSize: 25, color: 'darkred'}}>Anna nimi:</Text>
                                    <TextInput 
                                    style={{fontSize:26, borderColor: 'white', borderWidth: 1, margin: 2, textAlign: 'center' }}
                                            onChangeText={text => setName(text)}
                                    value={name}
                                    />
                                    <Button
                                        title="Lisää henkilö!"
                                        onPress={()  => showName(name)}
                                    />
                                    <TouchableOpacity style={{ marginTop: 1, backgroundColor: 'gray' }} onPress={() => setNimiLista([])}>
                                    <Text style={{height: 40, width: '100%', textAlign: 'center', fontSize: 20, textAlignVertical: 'center', padding: 5,
                                    borderWidth: 1, borderColor: 'gray'}} >Tyhjennä</Text>
                                    </TouchableOpacity>
                                <ScrollView style={styles.scrollView} fadingEdgeLength={180}>
                                    <Text style={{fontSize: 25, padding: 10, textAlign: 'center'}}> {nimiLista}</Text>
                                </ScrollView>
                            </View>
                            
                </View>
            </View>
        </View>
    
  );
}


const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      position: 'relative',
      padding: 1
    },
    bigCentered: {
        flex: 1,
        color: 'blue',
        fontSize: 15,
        alignItems:'flex-start',
        position: 'relative'
    },
    generalStyle: {
        width:'100%',
        height: '10%',
        backgroundColor: 'lightgreen',
        alignContent:'center',
        alignItems: 'center',
        position: 'relative',
        fontSize: 30,
        textAlign: 'center',
    }, 
    LowerStyle: {
        flex: 5,
        backgroundColor: 'gray',
        alignContent: 'center',
        width: '90%',
        textAlign: 'center',
    },
    logoCareeria: {
        width:200,
        height:70,
        margin: 20,
        padding: 1,
    },
    scrollView: {
       width:'100%',
       marginVertical: 10,
    }
  });
  
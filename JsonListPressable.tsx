import React from 'react';
import { Text, View, FlatList, Button, StyleSheet, Pressable, ImageBackground} from 'react-native';
import styles from './styles';

export default function JsonListPressable () {

    const [jsonData, setJsonData] = React.useState();
    const getData = () => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
            .then((responseData) => {
                setJsonData(responseData);
            })  
    }

    return (
      <View>
        <Button
            onPress={() => getData()}
            title="Lataa Todo-Lista"
            color="#556B2F"
        />
        <FlatList
            data={jsonData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <Pressable
                    onPress={() => {
                    }}
                    style={({pressed}) => [
                        {backgroundColor: pressed ? 'yellow' : 'transparent'}
                    ]}>
                    {({pressed}) => (
                    <View>
                        <View style={styles.separatorLine}/>
                        <Text style={styles.text}>{pressed ? 'Klikkasit tätä riviä' : 'Press me!'}</Text>
                        <Text style={styles.text}>{pressed ? 'Primarykey = ' +item.id.toString() : ''}</Text>
                        <Text style={styles.itemItalic}>Userid: {item.userId.toString()}</Text>
                        <Text style={styles.itemBolded}>Title: {item.title}</Text>
                        <Text>Status:  {item.completed.toString()}</Text> 
                        {item.completed === true ? <Text style={styles.itemUnderlined}>Loppuunkäsitelty!</Text> : <Text style={styles.itemUnderlined}>Ei vielä käsitelty!</Text>}
                    </View>
                    )}
                </Pressable>
            )}
        />
      </View>
    );

}
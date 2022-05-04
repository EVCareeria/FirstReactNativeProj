import React from 'react';
import { Text, View, FlatList, Button, StyleSheet} from 'react-native';
import styles from './styles';

export default function JsonList () {

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
                <View>
                <View style={styles.separatorLine}/>
                <Text style={styles.itemItalic}>Userid: {item.userId.toString()}</Text>
                <Text style={styles.itemBolded}>Title: {item.title}</Text>
                <Text>Status:  {item.completed.toString()}</Text> 
                </View>
            )}
        />
      </View>
    );

}
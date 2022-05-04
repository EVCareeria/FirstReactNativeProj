import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Image, Platform, ScrollView, TextInput, Button } from 'react-native';
import {API_id, API_key} from './apiKeyJson';
import { AntDesign } from '@expo/vector-icons'; 

export default function YleTekstiTV() {
    const [inputPage, changeInputPage] = useState(100);
    var Url = 'https://external.api.yle.fi/v1/teletext/images/' + inputPage + '/1.png?app_id=' + API_id + '&app_key=' + API_key + "&date=" + Date.now.toString();
    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewPage}>
                <Text style={styles.title}>Yle tekstiTV pääsivu</Text>
                <View style={styles.separatorLine}/>
                <View style={styles.searchSection}>
                <AntDesign name="banckward" size={35} color="black" onPress={() => changeInputPage(inputPage-1)} />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', fontSize: 22, borderWidth: 1, margin: 2, width: 240, textAlign: 'center'}}
                        onChangeText={(text) => changeInputPage(Number(text))}
                        value={inputPage.toString()}
                    />
                    <AntDesign name="forward" size={35} color="black" onPress={() => changeInputPage(inputPage+1)} />
                </View>
                <View style={styles.imageSection}>
                    <Image 
                        style={styles.yleTextTV} 
                        resizeMode={'contain'}
                        source={{
                            uri: Url, 
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
 
    mainContainer: {
        flex: 1, 
    },
 
    scrollViewPage: {
        alignItems: 'center',
        paddingTop: 0,
    },
    searchSection: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    imageSection: {
        flex: 2,
    },
 
    yleTextTV: {
        width: '100%',
        height: Platform.OS === 'android' ? '100%' : 240,
        aspectRatio: 1.5,
        marginTop: 1,
    },
 
    title: {
        fontSize: 26,
        fontWeight: '300',
        letterSpacing: 7,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#D1D1D1',
        textAlign: 'center',
    },
 
    separatorLine: {
        marginVertical: 5,
        height: 1,
        width: '100%',
        backgroundColor: '#eee',
    },
 
 });
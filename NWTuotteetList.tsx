import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Image, Pressable, Modal, TouchableHighlight} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import styles from './styles/styles';

interface INWProductsResponse {
    productId: number;
    productName: string;
    supplierId: number;
    categoryId: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    imageLink: string;
    category: string;
    supplier: string;
    checked: any;
}

export default function NWTuotteetList() {
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    const [inventoryItemsCount, setInventoryItemsCount] = useState(0);
    const [ProductId, setProductId] = useState(0);
    const [productDetailsModal, setProductDetailsModal] = useState(false);

    useEffect(() => {
        GetProduct();
    }, []);

    function GetProduct() {
        let uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/';
        fetch(uri)
        .then(response => response.json())
        .then((json: INWProductsResponse ) => {
            setInventoryItems(json);
            const fetchItemCount = Object.keys(json).length;
            setInventoryItemsCount(fetchItemCount);
        })
    }

    function idGenerator() {
        var rnds = function () {
            return (((1 + Math.random()) * 0x10) | 0).toString(16).substring(1);
            
        };
        return (rnds() + rnds() + "-" + rnds() + "-" + rnds() + "-" + rnds() + "-" + rnds() + rnds() + rnds());
    }

    return (
        <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
            <View style={styles.topSection}>
                <View style={[styles.centerSection, { width: 50, height: 50}]}>
                    <FontAwesome5 name="boxes" sixe={35} color="#000" />
                </View>
                <View style={[styles.centerSection, {height: 50}]}>
                    <Text style={{ fontSize: 18, color: '#000'}}>Tuotteet</Text>
                    <Text style={{ fontSize:12, color: '#000'}}>{'Tuotteita yhteensä: ' + inventoryItemsCount}</Text>
                </View>
            </View>
              <ScrollView>
                  {inventoryItems.map((item: INWProductsResponse) => (

                      <Pressable key={idGenerator()} onPress={() => { }}
                      style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(49, 179, 192, 0.5)' : 'white'}]}
                      onLongPress={() => {
                          setProductDetailsModal(true);
                      }}
                      >
                        <View key={item.productId.toString()} style={styles.productContainer}>
                            <Image key={idGenerator()} source={item.imageLink ? { uri: item.imageLink} : {uri: 'https://www.tibs.org.tw/images/default.jpg' }}
                                style={[styles.centerSection, {height: 60, width: 60, backgroundColor: '#eeeeee', margin: 6}]} />
                            <View key={idGenerator()} style={{flexGrow: 1, flexShrink:1, alignSelf: 'center'}}>
                                <Text key={idGenerator()} style={{fontSize: 20,}}>{item.productName}</Text>
                                <Text key={idGenerator()} style={{ color: '#8f8f8f'}}>{item.category ? 'Variation ' + item.category : ''}</Text>
                                <Text key={idGenerator()} style={{ color: '#333333', marginBottom: 10}}>{'\u00E1 ' + (item.unitPrice == null ? 'unitprice is missing! ' : item.unitPrice.toFixed(2)) + '\u20AC'}</Text>
                            </View>
                        </View>
                      </Pressable>
                  ))}
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={productDetailsModal}
                    onRequestClose={() => {
                    }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Lisätiedot:</Text>
                                <TouchableHighlight 
                                    style={{ ...styles.openButton, backgroundColor: '#2196f3'}}
                                    onPress={() => {
                                        setProductDetailsModal(!productDetailsModal);
                                    }}
                                >
                                <Text style={styles.textStyle}>Sulje!</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        
                    </Modal> 
              </ScrollView>

        </View>
    );
}
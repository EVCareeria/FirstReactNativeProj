import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Pressable, Platform, TextInput, Switch} from 'react-native';
import {Octicons} from '@expo/vector-icons'; 
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

const DeleteProduct = (props: { passProductId: any, closeModal: any, refreshAfterDelete: any}) => {
    let ProductId = props.passProductId;
    const [ProductName, setProductName] = useState('...');
    const [SupplierId, setSupplierId] = useState('0');
    const [CategoryId, setCategoryId] = useState('0');
    const [QuantityPerUnit, setQuantityPerUnit] = useState('0');
    const [UnitPrice, setUnitPrice] = useState('0');
    const [UnitsInStock, setUnitsInStock] = useState('0');
    const [UnitsOnOrder, setUnitsOnOrder] = useState('0');
    const [ReorderLevel, setReorderLevel] = useState('0');
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('...');
    let validaatio = false;

    useEffect(() => {
        GetProductData();
    }, [props.passProductId]);

    function GetProductData() {
        let uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/' + ProductId;
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse ) => {
                setProductName(json.productName);
                setSupplierId(json.supplierId.toString());
                setCategoryId(json.categoryId.toString());
                setQuantityPerUnit(json.quantityPerUnit);
                setUnitPrice(json.unitPrice.toString());
                setUnitsInStock(json.unitsInStock.toString());
                setUnitsOnOrder(json.unitsOnOrder.toString());
                setReorderLevel(json.reorderLevel.toString());
                setDiscontinued(json.discontinued);
                setImageLink(json.imageLink);
        })
    }


    async function deleteProductOnPress() {
                await DeleteFromDB();
                props.refreshAfterDelete(true);
                closeModal();
            
    }

    function DeleteFromDB() {

        const apiUrl = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/' + ProductId;
        fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: null
        })
            .then((response) => response.json())
            .then((json) => {
                const success = json;
                if (success) {
                    alert('Tuote ' + ProductId + ' poistettu')
                }
                else {
                    console.log('Error deleting item')
                }
            });
    }

    function closeModal() {
        props.closeModal(true);
    }
    return (
       <View style={{backgroundColor: 'white', flex: 4}}>
           <ScrollView>
               <View key={ProductId}>
                   <View style={styles.topSection}>
                   <Pressable onPress={() => deleteProductOnPress()}>
                       <View><Octicons name="trashcan" size={24} color="red" /></View>
                   </Pressable>
                   <Pressable onPress={() => closeModal()}>
                       <View><Octicons name="x" size={24} color="black" /></View>
                   </Pressable>
                   </View>
                   <Text style={styles.inputHeaderTitle}>Tuotteen poistaminen:</Text>
                   <Text style={styles.inputTitle}>ID:</Text>
                   <TextInput style={styles.inputTitle}
                   underlineColorAndroid="transparent"
                   defaultValue={ProductId.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   editable={false}
                   />
                    <Text style={styles.inputTitle}>Nimi:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setProductName(val)}
                   value={ProductName.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   editable={false}
                   />
                   { ProductName ? null : ( <Text style={{color: "red"}}>Anna tuotteen nimi</Text>)}
                    <Text style={styles.inputTitle}>Hinta:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setUnitPrice(val)}
                   value={UnitPrice.toString() == null ? '0' : UnitPrice.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   editable={false}
                   />
                    <Text style={styles.inputTitle}>Varastossa:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setUnitsInStock((val))}
                   value={UnitsInStock.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   editable={false}
                   />
                    <Text style={styles.inputTitle}>Hälytysraja:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setReorderLevel(val)}
                   value={ReorderLevel.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   editable={false}
                   />
                    <Text style={styles.inputTitle}>Tilauksessa:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setUnitsOnOrder(val)}
                   value={UnitsInStock.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   editable={false}
                   />
                    <Text style={styles.inputTitle}>Kategoria:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setCategoryId(val)}
                   value={CategoryId.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   editable={false}
                   />
                    <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setQuantityPerUnit(val)}
                   value={QuantityPerUnit.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   editable={false}
                   />
                    <Text style={styles.inputTitle}>Toimittaja:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setSupplierId(val)}
                   value={SupplierId.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   editable={false}
                   />
                    <Text style={styles.inputTitle}>TuoteKuva:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setImageLink(val)}
                   value={(ImageLink == null ? '' : ImageLink.toString())}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   selectTextOnFocus={true}
                   editable={false}
                   />
               </View>
           </ScrollView>
       </View>
    );
}

export default DeleteProduct;
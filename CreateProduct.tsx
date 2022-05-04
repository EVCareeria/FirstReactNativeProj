import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Pressable, Platform, TextInput, Switch} from 'react-native';
import {Octicons} from '@expo/vector-icons'; 
import styles from './styles/styles';
import {Picker} from '@react-native-picker/picker';

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
interface INWCategoryResponse {
    categoryId: number;
    categoryName: string;
    description: string;
    picture: string;
}

interface INWSupplierResponse {
    supplierId: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    homePage: string;
}

const CreateProduct = (props: { closeModal: any, refreshAfterCreate: any, passCategoryInfo: any, passSupplier: any }) => {
    let categoryCreate = props.passCategoryInfo;
    let supplierInfo = props.passSupplier;
    const [ProductName, setProductName] = useState('...');
    const [SupplierId, setSupplierId] = useState<any>('0');
    const [CategoryId, setCategoryId] = useState<any>('0');
    const [QuantityPerUnit, setQuantityPerUnit] = useState('0');
    const [UnitPrice, setUnitPrice] = useState('0');
    const [UnitsInStock, setUnitsInStock] = useState('0');
    const [UnitsOnOrder, setUnitsOnOrder] = useState('0');
    const [ReorderLevel, setReorderLevel] = useState('0');
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('...');
    let validaatio = false;
    const categoriesList = categoryCreate.map((cat: INWCategoryResponse, index: any) =>{
        return (
            <Picker.Item label={cat.categoryId + " " + cat.categoryName} value={cat.categoryId} key={index} />
        )
    });
    const suppliersList = supplierInfo.map((sup: INWSupplierResponse, index: any) =>{
        return (
            <Picker.Item label={sup.supplierId + " " + sup.companyName} value={sup.supplierId} key={index} />
        )
    });


    function priceValidation(price: string, field: string) {
        if ((price == '') || (price === null) || (price.indexOf(',') > 0)) {
            validaatio = false;
            return false;
        } else {
            validaatio = true;
            return true;
        }
    }

    async function CreateProductOnPress(ProductName: string) {
        if (Platform.OS === 'web') {
            if (validaatio === false) {
                alert('Tuote ' + ProductName + ' Ei voida lisätä');
            } else {
                await PostProduct();
                console.log('Tuote ' + ProductName + ' lisätty');
                closeModalAndRefresh();
            }
        }
        else {
            if (validaatio === false) {
                alert('Tuotetta ' + ProductName + ' Ei voida lisätä');
            } else {
                await PostProduct();
                console.log('Tuote ' + ProductName + ' lisätty');
                closeModalAndRefresh();
            }
        }
    }

    function PostProduct() {
        const product = 
        {
            ProductName: ProductName,
            SupplierID: Number(SupplierId),
            CategoryID: Number(CategoryId),
            QuantityPerUnit: QuantityPerUnit,
            UnitPrice: parseFloat(Number(UnitPrice).toFixed(2)),
            UnitsInStock: Number(UnitsInStock),
            UnitsOnOrder: Number(UnitsOnOrder),
            ReorderLevel: Number(ReorderLevel),
            Discontinued: Boolean(Discontinued),
            ImageLink: ImageLink,
        };

        const CreatedJsonProduct = JSON.stringify(product);

        const apiUrl = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/';
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: CreatedJsonProduct
        })
            .then((response) => response.json())
            .then((json) => {
                const success = json;
                if (success) {
                    console.log(success);
                }
                else {
                    console.log('Error creating ' + ProductName )
                }
            });
    }
    function closeModal() {
        props.closeModal(true);
    }
    function closeModalAndRefresh() {
        props.refreshAfterCreate(true);
        props.closeModal(true);
    }
    return (
       <View style={{backgroundColor: 'white', flex: 4}}>
           <ScrollView>
               <View>
                   <View style={styles.topSection}>
                   <Pressable onPress={() => CreateProductOnPress(ProductName)}>
                       <View><Octicons name="check" size={24} color="green" /></View>
                   </Pressable>
                   <Pressable onPress={() => closeModal()}>
                       <View><Octicons name="x" size={24} color="black" /></View>
                   </Pressable>
                   </View>
                   <Text style={styles.inputHeaderTitle}>Tuotteen lisäys:</Text>

                    <Text style={styles.inputTitle}>Nimi:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setProductName(val)}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   />
                   { ProductName ? null : ( <Text style={{color: "red"}}>Anna tuotteen nimi</Text>)}
                    <Text style={styles.inputTitle}>Hinta:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setUnitPrice(val)}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   />
                   { priceValidation(UnitPrice, 'UnitPrice') == true ? null : ( <Text style={{color: "red"}}>Anna tuotteen hinta</Text>)}
                    <Text style={styles.inputTitle}>Varastossa:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setUnitsInStock((val))}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   />
                    <Text style={styles.inputTitle}>Hälytysraja:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setReorderLevel(val)}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   />
                    <Text style={styles.inputTitle}>Tilauksessa:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setUnitsOnOrder(val)}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   />
                    <Text style={styles.inputTitle}>Kategoria:</Text>
                      <Picker
                            prompt='Valitse tuoteryhmä'
                            selectedValue={CategoryId}
                            style={{width: 250, height: 50}}
                            onValueChange={(value) => setCategoryId(value)} >
                            {categoriesList}
                          </Picker>
                    <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setQuantityPerUnit(val)}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
                   />
                    <Text style={styles.inputTitle}>Toimittaja:</Text>
                    <Picker
                            prompt='Valitse toimittaja'
                            selectedValue={SupplierId}
                            style={{width: 250, height: 50}}
                            onValueChange={(value) => setSupplierId(value)} >
                            {suppliersList}
                    </Picker>
                    <Text style={styles.inputTitle}>Tuote poistunut:</Text>
                   <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                       <Text style={{marginRight: 4}}>Ei</Text>
                       <Switch
                       value={Discontinued}
                       onValueChange={val => setDiscontinued(val)}
                       />
                       <Text style={{marginLeft: 4}}>Kyllä</Text>
                   </View>
                    <Text style={styles.inputTitle}>TuoteKuva:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setImageLink(val)}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   selectTextOnFocus={true}
                   />
                   <Pressable style={styles.submitButton}
                       onPress={() => CreateProductOnPress(ProductName)}>
                           <Text style={styles.submitButtonText}>{'Lisää tuote'}</Text>
                   </Pressable>
               </View>
           </ScrollView>
       </View>
    );
}

export default CreateProduct;
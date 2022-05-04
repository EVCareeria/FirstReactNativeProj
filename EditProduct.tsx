import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Pressable, Platform, TextInput, Switch} from 'react-native';
import {Octicons} from '@expo/vector-icons'; 
import styles from './styles/styles';
import {Picker} from '@react-native-picker/picker';
import { Value } from 'react-native-reanimated';

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

const EditProduct = (props: { passProductId: any, closeModal: any, refreshAfterEdit: any, passCategoryInfo: any, passSupplier: any}) => {
    let ProductId = props.passProductId;
    let categoryEdit = props.passCategoryInfo;
    let supplierInfo = props.passSupplier;
    const [product, setProduct] = useState<Partial<INWProductsResponse>>({});
    const [ProductName, setProductName] = useState('...');
    const [SupplierId, setSupplierId] = useState<any>('0');
    const [CategoryId, setCategoryId] = useState<any>('0');
    const [CategoryName, setCategoryName] = useState<any>('');
    const [companyName, setCompanyName] = useState<any>('');
    const [QuantityPerUnit, setQuantityPerUnit] = useState('0');
    const [UnitPrice, setUnitPrice] = useState('0');
    const [UnitsInStock, setUnitsInStock] = useState('0');
    const [UnitsOnOrder, setUnitsOnOrder] = useState('0');
    const [ReorderLevel, setReorderLevel] = useState('0');
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('...');
    let validaatio = false;
    let catApu = '';
    let supApu = '';
    const categoriesList = categoryEdit.map((cat: INWCategoryResponse, index: any) =>{ 
        if (CategoryId === cat.categoryId.toString()) {
            catApu = cat.categoryName;
            return (
            <Picker.Item label={cat.categoryId + " " + cat.categoryName} value={cat.categoryId} key={index} />
            )
        } else {
            return (
                <Picker.Item label={cat.categoryId + " " + cat.categoryName} value={cat.categoryId} key={index} />
            )
        }
    });
    const suppliersList = supplierInfo.map((sup: INWSupplierResponse, index: any) =>{ 
        if (SupplierId === sup.supplierId.toString()) {
            supApu = sup.companyName;
            return (
                <Picker.Item label={sup.supplierId + " " + sup.companyName} value={sup.supplierId} key={index} />
            )
        } else {
            return (
                <Picker.Item label={sup.supplierId + " " + sup.companyName} value={sup.supplierId} key={index} />
            )
        }
    });
    function getPickerContent() {
        setCategoryName(catApu);
        setCompanyName(supApu);
    }

    useEffect(() => {
        getPickerContent();
    }, [GetProductData]);
    
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

    function priceValidation(price: string, field: string) {
        if ((price == '') || (price === null) || (price.indexOf(',') > 0)) {
            validaatio = false;
            return false;
        } else {
            validaatio = true;
            return true;
        }
    }

    async function editProductOnPress(ProductName: string) {
        if (Platform.OS === 'web') {
            if (validaatio === false) {
                alert('Tuotetta ' + ProductName + ' Ei voida tallentaa');
            } else {
                await PutToDB();
                console.log('Tuotetta ' + ProductName + ' muokattu');
                props.refreshAfterEdit(true);
                closeModal();
            }
        }
        else {
            if (validaatio === false) {
                alert('Tuotetta ' + ProductName + ' Ei voida tallentaa');
            } else {
                await PutToDB();
                console.log('Tuotetta ' + ProductName + ' muokattu');
                props.refreshAfterEdit(true);
                closeModal();
            }
        }
    }

    function PutToDB() {
        const product = 
        {
            ProductName: ProductName,
            SupplierID: Number(SupplierId),
            CategoryID: Number(CategoryId),
            CategoryName: CategoryName,
            QuantityPerUnit: QuantityPerUnit,
            UnitPrice: parseFloat(Number(UnitPrice).toFixed(2)),
            UnitsInStock: Number(UnitsInStock),
            UnitsOnOrder: Number(UnitsOnOrder),
            ReorderLevel: Number(ReorderLevel),
            Discontinued: Boolean(Discontinued),
            ImageLink: ImageLink,
        };

        const EditedJsonProduct = JSON.stringify(product);

        const apiUrl = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/' + ProductId;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: EditedJsonProduct
        })
            .then((response) => response.json())
            .then((json) => {
                const success = json;
                if (success) {
                    console.log(success);
                }
                else {
                    console.log('Error updating ' + ProductName )
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
                   <Pressable onPress={() => editProductOnPress(ProductName)}>
                       <View><Octicons name="check" size={24} color="green" /></View>
                   </Pressable>
                   <Pressable onPress={() => closeModal()}>
                       <View><Octicons name="x" size={24} color="black" /></View>
                   </Pressable>
                   </View>
                   <Text style={styles.inputHeaderTitle}>Tuotteen muokkaus:</Text>
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
                   />
                   { priceValidation(UnitPrice, 'UnitPrice') == true ? null : ( <Text style={{color: "red"}}>Anna tuotteen hinta</Text>)}
                    <Text style={styles.inputTitle}>Varastossa:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setUnitsInStock(val)}
                   value={UnitsInStock.toString()}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   keyboardType='numeric'
                   selectTextOnFocus={true}
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
                   />
                    <Text style={styles.inputTitle}>Tilauksessa:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setUnitsOnOrder(val)}
                   value={UnitsOnOrder.toString()}
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
                            onValueChange={(val) => setCategoryId(val)} >
                            <Picker.Item label={CategoryId + " " + CategoryName} value={CategoryId} />
                            {categoriesList}
                    </Picker>
                    <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                   <TextInput style={styles.editInput}
                   underlineColorAndroid="transparent"
                   onChangeText={val => setQuantityPerUnit(val)}
                   value={QuantityPerUnit.toString()}
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
                            onValueChange={(val) => setSupplierId(val)} >
                            <Picker.Item label={SupplierId + " " + companyName} value={SupplierId} />
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
                   value={(ImageLink == null ? '' : ImageLink.toString())}
                   placeholderTextColor="#E2C037"
                   autoCapitalize="none"
                   selectTextOnFocus={true}
                   />
               </View>
           </ScrollView>
       </View>
    );
}

export default EditProduct;
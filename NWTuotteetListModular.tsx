import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Image, Pressable, Modal, TouchableHighlight, TouchableOpacity, ActivityIndicator} from 'react-native';
import {FontAwesome5, Octicons} from '@expo/vector-icons';
import styles from './styles/styles';
import ProductDetails from './ProductDetails';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import { Picker } from '@react-native-picker/picker';
import DeleteProduct from './DeleteProduct';

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

export default function NWTuotteetListModular() {
    const [product, setProduct] = useState<Partial<INWProductsResponse>>({});
    const [category, setCategory] = useState<any>([]);
    const [supplier, setSupplier] = useState<any>([]);
    const [selectCategory, setSelectCategory] = useState<any>("All");
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    const [inventoryItemsCount, setInventoryItemsCount] = useState(0); 
    const [productDetailsModal, setProductDetailsModal] = useState(false);
    {/*Tuotelistan päivityksen muuttujat*/ }
    const [refreshProducts, setRefreshProducts] = useState(false);
    const [refreshIndicator, setRefreshIndicator] = useState(false);
    const [productEditModal, setProductEditModal] = useState(false);
    const [productCreateModal, setProductCreateModal] = useState(false);
    const [productDeleteModal, setProductDeleteModal] = useState(false);
    const categoriesList = category.map((cat: INWCategoryResponse, index: any) =>{
        return (
            <Picker.Item label={cat.categoryName} value={cat.categoryId} key={index} />
        )
    });

    useEffect(() => {
        getCategories();
        GetProduct();
        getSupplier();
    }, [refreshProducts]);

    function getCategories() {
        let uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/Categories';
        fetch(uri)
        .then(response => response.json())
        .then((json: INWCategoryResponse) => {
            setCategory(json);

        })
        setRefreshIndicator(false);
    }

    function getSupplier() {
        let uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/Supplier';
        fetch(uri)
        .then(response => response.json())
        .then((json: INWSupplierResponse) => {
            setSupplier(json);

        })
        setRefreshIndicator(false);
    }

    function GetProduct() {
        let uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/';
        fetch(uri)
        .then(response => response.json())
        .then((json: INWProductsResponse[] ) => {
            if (selectCategory === "All") {
                setInventoryItems(json);
                const fetchItemCount = Object.keys(json).length;
                setInventoryItemsCount(fetchItemCount);
            } else {
                const filteredItems = json.filter(s => s.categoryId === parseInt(selectCategory));
                setInventoryItems(filteredItems);
                const fetchItemCount = Object.keys(filteredItems).length;
                setInventoryItemsCount(fetchItemCount);
            }
        })
        setRefreshIndicator(false);
    }
    function closeDetailsModal() {
        setProductDetailsModal(false);
    }
    function refreshJsonData() {
        setRefreshProducts(!refreshProducts);
        setRefreshIndicator(true);
    } 
    function editProductFunc(item: INWProductsResponse) {
        setProduct(item);
        setProductEditModal(true);
    }
    function createProductFunc() {
        setProductCreateModal(true);
    }
    function deleteProductFunc(item: INWProductsResponse) {
        setProduct(item);
        setProductDeleteModal(true);
    }
    function closeCreateModal() {
        setProductCreateModal(false);
    }
    function closeEditModal() {
        setProductEditModal(false);
    }
    function closeDeleteModal() {
        setProductDeleteModal(false);
    }

    function fetchFiltered(value: any) {
        setSelectCategory(value);
        setRefreshProducts(!refreshProducts);
    }
    return (
        <View style={styles.mainWrapper}>
            <View style={styles.topSection}>
                <View>
                    <FontAwesome5 name="boxes" sixe={35} color="#000" />
                </View>
                    <Text style={{ fontSize:18, color: '#000'}}>{'Tuotteita yhteensä: ' + inventoryItemsCount}</Text>
                    <Pressable onPress={() => refreshJsonData()} style={({ pressed }) => [{ backgroundColor: pressed ? 'lightgray' : 'white' }]}>
                <View>
                        <Octicons name="sync" size={20} color="black" />

                </View>
                </Pressable>
                <ActivityIndicator size="small" color="#0000ff" animating={refreshIndicator} />
                <Pressable onPress={() => createProductFunc()}>
                    <View>
                        <Octicons name="plus" size={20} color="green" />
                    </View>
                </Pressable>
                </View>
                <View style={[styles.pickerSection]}>
                          <Picker
                            prompt='Valitse tuoteryhmä'
                            selectedValue={selectCategory}
                            style={{width: 250, height: 50}}
                            onValueChange={(value) => fetchFiltered(value)} >
                              <Picker.Item label="Hae kaikki tuoteryhmät" value="All" />
                              {categoriesList}
                          </Picker>
                </View>
              <ScrollView>
                  {inventoryItems.map((item: INWProductsResponse) => (
                      <Pressable key={item.productId} 
                      onPress={() => { 
                          setProduct(item);
                          setProductDetailsModal(true);
                        }}
                      style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(49, 179, 192, 0.5)' : 'white'}]}
                      >
                        <View key={item.productId.toString()} style={styles.productContainer}>
                            <Image  source={item.imageLink ? { uri: item.imageLink} : {uri: 'https://www.tibs.org.tw/images/default.jpg' }}
                                style={[styles.centerSection, {height: 60, width: 60, backgroundColor: '#eeeeee', margin: 6}]} />
                            <View  style={{flexGrow: 1, flexShrink:1, alignSelf: 'center'}}>
                                <Text  style={{fontSize: 20,}}>{item.productName}</Text>
                                <Text  style={{ color: '#8f8f8f'}}>{item.category ? 'Variation ' + item.category : ''}</Text>
                                <Text  style={{ color: '#333333', marginBottom: 10}}>{'\u00E1 ' + (item.unitPrice == null ? 'unitprice is missing! ' : item.unitPrice.toFixed(2)) + '\u20AC'}</Text>
                            </View>
                            <View>
                            <TouchableOpacity style={[{ width: 32, height: 32}]} onPress={() => deleteProductFunc(item)}>
                                    <Octicons name="trashcan" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{padding: 2, marginRight:10, marginTop: 30}}>
                                <TouchableOpacity style={[{ width: 32, height: 32}]} onPress={() => editProductFunc(item)}>
                                    <Octicons name="pencil" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                      </Pressable>
                  ))}
                  { productDetailsModal ? (
                        <Modal style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={true}>
                        <ProductDetails closeModal={closeDetailsModal} passProductId={product.productId} />
                        </Modal>
                  ) : null }
                    { productEditModal ? (
                        <Modal style={[styles.modalContainer]}
                        animationType="fade"
                        transparent={true}
                        visible={true}>
                        <EditProduct closeModal={closeEditModal} refreshAfterEdit={refreshJsonData} passProductId={product.productId} passCategoryInfo={category} passSupplier={supplier} />
                        </Modal>
                  ) : null}
                    { productCreateModal ? (
                        <Modal style={[styles.modalContainer]}
                        animationType="fade"
                        transparent={true}
                        visible={true}>
                        <CreateProduct closeModal={closeCreateModal} refreshAfterCreate={refreshJsonData} passCategoryInfo={category} passSupplier={supplier}/>
                        </Modal>
                  ) : null}
                        { productDeleteModal ? (
                        <Modal style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={true}>
                        <DeleteProduct closeModal={closeDeleteModal} refreshAfterDelete={refreshJsonData} passProductId={product.productId} />
                        </Modal>
                  ) : null}
              </ScrollView>
        </View>
    );
}
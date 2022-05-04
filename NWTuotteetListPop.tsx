import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Image, Pressable, Modal, TouchableHighlight, ActivityIndicator} from 'react-native';
import {FontAwesome5, Octicons} from '@expo/vector-icons';
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

export default function NWTuotteetListPop() {
    const [product, setProduct] = useState<Partial<INWProductsResponse>>({});
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    const [inventoryItemsCount, setInventoryItemsCount] = useState(0);
    const [ProductId, setProductId] = useState(0);
    const [ProductName, setProductName] = useState('');
    const [SupplierId, setSupplierId] = useState(0);
    const [CategoryId, setCategoryId] = useState(0);
    const [QuantityPerUnit, setQuantityPerUnit] = useState('');
    const [UnitPrice, setUnitPrice] = useState(0);
    const [UnitsInStock, setUnitsInStock] = useState(0);
    const [UnitsOnOrder, setUnitsOnOrder] = useState(0);
    const [ReorderLevel, setReorderLevel] = useState(0);
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('');
    //Modaalin kentät päättyy
    const [productDetailsModal, setProductDetailsModal] = useState(false);
    {/*Tuotelistan päivityksen muuttujat*/ }
    const [refreshProducts, setRefreshProducts] = useState(false);
    const [refreshIndicator, setRefreshIndicator] = useState(false);

    useEffect(() => {
        GetProduct();
    }, [refreshProducts]);

    function GetProduct() {
        let uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/';
        fetch(uri)
        .then(response => response.json())
        .then((json: INWProductsResponse ) => {
            setInventoryItems(json);
            const fetchItemCount = Object.keys(json).length;
            setInventoryItemsCount(fetchItemCount);
        })
        setRefreshIndicator(false);
    }

    function closeModal() {
        setProductDetailsModal(false);
    }

    function refreshJsonData() {
        setRefreshProducts(!refreshProducts);
        setRefreshIndicator(true);
    } 

/*     function idGenerator() {
        var rnds = function () {
            return (((1 + Math.random()) * 0x10) | 0).toString(16).substring(1);
            
        };
        return (rnds() + rnds() + "-" + rnds() + "-" + rnds() + "-" + rnds() + "-" + rnds() + rnds() + rnds());
    } */

   /*  function showDetails(id: number, name: string, suppid: number, catid: number, quantityp: string, price: number, instock: number, onorder: number, reorderlvl: number, disco: boolean, imglnk: string, cat: any, supp: any) {
        //console.log(id + name + suppid + catid + quantityp + price + instock + onorder + reorderlvl + disco + imglnk)
        setProductDetailsModal(true),
        setProductId(id),
        setProductName(name),
        setSupplierId(suppid),
        setCategoryId(catid),
        setQuantityPerUnit(quantityp),
        setUnitPrice(price),
        setUnitsInStock(instock),
        setUnitsOnOrder(onorder),
        setReorderLevel(reorderlvl),
        setDiscontinued(disco)
        if (imglnk !== null) {
            setImageLink(imglnk);
        }
        else {
            setImageLink('');
        }
    } */

    return (
        <View style={styles.mainWrapper}>
            <View style={styles.topSection}>
                <View>
                    <FontAwesome5 name="boxes" sixe={35} color="#000" />
                </View>
                    <Text style={{ fontSize:18, color: '#000'}}>{'Tuotteita yhteensä: ' + inventoryItemsCount}</Text>
                    <Pressable onPress={() => refreshJsonData()} style={({ pressed }) => [{ backgroundColor: pressed ? 'lightgray' : 'white' }]}>
                <View>
                        <Octicons name="sync" size={30} color="black" />

                </View>
                </Pressable>
                <ActivityIndicator size="small" color="#0000ff" animating={refreshIndicator} />
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
                        <Text style={styles.modalTitle}>Tuotteen tiedot</Text>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Product Id: '}</Text>
                                <Text style={styles.modalText}>{product.productId}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Product Name: '}</Text>
                                <Text style={styles.modalText}>{product.productName}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Supplier Id: '}</Text>
                                <Text style={styles.modalText}>{product.supplierId}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Category Id: '}</Text>
                                <Text style={styles.modalText}>{product.categoryId}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Quantity Per Unit: '}</Text>
                                <Text style={styles.modalText}>{product.quantityPerUnit}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Unit Price: '}</Text>
                                <Text style={styles.modalText}>{product.unitPrice}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Units In Stock: '}</Text>
                                <Text style={styles.modalText}>{product.unitsInStock}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Units On Order: '}</Text>
                                <Text style={styles.modalText}>{product.unitsOnOrder}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Reorder Level: '}</Text>
                                <Text style={styles.modalText}>{product.reorderLevel}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Discontinued: '}</Text>
                                <Text style={styles.modalText}>{product.discontinued ? product.discontinued.toString() : 'false'}</Text>
                            </View>
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalTextTitle}>{'Image: '}</Text>
                            </View>
                            <Image source={ImageLink ? { uri: ImageLink } : { uri: 'https://www.tibs.org.tw/images/default.jpg' }} style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eee', margin: 6, alignSelf: 'center' }]} />


                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    closeModal(); //HOX
                                }}
                            >
                                <Text style={styles.textStyle}>Sulje</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
              </ScrollView>

        </View>
    );
}
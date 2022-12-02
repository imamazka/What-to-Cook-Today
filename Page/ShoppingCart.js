import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native';

import Shopping from '../components/Shopping';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

function ShoppingCart({navigation}) {

    const [ingredient, setIngredient] = useState();
    const [ingredientItems, setIngredientItems] = useState([]);
    const [addItem, setAddItem] = useState(false);

    const handleAddIngredient = () => {
        Keyboard.dismiss();
        setIngredientItems([...ingredientItems, ingredient])
        setIngredient(null);
        setAddItem(!addItem);
    }

    const deleteIngredient = (index) => {
        let ingredientCopy = [...ingredientItems];
        ingredientCopy.splice(index, 1);
        setIngredientItems(ingredientCopy)
    }

    const completeIngredient = (index) => {
        console.log('pressed');
    }

    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.listWrapper}>
                    <Text style={styles.sectionTitle}>Shopping Cart</Text>

                    <View style={styles.items}>
                        {
                            ingredientItems.map((ingredient, index) => {
                                var selected = false;
                                return (
                                    <TouchableOpacity key={index} style={styles.item} onPress={() => selected=true}>
                                        <View style={styles.itemLeft}>
                                            <Ionicons 
                                                name={selected ?'checkmark-circle' : 'ellipse'}
                                                size={23} 
                                                color={selected ? colors.mainGreen : colors.white}>
                                            </Ionicons>
                                            <Text style={{
                                                    maxWidth: '80%',
                                                    left: 10,
                                                    fontSize: 15,
                                                    textDecorationLine: selected ? 'line-through' : 'none',
                                                    color: selected ? colors.mainGreen : colors.black
                                            }}>{ingredient}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => deleteIngredient(index)}>
                                            <View style={styles.square}>
                                                <Ionicons name='trash-outline' size={22} style={{ left: 0.8 }}></Ionicons>
                                            </View>
                                        </TouchableOpacity>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                </View>
            </ScrollView>
            {
                addItem ? (
                    <KeyboardAvoidingView>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                style={styles.input}
                                placeholder={'Input new item'}
                                value={ingredient}
                                onChangeText={text => setIngredient(text)}>
                            </TextInput>
                            <TouchableOpacity style={styles.addButton2} onPress={() => handleAddIngredient()}>
                                <Ionicons name='add-outline' size={25} color={colors.black}></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                ) : (
                    <View>
                        <TouchableOpacity onPress={() => setAddItem(true)}>
                            <View style={styles.addButton}>
                                <Ionicons name='add-outline' size={23} onPress={() => setAddItem(true)}></Ionicons>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.navBar}>
                            <View style={styles.navWrapper}>
                                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                                    <Ionicons name='home-outline' color={colors.white} size={24} style={{ padding: 5 }}></Ionicons>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('IngredientList')}>
                                    <Image style={styles.pantry} source={require('../assets/fridge-white.png')}></Image>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ padding: 5, right: 4 }}>
                                    <View style={styles.sectionWrapper}>
                                        <Ionicons name='cart-outline' color={colors.mainGreen} size={24} style={{ right: 4 }}></Ionicons>
                                        <Text style={styles.sectionText}>Cart</Text>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('UserDetails')}>
                                    <Ionicons name='person-outline' color={colors.white} size={24}></Ionicons>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    listWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.black,
        left: 10
    },
    items: {
        marginTop: 20
    },
    addButton: {
        width: 60,
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 70,
        position: 'absolute',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: 'flex-end',
        right: 25,
        bottom: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        elevation: 9,
    },
    addButton2: {
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'center', 
        justifyContent: 'center', 
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        elevation: 9,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    input: {
        width: 300,
        height: 75,
        backgroundColor: '#f2f2f2',
        paddingLeft: 20,
        borderRadius: 10,
        fontSize: 17
    },
    navBar: {
        width: '100%',
        backgroundColor: colors.mainGreen,
    },
    navWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        padding: 2,
    },
    sectionWrapper: {
        backgroundColor: colors.white,
        padding: 8,
        paddingHorizontal: 18,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        left: 7
    },
    sectionText: {
        fontSize: 13,
        color: colors.mainGreen,
        left: 3,
        fontWeight: '500'
    },
    pantry: {
        width: 23,
        height: 23
    },
    item :{
        backgroundColor: colors.lightGrey,
        padding: 20,
        paddingRight: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 11,
    },
    itemLeft :{
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    square :{
        width: 32,
        height: 32,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default ShoppingCart;
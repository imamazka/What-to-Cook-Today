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

    const completeIngredient = (index) => {
        let ingredientCopy = [...ingredientItems];
        ingredientCopy.splice(index, 1);
        setIngredientItems(ingredientCopy)
    }

    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.listWrapper}>
                    <Text style={styles.sectionTitle}>Shopping Cart</Text>

                    <View style={styles.items}>
                        {
                            ingredientItems.map((ingredient, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => completeIngredient(index)}>
                                        <Shopping text={ingredient}></Shopping>
                                    </TouchableOpacity>
                                )
                            })
                        }
                     
                        <Shopping text={'Ingredient 1'}></Shopping>
                        <Shopping text={'Ingredient 2'}></Shopping>
                        <Shopping text={'Ingredient 3'}></Shopping>
                        <Shopping text={'Ingredient 4'}></Shopping>
                        <Shopping text={'Ingredient 5'}></Shopping>
                        <Shopping text={'Ingredient 6'}></Shopping>
                        <Shopping text={'Ingredient 7'}></Shopping>
                        <Shopping text={'Ingredient 8'}></Shopping>
                        <Shopping text={'Ingredient 9'}></Shopping>
                        <Shopping text={'Ingredient 10'}></Shopping>
                        <Shopping text={'Ingredient 11'}></Shopping>
                        <Shopping text={'Ingredient 12'}></Shopping>
                        <Shopping text={'Ingredient 13'}></Shopping>
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
        padding: 8,
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
    }
})

export default ShoppingCart;
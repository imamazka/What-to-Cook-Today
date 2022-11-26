import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native';

import Shopping from '../components/Shopping';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

function ShoppingCart(props) {
    const [ingredient, setIngredient] = useState();
    const [ingredientItems, setIngredientItems] = useState([]);

    const handleAddIngredient = () => {
        Keyboard.dismiss();
        setIngredientItems([...ingredientItems, ingredient])
        setIngredient(null);
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

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.writeShoppingWrapper}>
                        <TextInput 
                            style={styles.input} 
                            placeholder={'  Add an item'} 
                            value={ingredient}
                            onChangeText={text => setIngredient(text)}>
                            </TextInput>
                        <TouchableOpacity onPress={() => handleAddIngredient()}>
                            <View style={styles.addWrapper}>
                                <Text style={styles.addText}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>

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

                <View style={styles.navBar}>
                    <View style={styles.navWrapper}>
                        <TouchableOpacity>
                            <Ionicons name='home-outline' color={colors.white} size={24} style={{ padding: 5 }}></Ionicons>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ padding: 5 }}>
                            <Image style={styles.pantry} source={require('../assets/fridge-white.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ padding: 5, right: 4 }}>
                            <View style={styles.sectionWrapper}>
                                <Ionicons name='cart-outline' color={colors.mainGreen} size={24} style={{ right: 4 }}></Ionicons>
                                <Text style={styles.sectionText}>Cart</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{ padding: 5 }}>
                            <Ionicons name='person-outline' color={colors.white} size={24}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
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
        fontSize: 24,
        fontWeight: "bold",
        color: colors.black,
        left: 10
    },
    items: {
        marginTop: 40
    },
    writeShoppingWrapper: {
        top: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        left: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 250,
        backgroundColor: colors.white,
        borderRadius: 60,
        borderColor: '#c0c0',
        borderWidth: 1,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    addText: {
        fontSize: 20,
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
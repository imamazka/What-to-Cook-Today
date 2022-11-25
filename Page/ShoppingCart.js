import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard} from 'react-native';

import Shopping from '../components/Shopping';
import colors from '../config/colors';

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
                <View style={styles.topBar}></View>
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
                    <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.writeShoppingWrapper}
                    >
                        <TextInput 
                            style={styles.input} 
                            placeholder={'  Add an item'} 
                            value={ingredient}
                            onChangeText={text => setIngredient(text)}
                            >
                            </TextInput>
                        <TouchableOpacity onPress={() => handleAddIngredient()}>
                            <View style={styles.addWrapper}>
                                <Text style={styles.addText}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    topBar: {
        width: '100%',
        height: 50,
        backgroundColor: colors.mainGreen
    },
    listWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20
    },
    sectionTitle: {
        //fontFamily: "Poppins",
        fontSize: 24,
        fontWeight: "bold",
        color: colors.black
    },
    items: {
        marginTop: 30
    },
    writeShoppingWrapper: {
        position: 'absolute',
        bottom: 20,
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
})

export default ShoppingCart;
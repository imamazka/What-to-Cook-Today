import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard} from 'react-native';

import Shopping from '../components/Shopping'

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
                        
                        {/*
                        <Shopping text={'Ingredient 1'}></Shopping>
                        <Shopping text={'Ingredient 2'}></Shopping>
                        <Shopping text={'Ingredient 3'}></Shopping>
                        <Shopping text={'Ingredient 1'}></Shopping>
                        <Shopping text={'Ingredient 2'}></Shopping>
                        <Shopping text={'Ingredient 3'}></Shopping>
                        <Shopping text={'Ingredient 1'}></Shopping>
                        <Shopping text={'Ingredient 2'}></Shopping>
                        <Shopping text={'Ingredient 3'}></Shopping>
                    */}
                    
                    </View>


                </View>
            </ScrollView>
                    <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.writeShoppingWrapper}
                    >
                        <TextInput 
                            style={styles.input} 
                            placeholder={'Add an ingredient'} 
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
        backgroundColor: "#D9D9D9",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    listWrapper: {
        paddingTop: 50,
        paddingHorizontal: 20
    },
    sectionTitle: {
        //fontFamily: "Poppins",
        fontSize: 24,
        fontWeight: "bold"
    },
    items: {
        marginTop: 40
    },
    writeShoppingWrapper: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 250,
        backgroundColor: "#fff",
        borderRadius: 60,
        borderColor: '#c0c0',
        borderWidth: 1
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#fff",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    addText: {},
})

export default ShoppingCart;
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'

import Ingredient from '../components/Ingredient';
import colors from '../config/colors';
import ingredients from '../assets/dummy data/ingredients';

function IngredientList({navigation}) {

    const [ingredient, setIngredient] = useState();
    const [ingredientItems, setIngredientItems] = useState([]);
    const [selected, setSelected] = useState([]);
    
    function handleAddIngredient(add) {
        setIngredient(add);
        setIngredientItems([...ingredientItems, ingredient]);
        console.log(ingredient);
        console.log(ingredientItems);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.listWrapper}>
                <Text style={styles.sectionTitle}>List your ingredient!</Text>
                
                <MultipleSelectList
                    data={ingredients}
                    setSelected={(val) => setSelected(val)}
                    save="value">
                </MultipleSelectList>
                
            </View>
           </ScrollView>

           <TouchableOpacity onPress={() => navigation.navigate('FoodList', {selected: selected})}>
                <View style={styles.continueWrapper}>
                    <Text style={styles.continueText} onPress={() => navigation.navigate('FoodList', {selected: selected})}>
                        Continue
                    </Text>
                </View>
           </TouchableOpacity>
           
           <View style={styles.navBar}>
                <View style={styles.navWrapper}>

                    <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('Main')}>
                        <Ionicons name='home-outline' color={colors.white} size={24} style={{ right: 4 }}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.sectionWrapper}>
                            <Image style={styles.pantry} source={require('../assets/fridge-green.png')}></Image>
                            <Text style={styles.sectionText}>Pantry</Text>
                        </View>
                    </TouchableOpacity>

                    
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('ShoppingCart')}>
                        <Ionicons name='cart-outline' color={colors.white} size={24}></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('UserDetails')}>
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
    },
    listWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        left: 10,
        paddingBottom: 20
    },
    items: {
        marginTop: 30
    },
    itemLeft :{
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    square :{
        width: 52,
        height: 52,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginRight: 15
    },
    itemName :{
        maxWidth: '80%',
        textTransform: 'capitalize'
    },
    continueWrapper: {
        width: 150,
        height: 40,
        backgroundColor: colors.mainGreen,
        borderRadius: 70,
        position: 'absolute',
        bottom: 13,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        elevation: 9,
    },
    continueText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold"
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
    },
    sectionText: {
        fontSize: 13,
        color: colors.mainGreen,
        left: 0,
        fontWeight: '500'
    },
    pantry: {
        width: 23,
        height: 23,
        right: 4
    }
})

export default IngredientList;
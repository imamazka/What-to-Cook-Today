import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar, TouchableOpacity, Image } from 'react-native';

import Ingredient from '../components/Ingredient';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

function IngredientList({navigation}) {

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.listWrapper}>
                <Text style={styles.sectionTitle}>List your ingredient!</Text>
                
                <View style={styles.items}>
                    <Ingredient text={'Ingredient 1'}></Ingredient>
                    <Ingredient text={'Ingredient 2'}></Ingredient>
                    <Ingredient text={'Ingredient 3'}></Ingredient>
                    <Ingredient text={'Ingredient 4'}></Ingredient>
                    <Ingredient text={'Ingredient 5'}></Ingredient>
                    <Ingredient text={'Ingredient 6'}></Ingredient>
                    <Ingredient text={'Ingredient 7'}></Ingredient>
                    <Ingredient text={'Ingredient 8'}></Ingredient>
                    <Ingredient text={'Ingredient 9'}></Ingredient>
                    <Ingredient text={'Ingredient 10'}></Ingredient>
                </View>
            </View>
           </ScrollView>
           <TouchableOpacity onPress={() => navigation.navigate('FoodList')}>
                <View style={styles.continueWrapper}>
                    <Text style={styles.continueText}>Continue</Text>
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
        left: 10
    },
    items: {
        marginTop: 30
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
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
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
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar } from 'react-native';

import Ingredient from '../components/Ingredient'

function IngredientList(props) {

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.listWrapper}>
                <Text style={styles.sectionTitle}>List Your Ingredient!</Text>
                
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
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
        marginTop: 30
    }

})

export default IngredientList;
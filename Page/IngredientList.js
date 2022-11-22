import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar, TouchableOpacity } from 'react-native';

import Ingredient from '../components/Ingredient';
import colors from '../config/colors';

function IngredientList(props) {

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topBar}></View>
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
           <TouchableOpacity>
            <View style={styles.continueWrapper}>
                <Text style={styles.continueText}>Continue</Text>
            </View>
           </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
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
        fontWeight: "bold"
    },
    items: {
        marginTop: 30
    },
    continueWrapper: {
        width:200,
        height: 50,
        backgroundColor: colors.mainGreen,
        borderRadius: 60,
        position: 'absolute',
        bottom: 15,
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
    }
})

export default IngredientList;
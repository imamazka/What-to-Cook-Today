import React, { useState } from 'react';
import { StatusBar, View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

import colors from '../config/colors';
import MainFood from '../components/MainFood';

function Main(props) {

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topBar}></View>
                <View style={styles.wrapper}>

                    <MainFood image={require('../assets/Food1.jpg')} name={'Food 1'} rating={'4.8'}></MainFood>
                    <MainFood image={require('../assets/Food2.jpg')} name={'Food 2'} rating={'4.8'}></MainFood>
                    <MainFood image={require('../assets/Food3.jpg')} name={'Food 3'} rating={'4.8'}></MainFood>
                    <MainFood image={require('../assets/Food4.jpg')} name={'Food 4'} rating={'4.8'}></MainFood>

                </View>
            </ScrollView>

            <TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <Text style={styles.searchText}>Search Based On Your Ingredient</Text>
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
    wrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 15
    },
    searchWrapper: {
        width:270,
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
    searchText: {
        fontSize: 15,
        color: colors.white,
        fontWeight: "700"
    }
})

export default Main;
import React from 'react';
import { StatusBar, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import colors from '../config/colors';
import Food from '../components/Food';
import recipes from '../assets/dummy data/recipe_data';

function Favorite(props) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 20, }}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back-outline" size={25} color={colors.darkGrey}/>
                    </TouchableOpacity>
                <Text style={styles.sectionText}>Your favorites</Text>
                </View>

                <View style={styles.wrapper}>
                    {recipes.map((item) => (
                        <Food key={item.id} image={item.image} name={item.name} rating={item.rating} ingredients={item.ingredients}></Food>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
    },
    wrapper: {
        padding: 20,
    },
    backButton: {
        height: 40,
        width: 40,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
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
    sectionText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black,
        paddingLeft: 20
    },
})

export default Favorite;
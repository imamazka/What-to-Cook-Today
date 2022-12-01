import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import colors from '../config/colors';
import recipe from '../assets/dummy data/test_recipe';
import FoodFiltered from '../components/FoodFiltered';
import foodFiltered from '../assets/dummy data/test_foodFiltered';

function FoodList({ route, navigation }) {

    const { selected } = route.params;
    const [listData, setListData] = useState([]);
    const parameter = selected.join();

    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=c30b27828db64ecbb5d9f02d9a2ee56e&ingredients=${parameter}&number=10&rangking=2&ignorePantry=true`;


    useEffect(() => {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setListData(data)
            console.log("fetched");
          })
          .catch(() => {
            console.log("error")
    })}, [parameter])


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 20, }}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('IngredientList')}>
                        <Ionicons name="arrow-back-outline" size={25} color={colors.darkGrey}/>
                    </TouchableOpacity>
                    <Text style={styles.sectionText}>Based on your ingredient :</Text>
                </View>

                <View style={styles.wrapper}>
                    {listData.map(item => (
                            <FoodFiltered 
                                key={item.id}
                                foodId={item.id} 
                                imageUri={item.image} 
                                name={item.title}
                                rating={item.likes}
                                owned={item.usedIngredientCount}
                                missing={item.missedIngredientCount}>
                            </FoodFiltered>
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

export default FoodList;
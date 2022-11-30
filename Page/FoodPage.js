import React, { useEffect, useState } from 'react';
import { Text, Image, ImageBackground, StyleSheet, View, StatusBar, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
const { height } = Dimensions.get("window");

import colors from '../config/colors';
import details from '../assets/dummy data/test_details';

function FoodPage({ route, navigation }) {
    const { foodId } = route.params;
    console.log('Food ID: ' + foodId);
    //const [foodData, setFoodData] = useState([]);
    const foodData = details;

    const url = `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=00e55b858ff043b680f446606d159cde&includeNutrition=false`;

    /*
    useEffect(() => {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setFoodData(data)
            console.log("fetched")
          })
          .catch(() => {
            console.log("error")
          })
      }, [foodId])
      */

    return (
        <>
            <ScrollView>
                <View>
                    <ImageBackground style={styles.image} source={{ uri: foodData.image }}>
                        
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Main')}>
                            <Ionicons name="chevron-back-outline" size={25} color={colors.darkGrey}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shareButton}>
                            <Ionicons name="share-social-outline" size={24} color={colors.darkGrey}/>
                        </TouchableOpacity>

                    </ImageBackground>

                    <View style={styles.detailWrapper}>

                        <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
                            <View style={{ width: "70%" }}>
                                <Text style={styles.titleText}>{foodData.title}</Text>
                            </View>
                            <View style={styles.rating}>
                                <Ionicons name="heart" color="red" size={17}/>
                                <Text style={styles.ratingText}>{foodData.aggregateLikes}</Text>
                            </View>
                        </View>

                        <Text style={styles.website}>{foodData.sourceName}.com</Text>

                        <View style= {{ flexDirection: "row", justifyContent: "space-between" }}>

                            <View style={styles.tags}>
                                <Ionicons name="time" color={colors.darkGrey} size={17}/>
                                <Text style={styles.tagsText}>{foodData.readyInMinutes} min</Text>
                            </View>

                        </View>
                        
                        
                        <View style={{ marginVertical: 30 }}>
                            <Text style={styles.ingredient}>Ingredients</Text>
                            
                            {foodData.extendedIngredients.map(item => (
                                <View style={{ marginVertical: 7, flexDirection: "row", alignItems: "center", }}>
                                    <View style={{ width: 10, height: 10, backgroundColor: colors.lightGrey, borderRadius: 10, }}></View>
                                        <Text style={{ fontSize: 15, fontWeight: "400", color: colors.grey, marginLeft: 10, textTransform: 'capitalize' }}>{item.original}</Text>
                                </View>
                            ))}

                            <Text style={styles.description}>Description</Text>
                            <Text style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

                        </View>
                    </View>
                </View>
            <View style={{ padding: 20 }}>
                <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.visitText}>Visit Website</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>

        
       </>

    );
}

const styles = StyleSheet.create({
    image: {
        top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height: height / 2.5,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingTop: 10
    },
    backButton: {
        height: 40,
        width: 40,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        top: 20,
        left: 10,
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
    shareButton: {
        height: 40,
        width: 40,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        top: 20,
        right: 10,
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
    detailWrapper: {
        padding: 20,
        paddingTop: 30,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: colors.white
    },
    titleText: {
        fontSize: 30,
        color: colors.black,
        fontWeight: "700",
        textTransform: 'capitalize',
    },
    rating: {
        padding: 5,
        paddingHorizontal: 20,
        backgroundColor: colors.mainGreen,
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 7,
        color: colors.white
    },
    website: {
        fontSize: 14,
        color: colors.darkGrey,
        fontWeight: "400",
        paddingBottom: 10,
        top: -10,
        textTransform: 'lowercase'
    },
    tags: {
        padding: 5,
        paddingHorizontal: 25,
        backgroundColor: colors.lightGrey,
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    tagsText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
        color: colors.darkGrey
    },
    ingredient: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.black
    },
    description: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.black,
        marginBottom: 10,
        top: 20
    },
    descriptionText: {
        fontSize: 15,
        fontWeight: "400",
        color: colors.grey,
        top: 10,
        lineHeight: 20
    },
    viewButton: {
        width: "100%",
        padding: 15,
        backgroundColor: colors.mainGreen,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
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
    visitText: {
        fontSize: 17,
        color: colors.white,
        fontWeight: "700",
    }
})

export default FoodPage;
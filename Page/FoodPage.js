import React from 'react';
import { Text, Image, ImageBackground, StyleSheet, View, StatusBar, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';

import { Ionicons } from "@expo/vector-icons"
const { height } = Dimensions.get("window");
import colors from '../config/colors';

function FoodPage(props) {
    return (
        <>
            <ScrollView>
                <View>
                    <ImageBackground style={styles.image} source={require("../assets/FoodPage.jpg")}>
                        
                        <TouchableOpacity style={styles.backButton}>
                            <Ionicons name="chevron-back-outline" size={25} color={colors.darkGrey}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shareButton}>
                            <Ionicons name="share-social-outline" size={24} color={colors.darkGrey}/>
                        </TouchableOpacity>

                    </ImageBackground>

                    <View style={styles.detailWrapper}>

                        <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
                            <View style={{ width: "70%" }}>
                                <Text style={styles.titleText}>Ayam Bakar</Text>
                            </View>
                            <View style={styles.rating}>
                                <Ionicons name="star" color="gold" size={17}/>
                                <Text style={styles.ratingText}>4.7</Text>
                            </View>
                        </View>

                        <Text style={styles.website}>cookpad.com</Text>

                        <View style= {{ flexDirection: "row", justifyContent: "space-between" }}>

                            <View style={styles.tags}>
                                <Ionicons name="time" color={colors.darkGrey} size={17}/>
                                <Text style={styles.tagsText}>30 min</Text>
                            </View>

                        </View>
                        
                        
                        <View style={{ marginVertical: 30 }}>
                            <Text style={styles.ingredient}>Ingredients</Text>
                            
                            <View style={{ marginVertical: 7, flexDirection: "row", alignItems: "center", }}>
                                <View style={{ width: 10, height: 10, backgroundColor: colors.lightGrey, borderRadius: 10, }}></View>
                                    <Text style={{ fontSize: 15, fontWeight: "600", color: colors.grey, marginLeft: 10, }}>Ingredient 1</Text>
                            </View>

                            <View style={{ marginVertical: 7, flexDirection: "row", alignItems: "center", }}>
                                <View style={{ width: 10, height: 10, backgroundColor: colors.lightGrey, borderRadius: 10, }}></View>
                                    <Text style={{ fontSize: 15, fontWeight: "600", color: colors.grey, marginLeft: 10, }}>Ingredient 2</Text>
                            </View>

                            <View style={{ marginVertical: 7, flexDirection: "row", alignItems: "center", }}>
                                <View style={{ width: 10, height: 10, backgroundColor: colors.lightGrey, borderRadius: 10, }}></View>
                                    <Text style={{ fontSize: 15, fontWeight: "600", color: colors.grey, marginLeft: 10, }}>Ingredient 3</Text>
                            </View>

                            <Text style={styles.description}>Description</Text>
                            <Text style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

                        </View>
                    </View>
                </View>
            <View style={{ padding: 20 }}>
                <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.visitText}>View Full Recipe</Text>
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
        left: 10
    },
    shareButton: {
        height: 40,
        width: 40,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        top: 20,
        right: 10
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
        fontWeight: "700"
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
        top: -10
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
        fontWeight: "500",
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
    },
    visitText: {
        fontSize: 17,
        color: colors.white,
        fontWeight: "700",
    }
})

export default FoodPage;
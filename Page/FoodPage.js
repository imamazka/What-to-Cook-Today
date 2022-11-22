import React from 'react';
import { Text, Image, ImageBackground, StyleSheet, View, StatusBar, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';

import { Ionicons } from "@expo/vector-icons"
const { height } = Dimensions.get("window");

function FoodPage(props) {
    return (
        <>
            <ScrollView>
                <View>
                    <ImageBackground style={styles.image} source={require("../assets/FoodPage.jpg")}>
                        
                        <TouchableOpacity style={styles.backButton}>
                            <Ionicons name="chevron-back-outline" size={23} color="dimgrey"/>
                        </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.detailWrapper}>
                        <View style={{ flexDirection: "row", marginBottom: 30, alignItems: "center" }}>
                            <View style={{ width: "70%" }}>
                                <Text style={styles.titleText}>Ayam Bakar</Text>
                            </View>
                            <View style={styles.rating}>
                                <Ionicons name="star" color="black" size={17}/>
                                <Text style={styles.ratingText}>4.7</Text>
                            </View>
                        </View>
                        <View style= {{ flexDirection: "row", justifyContent: "space-between" }}>

                            <View style={styles.tags}>
                                <Ionicons name="time" color="dimgrey" size={17}/>
                                <Text style={styles.tagsText}>30 min</Text>
                            </View>

                        </View>
                        
                        
                        <View style={{ marginVertical: 30 }}>
                            <Text style={styles.ingredient}>Ingredients</Text>

                            <View style={{ marginVertical: 7, flexDirection: "row", alignItems: "center", }}>
                                <View style={{ width: 10, height: 10, backgroundColor: "lightgrey", borderRadius: 10, }}></View>
                                    <Text style={{ fontSize: 17, fontWeight: "600", color: "grey", marginLeft: 10, }}>Ingredient 1</Text>
                            </View>

                            <View style={{ marginVertical: 7, flexDirection: "row", alignItems: "center", }}>
                                <View style={{ width: 10, height: 10, backgroundColor: "lightgrey", borderRadius: 10, }}></View>
                                    <Text style={{ fontSize: 17, fontWeight: "600", color: "grey", marginLeft: 10, }}>Ingredient 2</Text>
                            </View>

                            <View style={{ marginVertical: 7, flexDirection: "row", alignItems: "center", }}>
                                <View style={{ width: 10, height: 10, backgroundColor: "lightgrey", borderRadius: 10, }}></View>
                                    <Text style={{ fontSize: 17, fontWeight: "600", color: "grey", marginLeft: 10, }}>Ingredient 3</Text>
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
    },
    backButton: {
        height: 37,
        width: 37,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        top: 20,
        left: 20
    },
    detailWrapper: {
        padding: 20,
        paddingTop: 30,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#fff"
    },
    titleText: {
        fontSize: 30,
        color: "black",
        fontWeight: "700"
    },
    rating: {
        padding: 5,
        paddingHorizontal: 30,
        backgroundColor: "#22CB65",
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
        color: "black"
    },
    tags: {
        padding: 5,
        paddingHorizontal: 30,
        backgroundColor: "lightgrey",
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    tagsText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
        color: "dimgrey"
    },
    ingredient: {
        fontSize: 20,
        fontWeight: "700",
        color: "black"
    },
    description: {
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginBottom: 10,
        top: 20
    },
    descriptionText: {
        fontSize: 17,
        fontWeight: "500",
        color: "grey",
        top: 10,
        lineHeight: 20
    },
    viewButton: {
        width: "100%",
        padding: 15,
        backgroundColor: "#22CB65",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    visitText: {
        fontSize: 17,
        color: "#fff",
        fontWeight: "700",
    }
})

export default FoodPage;
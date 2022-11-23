import React from 'react';
import { StatusBar, View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Text } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import colors from '../config/colors';
const { width } = Dimensions.get("window");

const ITEM_WIDTH = width/2 - 10 * 3;

function FoodList1(props) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topBar}></View>
                <View style={styles.wrapper}>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food1.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={15}/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Food 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food2.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={15}/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Food 2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food3.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={15}/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Food 3</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food4.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={15}/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Food 4</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food1.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={15}/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Food 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food2.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={15}/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Food 2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food3.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={15}/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Food 3</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food4.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={15}/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Food 4</Text>
                    </TouchableOpacity>

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
        padding: 20,
    },
    itemWrapper: {
        width: ITEM_WIDTH,
        marginBottom: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingBottom: 40,
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
    itemImage: {
        width: '100%',
        height: ITEM_WIDTH - 10 * 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    itemName: {
        fontSize: 14,
        fontWeight: "400",
        marginTop: 10,
        top: 5,
        left: 10,
    },
    bookmark: {
        position: 'absolute',
        top: 12,
        right: 10,
        backgroundColor: colors.white,
        opacity: 0.75,
        borderRadius: 5,
        padding: 1,
        paddingVertical: 3
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

export default FoodList1;
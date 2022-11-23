import React from 'react';
import { StatusBar, View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Text } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import colors from '../config/colors';
const { width } = Dimensions.get("window");

const ITEM_WIDTH = width/2 - 10 * 3;

function FoodList2(props) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topBar}></View>
                <View style={styles.wrapper}>
                    <Text style={styles.basedText}>Based On Your Ingredient :</Text>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food1.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={30}/>
                        </TouchableOpacity>
                        <View style={styles.titleWrapper}>
                        <Text style={styles.itemName}>Food 1</Text>
                            <View style={{alignItems: "center", left: 5, top: 5}}>
                                <Ionicons name="star" color="gold" style={{marginTop: 5, top: 5}} size={15}></Ionicons>
                                <Text style={styles.ratingText}>4.8</Text>
                            </View>
                        </View>
                        <Text style={styles.itemIngredient}>1 egg  |  1 oatmeal  |  1 tomato</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food2.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={30}/>
                        </TouchableOpacity>
                        <View style={styles.titleWrapper}>
                        <Text style={styles.itemName}>Food 2</Text>
                            <View style={{alignItems: "center", left: 5, top: 5}}>
                                <Ionicons name="star" color="gold" style={{marginTop: 5, top: 5}} size={15}></Ionicons>
                                <Text style={styles.ratingText}>4.8</Text>
                            </View>
                        </View>
                        <Text style={styles.itemIngredient}>1 egg  |  1 oatmeal  |  1 tomato</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food3.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={30}/>
                        </TouchableOpacity>
                        <View style={styles.titleWrapper}>
                        <Text style={styles.itemName}>Food 3</Text>
                            <View style={{alignItems: "center", left: 5, top: 5}}>
                                <Ionicons name="star" color="gold" style={{marginTop: 5, top: 5}} size={15}></Ionicons>
                                <Text style={styles.ratingText}>4.8</Text>
                            </View>
                        </View>
                        <Text style={styles.itemIngredient}>1 egg  |  1 oatmeal  |  1 tomato</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemWrapper}>
                        <Image style={styles.itemImage} source={require('../assets/Food4.jpg')}/>
                        <TouchableOpacity style={styles.bookmark}>
                            <Ionicons name="bookmark-outline" color={colors.black} size={30}/>
                        </TouchableOpacity>
                        <View style={styles.titleWrapper}>
                        <Text style={styles.itemName}>Food 4</Text>
                            <View style={{alignItems: "center", left: 5, top: 5}}>
                                <Ionicons name="star" color="gold" style={{marginTop: 5, top: 5}} size={15}></Ionicons>
                                <Text style={styles.ratingText}>4.8</Text>
                            </View>
                        </View>
                        <Text style={styles.itemIngredient}>1 egg  |  1 oatmeal  |  1 tomato</Text>
                    </TouchableOpacity>

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
    topBar: {
        width: '100%',
        height: 50,
        backgroundColor: colors.mainGreen
    },
    wrapper: {
        padding: 20,
    },
    basedText: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
        paddingTop: 0,
        paddingBottom: 15,
        color: colors.black
    },
    itemWrapper: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingBottom: 30,
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
        height: ITEM_WIDTH + 10 * 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    titleWrapper: {
        marginRight: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    ratingText: {
        fontSize: 15,
        color: colors.darkGrey,
        top: 4
    },
    itemName: {
        fontSize: 20,
        fontWeight: "500",
        top: 10,
    },
    itemIngredient: {
        fontSize: 14,
        color: colors.darkGrey,
        fontWeight: "400",
        marginTop: 10,
        top: 5,
        left: 15,
    },
    bookmark: {
        position: 'absolute',
        top: 15,
        right: 13,
        backgroundColor: colors.white,
        opacity: 0.75,
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 4
    },
})

export default FoodList2;
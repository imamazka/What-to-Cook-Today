import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import colors from '../config/colors';
const { width } = Dimensions.get("window");
const ITEM_WIDTH = width/2 - 10 * 2.3;

const MainFood = (props) => {

    const [selected, setSelected] = useState(false);

    return (
        <TouchableOpacity style={styles.itemWrapper}>
            <Image style={styles.itemImage} source={props.image}/>
            <TouchableOpacity activeOpacity={0.75} onPress={() => setSelected(!selected)} style={styles.bookmark}>
                <Ionicons
                    name={selected ? 'bookmark' : 'bookmark-outline'}
                    color={selected ? colors.mainGreen : colors.black} 
                    size={25}/>
            </TouchableOpacity>
            <View style={styles.titleWrapper}>
                <Text style={styles.itemName}>{props.name}</Text>
                <View style={{alignItems: "center", left: 5}}>
                    <Ionicons name="star" color="gold" style={{marginTop: 5, top: 5}} size={12}></Ionicons>
                    <Text style={styles.ratingText}>{props.rating}</Text>
                </View>
            </View>
            <Text style={styles.itemSite}>cookpad.com</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        width: ITEM_WIDTH,
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
        height: ITEM_WIDTH - 10 * 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bookmark: {
        position: 'absolute',
        top: 12,
        right: 10,
        backgroundColor: colors.white,
        opacity: 0.75,
        borderRadius: 5,
        padding: 1,
        paddingVertical: 3,
        paddingHorizontal: 3
    },
    titleWrapper: {
        marginRight: 6,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingHorizontal: 20,
    },
    ratingText: {
        fontSize: 10,
        color: colors.darkGrey,
        top: 3
    },
    itemName: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
        top: 5,
    },
    itemSite: {
        alignSelf: "center",
        bottom: 7,
        fontSize: 10,
        position: 'absolute',
        color: colors.darkGrey
    },
})

export default MainFood;
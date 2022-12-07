import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';
const ITEM_WIDTH = width/2 - 10 * 2.3;

function FoodFiltered(props) {
    
    const [selected, setSelected] = useState(false);
    const navigation = useNavigation(); 

    function handleFavorite(){

        if(selected==false){
          setSelected(!selected);
          props.favorite.push(props.foodId);
        }
        else{
          setSelected(!selected);
          const index = props.favorite.indexOf(props.foodId);
          if (index > -1) {
            props.favorite.splice(index, 1)
          }
        } 
        console.log(props.favorite);
      }

    return (
        <TouchableOpacity style={styles.itemWrapper} onPress={() => navigation.navigate('FoodPage', {
            foodId: props.foodId,
            })
        }>
            <Image style={styles.itemImage} source={{ uri: props.imageUri }}></Image>
            <TouchableOpacity activeOpacity={0.75} onPress={handleFavorite} style={styles.bookmark}>
                <Ionicons 
                    name={selected ? 'bookmark' : 'bookmark-outline'}
                    color={selected ? colors.mainGreen : colors.black} 
                    size={30}/>
            </TouchableOpacity>

            <View style={styles.titleWrapper}>
                <Text style={styles.itemName}>{props.name}</Text>
                <View style={{alignItems: "center", right: 1 }}>
                    <Ionicons name="heart" color="red" style={{marginTop: 5, top: 5 }} size={18}></Ionicons>
                    <Text style={styles.ratingText}>{props.rating}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 10 }}>
                <View style={styles.missing}>
                    <Text style={{ color: colors.darkGrey, }}>Missing {props.missing} Ingredients</Text>
                </View>
                <View style={styles.owned}>
                    <Text style={{ color: colors.darkGrey, }}>Owned {props.owned} Ingredients</Text>
                </View>
            </View>

            {/*
            {props.ingredients.map((ingredient) => (
                <View key={ingredient.id} style={{ flexDirection: 'row', left: 10, width: '30%', backgroundColor: colors.white, left: 30 }}>
                    <Text key={ingredient.id} style={{ fontSize: 15, color: colors.darkGrey, }}>{ingredient.name}</Text>
                </View>
            ))}
            */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
        elevation: 9,
    },
    itemImage: {
        width: '100%',
        height: ITEM_WIDTH + 10 * 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    titleWrapper: {
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10
    },
    itemName: {
        fontSize: 18,
        fontWeight: "500",
        width: '80%',
        textTransform: 'capitalize'
    },
    ratingText: {
        fontSize: 15,
        color: colors.darkGrey,
        top: 4
    },
    owned: {
        paddingHorizontal: 10,
        top: 15, 
        height: 23, 
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
    },
    missing: {
        paddingHorizontal: 10,
        top: 15, 
        height: 23, 
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
    },
    itemIngredient: {
        fontSize: 14,
        color: colors.darkGrey,
        fontWeight: "400",
        marginTop: 10,
        top: 5,
        left: 15,
    },
})

export default FoodFiltered;
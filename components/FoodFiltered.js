import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../firebase";
import {LinearGradient} from 'expo-linear-gradient';

import colors from '../config/colors';
import { ImageBackground } from 'react-native';
const ITEM_WIDTH = width/2 - 10 * 2.3;

function FoodFiltered(props) {
    
    const [selected, setSelected] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if(props.favorite!=undefined){
          if(props.favorite.includes(props.foodId)){
            setSelected(true);
          }
        }
      }, [])

    function handleFavorite(){
        if(selected==false){
          setSelected(!selected);
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
                favorites: firebase.firestore.FieldValue.arrayUnion(props.foodId)
            })  
            console.log("add food ID: "+ props.foodId +" to database");
        }
        else{
          setSelected(!selected);
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
                favorites: firebase.firestore.FieldValue.arrayRemove(props.foodId)
            })
            console.log("remove food ID: "+ props.foodId +" from database");
        } 
    }
      
    return (
        <TouchableOpacity style={styles.itemWrapper} onPress={() => navigation.navigate('FoodPage', {foodId: props.foodId})}>
            <ImageBackground style={styles.itemImage} source={{ uri: props.imageUri }}>
                <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.85)']} style={styles.bottomImage}>
                    <Text style={styles.itemName}>{props.name}</Text>
                </LinearGradient>
            </ImageBackground>

            <TouchableOpacity activeOpacity={0.75} onPress={handleFavorite} style={styles.bookmark}>
                <Ionicons 
                    name={selected ? 'bookmark' : 'bookmark-outline'}
                    color={selected ? colors.mainGreen : colors.black} 
                    size={27}/>
            </TouchableOpacity>
            
            <View style={styles.infoWrapper}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '85%', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {props.ingredients.slice(0, 2).map(item => (
                            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                <Text style={{color: '#3A3A3B'}}>{item.name}</Text>
                                <View style={styles.divider}/>
                            </View>
                        ))}
                        <Text style={{color: '#3A3A3B'}}>etc.</Text>
                    </View>
                    <Ionicons name='heart-outline' size={20} color={'#F24E1E'}/>
                    <Text style={{fontSize: 15, fontWeight: '400'}}> {props.rating}</Text>
                </View>

                <View style={styles.info}>
                    <Ionicons name='checkmark-circle' size={22} color={'#4ECB71'}></Ionicons>
                    <Text style={styles.infoText}>{props.owned} Ingredients</Text>
                    <Ionicons name='close-circle' size={22} color={'#F24E1E'}></Ionicons>
                    <Text style={styles.infoText}>{props.missing} Ingredients</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingBottom: 10,
        shadowColor: colors.black,
        elevation: 9,
    },
    itemImage: {
        width: '100%',
        height: ITEM_WIDTH + 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
    },
    bottomImage: {
        height : '100%', 
        width : '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: 12,
        paddingBottom: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "600",
        textTransform: 'capitalize',
        color: colors.white,
    },
    bookmark: {
        position: 'absolute',
        top: 13,
        right: 13,
        backgroundColor: colors.white,
        opacity: 0.75,
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 4
    },
    infoWrapper: {
        paddingHorizontal: 15,
        paddingTop: 9,
    },
    divider: {
        height: 14, 
        width: 2.35, 
        backgroundColor: '#2EACAA', 
        marginHorizontal: 4, 
        borderRadius: 5
    },
    info: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    infoText: {
        fontSize: 14.5,
        fontWeight: '400',
        marginLeft: 3,
        marginRight: 13
    }
})

export default FoodFiltered;
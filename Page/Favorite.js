import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import colors from '../config/colors';
import Food from '../components/Food';
//import listData from '../assets/dummy data/test_foodList';
import apiKey from '../key';
import { firebase } from "../firebase";

function Favorite({navigation}) {

    const [listData, setListData] = useState([]);
    const [ids, setIds] = useState([]);
    //const ids = '639637,641202,662075,663313,635675'; //change to id on user data

     useEffect(() => {
        getFavorite();
      }, []);
    
    const getFavorite = () => {
       firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((data)=>{
            setIds(data.data().favorites);
            console.log("db favorite: " + data.data().favorites)
        });
    };

    const url = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${ids}`;

    const getFavoriteList = async() => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setListData(json);
            console.log('fetched');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 20, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('UserDetails')}>
                        <Ionicons name="arrow-back-outline" size={25} color={colors.darkGrey}/>
                    </TouchableOpacity>
                    <Text style={styles.sectionText}>Your favorites</Text>
                    <TouchableOpacity style={styles.shareButton} onPress={getFavoriteList}>
                        <Ionicons name="share-outline" size={25} color={colors.darkGrey}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.itemWrapper}>
                    {listData==undefined ? <Text style={{ alignSelf: 'center' }}>Loading...</Text> 
                        : listData.map(item => (
                            <Food 
                                key={item.id}
                                foodId={item.id} 
                                imageUri={item.image} 
                                name={item.title}
                                type={item.dishTypes[0]} 
                                likes={item.aggregateLikes}
                                time={item.readyInMinutes}>
                            </Food>))
                    }
                </View>
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
    },
    itemWrapper: {
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
    shareButton: {
        right: 20,
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
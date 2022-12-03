import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import colors from '../config/colors';
import Food from '../components/Food';
import apiKey from '../key';
import mealTypes from '../assets/dummy data/meal_types';

function Main({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [type, setType] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [listData, setListData] = useState([]);
    
    const urlRandom = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
    const urlSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&addRecipeInformation=true&number=10`;
    const urlFilter = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}&addRecipeInformation=true&number=10`;

    const getRandomList = async() => {
        try {
            const response = await fetch(urlRandom);
            const json = await response.json();
            setListData(json.recipes);
            console.log('fetched');
        } catch (error) {
            console.error(error);
        }
    }

    const submitSearch = async() => {
        try {
            const response = await fetch(urlSearch);
            const json = await response.json();
            setListData(json.results);
            console.log('fetched');
        } catch (error) {
            console.error(error);
        }
    }

    const submitType = async(type) => {
        setType(type);
        console.log(type);
        try {
            const response = await fetch(urlFilter);
            const json = await response.json();
            setListData(json.results);
            console.log('fetched');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <SearchBar 
                    placeholder='Search any food...'
                    lightTheme='true'
                    round='true'
                    onChangeText={onChangeSearch}
                    onSubmitEditing={submitSearch}
                    value={searchQuery}></SearchBar>
                
                <ScrollView horizontal={true} style={{ marginTop: 10, marginLeft: 5 }} showsHorizontalScrollIndicator={false}>
                    {mealTypes.map(types => (
                        <TouchableOpacity style={styles.typesWrapper} key={types.id} onPress={() => submitType(types.value)}>
                            <Text style={styles.typesText}>{types.value}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

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

            <View style={styles.navBar}>
                <View style={styles.navWrapper}>

                    <TouchableOpacity onPress={getRandomList}>
                        <View style={styles.sectionWrapper}>
                            <Ionicons name='home-outline' color={colors.mainGreen} size={22} style={{ right: 4 }}></Ionicons>
                            <Text style={styles.sectionText}>Home</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('IngredientList')}>
                        <Image style={styles.pantry} source={require('../assets/fridge-white.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('ShoppingCart')}>
                        <Ionicons name='cart-outline' color={colors.white} size={24}></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('UserDetails')}>
                        <Ionicons name='person-outline' color={colors.white} size={24}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
    },
    typesWrapper: { 
        marginLeft: 8,
        backgroundColor: '#F2F2F2',
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 54 
    },
    typesText: { 
        color: '#828282',
        fontSize: 14,
        textTransform: 'capitalize' 
    },
    itemWrapper: {
        padding: 20
    },
    navBar: {
        width: '100%',
        backgroundColor: colors.mainGreen,
    },
    navWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        padding: 8,
    },
    sectionWrapper: {
        backgroundColor: colors.white,
        padding: 8,
        paddingHorizontal: 18,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    sectionText: {
        fontSize: 13,
        color: colors.mainGreen,
        left: 4,
        fontWeight: '500'
    },
    pantry: {
        width: 23,
        height: 23
    }
})

export default Main;
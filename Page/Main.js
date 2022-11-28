import React, { useState } from 'react';
import { StatusBar, View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import colors from '../config/colors';
import Food from '../components/Food';
import recipes from '../assets/dummy data/recipe_data';

function Main({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <ScrollView>
                <SearchBar 
                    placeholder='Search food...'
                    lightTheme='true'
                    round='true'
                    onChangeText={onChangeSearch}
                    value={searchQuery}/>

                <View style={styles.itemWrapper}>
                    {recipes.map((item) => (
                        <Food key={item.id} image={item.image} name={item.name} rating={item.rating} ingredients={item.ingredients}></Food>
                    ))}
                </View>
                
            </ScrollView>

            <View style={styles.navBar}>
                <View style={styles.navWrapper}>
                    <TouchableOpacity>
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
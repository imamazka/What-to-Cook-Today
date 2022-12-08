import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'

import colors from '../config/colors';
import ingredients from '../assets/dummy data/ingredients';

function IngredientList({navigation}) {

    const [selected, setSelected] = useState([]);

    function handleSelected(item) {
        selected.push(item);
        console.log(selected);
    }
    
    function handleDeselect(item) {
        const index = selected.indexOf(item);
        if (index > -1) { // only splice array when item is found
            selected.splice(index, 1); // 2nd parameter means remove one item only
        }
        console.log(selected);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{paddingTop: 30,}}>
                    <Text style={styles.sectionTitle}>Select your ingredients!</Text>

                    <View style={{padding: 5, marginBottom: 50}}>
                        {ingredients.map(category => 
                            (
                            <View style={styles.categoriesWrapper} key={category.id}>
                                <View style={styles.categoryTitleWrapper}>
                                    <Image source={category.image} style={styles.categoryImage}></Image>
                                    <Text style={styles.categoryTitle}>{category.name}</Text>
                                </View>
                                <View style={{height: 0.75, width: '100%', backgroundColor: colors.black}}></View>
                                <View style={styles.itemWrapper}>
                                    {category.children.map(item => {
                                        var select = false;
                                        return (
                                            <TouchableOpacity 
                                            onPress={() => {
                                                select = !select;
                                                if(select){
                                                    handleSelected(item.name);
                                                }
                                                else{
                                                    handleDeselect(item.name);
                                                }
                                            }}
                                            style={{
                                                backgroundColor: select ? colors.mainGreen : '#f1f1f1',
                                                paddingHorizontal: 8,
                                                paddingVertical: 5,
                                                borderRadius: 5,
                                                marginRight: 9,
                                                marginTop: 8
                                            }}
                                            key={item.id}>
                                                <Text style={{
                                                    color: select ? colors.white : colors.black
                                                }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                    
                    
                </View>
           </ScrollView>

           <TouchableOpacity onPress={() => navigation.navigate('FoodList', {selected: selected})}>
                <View style={styles.continueWrapper}>
                    <Text style={styles.continueText} onPress={() => navigation.navigate('FoodList', {selected: selected})}>
                        Continue
                    </Text>
                </View>
           </TouchableOpacity>
           
           <View style={styles.navBar}>
                <View style={styles.navWrapper}>

                    <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('Main')}>
                        <Ionicons name='home-outline' color={colors.white} size={24} style={{ right: 4 }}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.sectionWrapper}>
                            <Image style={styles.pantry} source={require('../assets/fridge-green.png')}></Image>
                            <Text style={styles.sectionText}>Pantry</Text>
                        </View>
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        left: 10,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    categoriesWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        shadowColor: colors.black,
        elevation: 10,
        borderRadius: 7,
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: colors.white,
    },
    categoryTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
        //justifyContent: 'space-between'
    },
    categoryImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginLeft: 10
    },
    categoryTitle: {
        fontSize: 16,
        marginLeft: 20,
        fontWeight: '400',
        textTransform: 'capitalize'
    },
    itemWrapper: {
        marginHorizontal: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
    },
    continueWrapper: {
        width: 150,
        height: 40,
        backgroundColor: colors.mainGreen,
        borderRadius: 70,
        position: 'absolute',
        bottom: 13,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        elevation: 9,
    },
    continueText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold"
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
        left: 0,
        fontWeight: '500'
    },
    pantry: {
        width: 23,
        height: 23,
        right: 4
    }
})

export default IngredientList;
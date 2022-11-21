import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Touchable, TouchableOpacity} from 'react-native';

const Ingredient = (props) => {

    return (

        <TouchableOpacity style={styles.item} onPress={()=>{console.log('pressed');}}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity style={styles.circular}>
                
            </TouchableOpacity>
        
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item :{
        backgroundColor: "#D9D9D9",
        padding: 12,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    itemLeft :{
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    },
    square :{
        width: 52,
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 15
    },
    itemText :{
        maxWidth: '80%'
    },
    circular :{
        width: 18,
        height: 18,
        borderColor: "#000000",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 8,
    },
    
})

export default Ingredient;
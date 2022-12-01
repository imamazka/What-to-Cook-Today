import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

const Ingredient = (props) => {

    const [selected, setSelected] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => setSelected(!selected)}
            style={{
                backgroundColor: selected ? colors.mainGreen : colors.lightGrey,
                padding: 12,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20}}>
            
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemName}>{props.name}</Text>
            </View>
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemLeft :{
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    square :{
        width: 52,
        height: 52,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginRight: 15
    },
    itemName :{
        maxWidth: '80%',
        textTransform: 'capitalize'
    },
})

export default Ingredient;
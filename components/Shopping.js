import React from 'react';
import { View, StyleSheet, Text, Image, Touchable, TouchableOpacity} from 'react-native';

function Shopping(props) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity style={styles.circular} onPress={()=>{console.log('pressed');}}>
                
            </TouchableOpacity>
        
        </View>
    );
}

const styles = StyleSheet.create({
    item :{
        backgroundColor: "#D9D9D9",
        padding: 25,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15
    },
    itemLeft :{
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    },
    square :{
        width: 24,
        height: 24,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginRight: 15
    },
    itemText :{
        maxWidth: '80%'
    },
    circular :{
        width: 15,
        height: 15,
        borderColor: "#000",
        backgroundColor: "#fff",
        borderWidth: 0.5,
        borderRadius: 8,
    },
})

export default Shopping;
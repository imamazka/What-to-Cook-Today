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
        backgroundColor: "#fff",
        padding: 15,
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
        width: 24,
        height: 24,
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        marginRight: 15
    },
    itemText :{
        maxWidth: '80%'
    },
    circular :{
        width: 12,
        height: 12,
        borderColor: "#000000",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 8,
    },
})

export default Shopping;
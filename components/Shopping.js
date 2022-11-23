import { Ionicons } from '@expo/vector-icons';
import React, { useState }from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import colors from '../config/colors';

function Shopping(props) {

    const [selected, setSelected] = useState(false);

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity>
                    <View style={styles.square}>
                        <Ionicons name='trash-outline' size={22} style={{ left: 0.8 }}></Ionicons>
                    </View>
                </TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelected(!selected)} style={styles.circle}>
                <TouchableOpacity
                    onPress={() => setSelected(!selected)}
                    style={{
                        width: 18,
                        height: 18,
                        opacity: selected ? 1 : 0,
                        borderColor: colors.mainGreen,
                        backgroundColor: colors.mainGreen,
                        borderWidth: 1,
                        borderRadius: 10,
                    }}>

                </TouchableOpacity>
            </TouchableOpacity>
        
        </View>
    );
}

const styles = StyleSheet.create({
    item :{
        backgroundColor: '#d9d9d9',
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
        width: 32,
        height: 32,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    itemText :{
        maxWidth: '80%'
    },
    circle :{
        width: 27,
        height: 27,
        borderColor: colors.mainGreen,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center"
    },
})

export default Shopping;
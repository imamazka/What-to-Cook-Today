import React, { useState }from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

function Shopping(props) {

    const [selected, setSelected] = useState(false);

    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => setSelected(!selected)}>
            <View style={styles.itemLeft}>
                <Ionicons 
                    name={selected ?'checkmark-circle' : 'ellipse'}
                    size={23} 
                    color={selected ? colors.mainGreen : colors.white}>
                </Ionicons>
                <Text style={{
                        maxWidth: '80%',
                        left: 10,
                        fontSize: 15,
                        textDecorationLine: selected ? 'line-through' : 'none',
                        color: selected ? colors.mainGreen : colors.black
                }}>{props.text}</Text>
            </View>
            
            <TouchableOpacity>
                <View style={styles.square}>
                    <Ionicons name='trash-outline' size={22} style={{ left: 0.8 }}></Ionicons>
                </View>
            </TouchableOpacity>
        
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item :{
        backgroundColor: colors.lightGrey,
        padding: 20,
        paddingRight: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 11,
    },
    itemLeft :{
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
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
})

export default Shopping;
import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../config/colors";

/**
 * Selectable ingredient item component from IngredientList page.
 * 
 * @param {props} props - Props from IngredientList page.
 * 
 */

const IngredientItem = (props) => {

    const [select, setSelect] = useState(false);    // selected item state.

    // add selected item name to selected list, and color handler.
    function handleSelected(item) {
        props.setSelected([...props.selected, item]);
        setSelect(!select);
        console.log('selected');
    }

    // deselect item name to selected list, and color handler.
    function handleDeselect(item) {
        const index = props.selected.indexOf(item);
        if (index > -1) { // only splice array when item is found
            let itemCopy = [...props.selected];
            itemCopy.splice(index, 1); // 2nd parameter means remove one item only
            props.setSelected(itemCopy);
            setSelect(!select);
        }
        console.log('deselect');
    }
    
    return(
        <TouchableOpacity 
        onPress={() => {
            if(!select){
                handleSelected(props.name);
            }
            else{
                handleDeselect(props.name);
            }
            console.log(props.selected);
        }}
        style={{
            backgroundColor: select ? colors.mainGreen : '#f1f1f1',
            paddingHorizontal: 8,
            paddingVertical: 5,
            borderRadius: 5,
            marginRight: 9,
            marginTop: 8
        }}>
            <Text style={{
                color: select ? colors.white : colors.black
            }}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
})

export default IngredientItem;
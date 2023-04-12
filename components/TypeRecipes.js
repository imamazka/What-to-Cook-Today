import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

import colors from "../config/colors";

/**
 * Type-based search food component from Welcome page.
 * 
 * @param {props} props - Props from Welcome page.
 * 
 */

function TypeRecipes(props) {

  const navigation = useNavigation();   // navigation to food page.

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    const marginLeft = props.index === 0 ? 20 : 0;
    return (
      <TouchableOpacity style={{ marginLeft: marginLeft, marginRight: 20, width: 130, paddingVertical: 0 }} onPress={() => navigation.navigate("FoodPage", {foodId: props.foodId})}>
        <Image style={styles.itemImage} source={{ uri: props.imageUri }}/>
        <Text style={styles.itemName}>{props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
	itemImage: {
		width: 130,
    height: 130,
		borderRadius: 15,
    resizeMode: 'cover'
	},
  itemName: {
    marginTop: 5,
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    paddingHorizontal: 5,
    color: colors.topBarItem
  }
});

export default TypeRecipes;
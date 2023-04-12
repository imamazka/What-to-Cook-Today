import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
	ImageBackground
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';

import colors from "../config/colors";

/**
 * Random food component from Welcome page.
 * 
 * @param {props} props - Props from Welcome page.
 * 
 */

function RandomRecipes(props) {

  const navigation = useNavigation();               // navigation to food page.
  const [selected, setSelected] = useState(false);  // selected bookmark check.

  // check if bookmark already selected.
  useEffect(() => {
    if (props.favorite != undefined) {
      if (props.favorite.includes(props.foodId)) {
        setSelected(true);
      }
    }
  }, []);

  // food favorite handler to user database.
  function handleFavorite() {
    if (selected == false) {
      setSelected(!selected);
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          favorites: firebase.firestore.FieldValue.arrayUnion(props.foodId),
        });
      console.log("add food ID: " + props.foodId + " to database");
    } else {
      setSelected(!selected);
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          favorites: firebase.firestore.FieldValue.arrayRemove(props.foodId),
        });
      console.log("remove food ID: " + props.foodId + " from database");
    }
  }

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Inter_700Bold,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    const marginLeft = props.index === 0 ? 20 : 0;
    return (
      <TouchableOpacity style={{ marginLeft: marginLeft, marginRight: 20, width: 290, height: 200 }} onPress={() => navigation.navigate("FoodPage", {foodId: props.foodId})}>
        <ImageBackground style={styles.itemImage} source={{ uri: props.imageUri }}>
          <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']} style={styles.bottomImage}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.infoPadding}>
                <Ionicons name='heart' size={16} color={colors.white}></Ionicons>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', marginLeft: 3, fontSize: 12, color: colors.white, top: 1 }}>{props.likes}</Text>
              </View>
              <TouchableOpacity style={styles.infoPadding} onPress={handleFavorite}>
                <Ionicons name={selected ? 'bookmark' : 'bookmark-outline'} size={22} color={selected ? colors.mainYellow : colors.white}></Ionicons>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name='time-outline' color={colors.white} size={12}/>
                <Text style={styles.infoText}>{props.time} min</Text>
                <Ionicons name='fast-food-outline' color={colors.white} size={12} style={{ marginLeft: 12 }}/>
                <Text style={styles.infoText}>{props.type}</Text>
              </View>
              <Text style={styles.itemName}>{props.name}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
	itemImage: {
		width: '100%',
		borderRadius: 12,
		overflow: 'hidden',
	},
	bottomImage: {
		height : '100%', 
		width : '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 12,
		paddingBottom: 10,
	},
  infoPadding: {
    backgroundColor: 'rgba(48, 48, 48, 0.4)',
    top: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    fontFamily: 'Inter_500Medium', 
    color: colors.white, 
    left: 2, 
    fontSize: 10,
    textTransform: 'capitalize'
  },
	itemName: {
		fontFamily: 'Inter_700Bold',
		fontSize: 20,
		textTransform: 'capitalize',
		color: colors.white,
	},
});

export default RandomRecipes;
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import colors from "../config/colors";

/**
 * Food component from Main page.
 * 
 * @param {props} props - Props from Main page.
 * 
 */

function Food(props) {

  const navigation = useNavigation();               // navigation to another page.
  const [selected, setSelected] = useState(false);  // add to favorite state to change button color.

  // change favorite button color if already favorited trigger.
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
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() =>
          navigation.navigate("FoodPage", {
            foodId: props.foodId,
          })
        }>
        {/* image */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", height: 150 }}>
            <Image
              style={styles.itemImage}
              source={{ uri: props.imageUri }}></Image>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleFavorite}
              style={styles.bookmark}>
              <Ionicons
                name={selected ? "bookmark" : "bookmark-outline"}
                color={selected ? colors.mainYellow : colors.white}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {/* food */}
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: 13,
            }}>
            <View style={{ width: "100%" }}>
              {props.type == null ? (
                <View />
              ) : (
                <Text
                  style={{
                    color: colors.mainYellow,
                    fontSize: 12,
                    fontFamily: "Poppins_600SemiBold",
                    textTransform: "capitalize",
                  }}>
                  {props.type}
                </Text>
              )}
            </View>

            <View
              style={{
                width: "100%",
                marginBottom: 5,
                paddingRight: 15,
              }}>
              <Text style={styles.itemName}>{props.name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginRight: 15,
                }}>
                <Ionicons name="time-outline" color={colors.black} size={16} />
                <Text
                  style={{
                    color: "#555555",
                    paddingLeft: 4,
                    fontSize: 12,
                    fontFamily: "Poppins_500Medium",
                  }}>
                  {props.time} min
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Ionicons name="heart-outline" color="red" size={16} style={{bottom: 1.5}} />
                <Text style={{ paddingLeft: 4, fontSize: 12, fontFamily: "Poppins_500Medium", color: "#555555" }}>
                  {props.likes}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 9,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  bookmark: {
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: 'rgba(48, 48, 48, 0.4)',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  itemName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    textTransform: "capitalize",
    color: '#1d1d1d'
  },
  likesText: {
    fontSize: 15,
    color: colors.darkGrey,
    top: 4,
  },
  time: {
    backgroundColor: colors.white,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Food;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";

import colors from "../config/colors";

function Food(props) {
  const [selected, setSelected] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if(props.favorite!=undefined){
      if(props.favorite.includes(props.foodId)){
        setSelected(true);
      }
    }
  }, [])

  function handleFavorite(){
    if(selected==false){
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
              color={selected ? colors.mainGreen : colors.black}
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
            paddingLeft: 10,
          }}>
          <View style={{ width: "100%" }}>
            {props.type == null ? (
              <View />
            ) : (
              <Text
                style={{
                  color: colors.mainGreen,
                  fontSize: 14,
                  fontWeight: "700",
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
              paddingRight: 10,
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
                }}>
                {props.time} min
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Ionicons name="heart-outline" color="red" size={16} />
              <Text style={{ paddingLeft: 4, fontSize: 12, color: "#555555" }}>
                {props.likes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
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
    borderRadius: 20,
  },
  bookmark: {
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: colors.white,
    opacity: 0.75,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  itemName: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "capitalize",
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

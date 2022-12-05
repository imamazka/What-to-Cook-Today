import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
const ITEM_WIDTH = width / 2 - 10 * 2.3;

function Food(props) {
  const [selected, setSelected] = useState(false);
  const navigation = useNavigation();

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
            onPress={() => setSelected(!selected)}
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
            //backgroundColor: "red",
          }}>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                color: colors.mainGreen,
                fontSize: 14,
                fontWeight: "700",
                textTransform: "capitalize",
                //backgroundColor: "blue",
              }}>
              {props.type}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              marginBottom: 5,
              paddingRight: 10,
              //backgroundColor: "red",
            }}>
            <Text style={styles.itemName}>{props.name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              //backgroundColor: "green",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 15,
              }}>
              <Ionicons name="time" color={colors.darkGrey} size={15} />
              <Text
                style={{
                  color: colors.darkGrey,
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
              <Ionicons name="heart" color="red" size={15} />
              <Text style={{ paddingLeft: 4, fontSize: 12, fontWeight: "600" }}>
                {props.likes}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/*
            {props.ingredients.map((ingredient) => (
                <View key={ingredient.id} style={{ flexDirection: 'row', left: 10, width: '30%', backgroundColor: colors.white, left: 30 }}>
                    <Text key={ingredient.id} style={{ fontSize: 15, color: colors.darkGrey, }}>{ingredient.name}</Text>
                </View>
            ))}
            */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    //paddingBottom: 30,
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
    //paddingLeft: 20,
    //top: 15,
    backgroundColor: colors.white,
    alignItems: "center",
    //justifyContent: 'space-evenly',
    //borderRadius: 8,
    flexDirection: "row",
  },
  /* itemIngredient: {
    fontSize: 14,
    color: colors.darkGrey,
    fontWeight: "400",
    marginTop: 10,
    top: 5,
    left: 15,
  }, */
});

export default Food;

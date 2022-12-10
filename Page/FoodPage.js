import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";
import apiKey from "../key";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";

function FoodPage({ route, navigation }) {
  const [selected, setSelected] = useState(false);

  const { foodId } = route.params;
  console.log("Food ID: " + foodId);

  const [foodData, setFoodData] = useState([]);

  const url = `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${apiKey}&includeNutrition=true`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFoodData(data);
        console.log("fetched");
      })
      .catch(() => {
        console.log("error");
      });
  }, [foodId]);

  var html = foodData.instructions;

  if (foodData.extendedIngredients) {
    html = html.replace(/(?:\r\n|\r|\n)/g, "<p>");
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this cool food recipe! ${foodData.sourceUrl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function loadInBrowser() {
    Linking.openURL(foodData.sourceUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
        //paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
      }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={26}
            color={colors.topBarItem}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.recipeText}>Recipe Details</Text>
        <TouchableOpacity onPress={onShare}>
          <Ionicons
            name="share-outline"
            size={26}
            color={colors.topBarItem}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {foodData.extendedIngredients ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={{ uri: foodData.image }}
              style={styles.image}>
              <LinearGradient
                colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"]}
                style={styles.bottomImage}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={colors.white}></Ionicons>
                  <Text style={{ color: colors.white, left: 2, fontSize: 12 }}>
                    {foodData.readyInMinutes} min
                  </Text>
                  <Ionicons
                    name="fast-food-outline"
                    size={14}
                    color={colors.white}
                    style={{ marginLeft: 20 }}></Ionicons>
                  <Text
                    style={{
                      color: colors.white,
                      left: 2,
                      fontSize: 12,
                      textTransform: "capitalize",
                    }}>
                    {foodData.dishTypes[0]}
                  </Text>
                </View>
                <Text style={styles.foodName}>{foodData.title}</Text>
              </LinearGradient>
            </ImageBackground>

            <View style={styles.info}>
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="heart-outline"
                  color={"#FD3250"}
                  size={22}></Ionicons>
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {foodData.aggregateLikes}
                </Text>
                <Text style={{ fontSize: 8, fontWeight: "400" }}>Likes</Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="people-outline"
                  color={"#4674EB"}
                  size={22}></Ionicons>
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {foodData.servings}
                </Text>
                <Text style={{ fontSize: 8, fontWeight: "400" }}>Servings</Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="nutrition-outline"
                  color={"#F2894F"}
                  size={22}></Ionicons>
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {foodData.nutrition.nutrients[0].amount}
                </Text>
                <Text style={{ fontSize: 8, fontWeight: "400" }}>Kcal</Text>
              </View>
            </View>

            <View style={styles.section}>
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: "50%",
                  backgroundColor: selected ? "#f1f1f1" : colors.mainGreen,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setSelected(false)}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: selected ? colors.black : colors.white,
                  }}>
                  Ingredients
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: "50%",
                  backgroundColor: selected ? colors.mainGreen : "#f1f1f1",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setSelected(true)}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: selected ? colors.white : colors.black,
                  }}>
                  Instructions
                </Text>
              </TouchableOpacity>
            </View>

            {selected ? (
              <View style={styles.instructionsWrapper}>
                <RenderHTML contentWidth={width} source={{ html }} />
              </View>
            ) : (
              foodData.extendedIngredients.map((item) => (
                <View style={styles.ingredient} key={item.originalName}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.box}>
                      <Image
                        source={{
                          uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                        }}
                        style={styles.ingredientImage}></Image>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        left: 15,
                        color: "#303030",
                        textTransform: "capitalize",
                        width: "55%",
                        flexWrap: "wrap",
                      }}>
                      {item.nameClean}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      right: 15,
                      width: "25%",
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "#A9A9A9",
                        textTransform: "lowercase",
                      }}>
                      {item.amount}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "#A9A9A9",
                        textTransform: "lowercase",
                      }}>
                      {item.unit}
                    </Text>
                  </View>
                </View>
              ))
            )}

            <TouchableOpacity
              style={styles.visitButton}
              onPress={loadInBrowser}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.white,
                }}>
                Visit Website
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.white,
                  textTransform: "lowercase",
                }}>
                {foodData.sourceName}.com
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <Text
            style={{
              alignSelf: "center",
              marginTop: 20,
              fontSize: 17,
              fontWeight: "500",
              color: colors.darkGrey,
            }}>
            Loading....
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginHorizontal: 24,
    marginTop: 5,
    flexDirection: "row",
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
  },
  recipeText: {
    fontSize: 19,
    fontWeight: "bold",
    color: colors.topBarItem,
  },
  image: {
    marginHorizontal: 16,
    marginTop: 5,
    height: 230,
    width: width - 32,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    shadowColor: colors.black,
    elevation: 10,
  },
  bottomImage: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    paddingLeft: 18,
    paddingBottom: 7,
    paddingRight: 10,
  },
  foodName: {
    fontSize: 23,
    fontWeight: "600",
    color: colors.white,
    textTransform: "capitalize",
  },
  info: {
    marginHorizontal: 16,
    marginTop: 15,
    paddingVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: colors.black,
    elevation: 10,
  },
  section: {
    marginHorizontal: 16,
    height: 38,
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  ingredient: {
    marginHorizontal: 16,
    height: 76,
    marginTop: 13,
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    height: 52,
    width: 50,
    backgroundColor: colors.white,
    marginLeft: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  ingredientImage: {
    height: "80%",
    width: "80%",
    resizeMode: "contain",
  },
  instructionsWrapper: {
    marginHorizontal: 16,
    backgroundColor: "#f1f1f1",
    marginTop: 13,
    paddingLeft: 5,
    paddingRight: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  visitButton: {
    marginTop: 25,
    marginBottom: 25,
    height: 55,
    width: "75%",
    backgroundColor: colors.mainGreen,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
  },
});

export default FoodPage;

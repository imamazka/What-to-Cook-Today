import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../firebase";

import colors from "../config/colors";
import FoodFiltered from "../components/FoodFiltered";
import apiKey from "../key";

/**
 * Page showing list of foods based on ingredients submitted by user.
 * 
 * @param {route} route - Parameter from previous page.
 * @param {navigation} navigation - Navigation to another page.
 *  
 */

function FoodList({ route, navigation }) {

  const { selected } = route.params;            // selected ingredients name list array.
  const parameter = selected.join();            // convert the ingredients name array to string.
  const [listData, setListData] = useState([]); // list of food retrieved from web api.
  const [favorite, setFavorite] = useState([]); // list of food id favorited by user.

  // request url from web api to retrieve foods based on ingredients.
  const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${parameter}&number=10&rangking=2&ignorePantry=true`;

  // get favorite ids from database and food search list from web api trigger.
  useEffect(() => {
    getFavorite();

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setListData(data);
        console.log("fetched");
      })
      .catch(() => {
        console.log("error");
      });
  }, [parameter]);

  // get favorited food id from database.
  const getFavorite = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        setFavorite(data.data().favorites);
        console.log("db favorite: " + data.data().favorites);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("IngredientList")}>
            <Ionicons name="arrow-back-outline" size={24} />
          </TouchableOpacity>
          <Text style={styles.sectionText}>Based on your ingredients</Text>
          <View style={{ width: 40, height: 40 }}></View>
        </View>

        <View style={styles.wrapper}>
          {listData.map((item) => (
            <FoodFiltered
              key={item.id}
              foodId={item.id}
              imageUri={item.image}
              name={item.title}
              rating={item.likes}
              owned={item.usedIngredientCount}
              missing={item.missedIngredientCount}
              ingredients={item.missedIngredients.concat(item.usedIngredients)}
              favorite={favorite}></FoodFiltered>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 35,
  },
  wrapper: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    height: 40,
    width: 40,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionText: {
    fontSize: 19,
    fontWeight: "bold",
    color: colors.black,
  },
});

export default FoodList;

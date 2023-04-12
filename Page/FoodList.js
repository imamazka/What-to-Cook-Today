import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { firebase } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

import colors from "../config/colors";
import FoodFiltered from "../components/FoodFiltered";

/**
 * Page showing list of foods based on ingredients submitted by user.
 *
 * @param {route} route - Parameter from previous page.
 * @param {navigation} navigation - Navigation to another page.
 *
 */

function useMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}

function FoodList({ route, navigation }) {
  const { selected } = route.params; // selected ingredients name list array.
  const parameter = selected.join(); // convert the ingredients name array to string.
  const [listData, setListData] = useState([]); // list of food retrieved from web api.
  const [favorite, setFavorite] = useState([]); // list of food id favorited by user.
  const [apiKey, setData] = useState(""); //key needed to retrieve food from API
  const isMounted = useMounted();                             // state to trigger second use effect

  // request url from web api to retrieve foods based on ingredients.
  const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${parameter}&number=10&rangking=2&ignorePantry=true`;

  // get favorite ids from database and food search list from web api trigger.
  useEffect(() => {
    getApiKey();
  },[]);

  //run after apiKey is triggered
  useEffect(() => {
    if (isMounted) {
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
    }
  }, [apiKey, parameter]);

  //get api key from database
  const getApiKey = () => {
    firebase
    .firestore()
    .collection("api")
    .doc("apiKeys")
    .get()
    .then((data) => {
      setData(data.data().key);
    });
  }

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

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={styles.top}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("IngredientList")}>
              <Feather name='arrow-left' size={24} color={colors.topBarItem}></Feather>
            </TouchableOpacity>
            <Text style={styles.sectionText}>Based on your ingredients</Text>
            <Feather name='arrow-left' size={24} color={colors.white}></Feather>
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    justifyContent: "space-between",
  },
  wrapper: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  backButton: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 19,
    color: colors.topBarItem,
  },
});

export default FoodList;

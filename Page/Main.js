import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
  Platform,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import Food from "../components/Food";
import apiKey from "../key";
import mealTypes from "../assets/dummy data/meal_types";
import { firebase } from "../firebase";
import { ImageBackground } from "react-native";

const Search = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: "#d9dbda",
        flexDirection: "row",
        paddingHorizontal: 13,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 25,
        height: 35,
      }}>
      <Ionicons name="search" size={20} />
      <TextInput
        style={{ flex: 1, marginLeft: 6 }}
        blurOnSubmit={false}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};
import { SafeAreaView } from "react-native-safe-area-context";

const Main = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [listData, setListData] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    getFavorite();
  }, []);

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

  const urlRandom = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
  const urlSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&addRecipeInformation=true&number=10`;
  const urlFilter = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}&addRecipeInformation=true&number=10`;

  useEffect(() => {
    getRandomList();
  }, []);

  const getRandomList = async () => {
    getFavorite();
    try {
      const response = await fetch(urlRandom);
      const json = await response.json();
      setListData(json.recipes);
      console.log("fetched");
    } catch (error) {
      console.error(error);
    }
  };

  const submitSearch = async () => {
    getFavorite();
    Keyboard.dismiss();
    try {
      const response = await fetch(urlSearch);
      const json = await response.json();
      setListData(json.results);
      console.log("fetched");
    } catch (error) {
      console.error(error);
    }
  };

  const submitType = async (type) => {
    getFavorite();
    setType(type);
    console.log(type);
    try {
      const response = await fetch(urlFilter);
      const json = await response.json();
      setListData(json.results);
      console.log("fetched");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(searchQuery);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 15,
            height: 35,
            marginBottom: 2
          }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#DEFDEA",
              alignItems: "center",
              paddingHorizontal: 13,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.mainGreen,
              height: 38,
              justifyContent: 'center', 
            }}>
            <Ionicons name="search" size={20} color="#969696" />
            <TextInput
              style={{ flex: 1, marginLeft: 6, }}
              blurOnSubmit={false}
              placeholder="Search any food"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={submitSearch}
            />

            {searchQuery && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close" size={20} color="#969696" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {mealTypes.map((types) => (
              <TouchableOpacity
                style={styles.typesWrapper}
                key={types.id}
                onPress={() => submitType(types.value)}>
                <Text style={styles.typesText}>{types.value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.itemWrapper}>
          {listData==null || listData.length==0 ? (
            <View style={{ alignItems: 'center', marginVertical: 120, marginHorizontal: 48 }}>
              <ImageBackground source={require('../assets/NoSearchResult.png')} style={{width: 250, height: 250, justifyContent: 'flex-end'}}>
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>No results found</Text>
              </ImageBackground>
              <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 5, color: '#555555' }}>Try search another food to find what are you looking for</Text>
            </View>
          ) : (
            listData.map((item) => (
              <Food
                key={item.id}
                foodId={item.id}
                imageUri={item.image}
                name={item.title}
                type={item.dishTypes[0]}
                likes={item.aggregateLikes}
                time={item.readyInMinutes}
                favorite={favorite}></Food>
            ))
          )}
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        <View style={styles.navWrapper}>
          <TouchableOpacity onPress={getRandomList}>
            <View style={styles.sectionWrapper}>
              <Ionicons
                name="home-outline"
                color={colors.mainGreen}
                size={22}
                style={{ right: 4 }}></Ionicons>
              <Text style={styles.sectionText}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.navigate("IngredientList")}>
            <Image
              style={styles.pantry}
              source={require("../assets/fridge-white.png")}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.navigate("ShoppingCart")}>
            <Ionicons
              name="cart-outline"
              color={colors.white}
              size={24}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.navigate("UserDetails")}>
            <Ionicons
              name="person-outline"
              color={colors.white}
              size={24}></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  typesWrapper: {
    left: 20,
    marginRight: 7,
    backgroundColor: "#F2F2F2",
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 25,
  },
  typesText: {
    color: "#828282",
    fontSize: 14,
    textTransform: "capitalize",
  },
  itemWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  navBar: {
    width: "100%",
    backgroundColor: colors.mainGreen,
  },
  navWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },
  sectionWrapper: {
    backgroundColor: colors.white,
    padding: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sectionText: {
    fontSize: 13,
    color: colors.mainGreen,
    left: 4,
    fontWeight: "500",
  },
  pantry: {
    width: 23,
    height: 23,
  },
});

export default Main;

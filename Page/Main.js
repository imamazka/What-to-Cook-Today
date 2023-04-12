import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Keyboard,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../firebase";
import { useFonts, Rubik_400Regular } from '@expo-google-fonts/rubik';
import { Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Feather, Ionicons } from '@expo/vector-icons';

import colors from "../config/colors";
import Food from "../components/Food";
import mealTypes from "../assets/data/meal_types";

/**
 * Page shown after welcome page.
 * Used to show random recipes, search by name, and search by category.
 * 
 * @param {route} route - Parameter from previous welcome page
 * @param {navigation} navigation - Navigation to another page
 * 
 */

const Main = ({route, navigation }) => {

  const { prevSearch, prevType, method, selectedTypeId } = route.params; // parameter from welcome page

  const [searchQuery, setSearchQuery] = useState("");       // submitted food search entered by user.
  const [type, setType] = useState("");                     // typed search entered by user.
  const [listData, setListData] = useState([]);             // list of foods retrieved from the web api, based on random, name, category search.
  const [favorite, setFavorite] = useState([]);             // list of favorited food id saved on the user account.
  const [apiKey, setData] = useState("");                   // key needed to retrieve food from API.
  const [placeholder, setPlaceholder] = useState('');       // search bar placeholder.
  const [selectedId, setSelectedId] = useState(0);          // selected type id.
  const [placeholderColor, setPlaceholderColor] = useState('#969696');  // placeholder text color

  // 3 types of request url based on 3 type of search.
  const urlRandom = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
  const urlSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&addRecipeInformation=true&number=10`;
  const urlFilter = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}&addRecipeInformation=true&number=10`;

  // get favorited ids and and list of foods when page load trigger.
  useEffect(() => {
    getApiKey();
  });

  // call function based on method passed from previous page.
  useEffect(() => {
    if (method === 'search') {
      setPlaceholder(prevSearch);
      setPlaceholderColor(colors.black);
      submitPrevSearch();
    } else if (method === 'random') {
      setPlaceholder('Search Recipes');
      getRandomList();
    } else if (method === 'type') {
      setSelectedId(selectedTypeId);
      setPlaceholder('Search Recipes');
      submitPrevType();
    }
  }, [method, apiKey]);

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

  // get favorited ids from database.
  const getFavorite = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        setFavorite(data.data().favorites);
      });
  };

  // get random list of foods from web api.
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

  // get recipe based from welcome page
  const submitPrevSearch = async () => {
    getFavorite();
    Keyboard.dismiss();
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${prevSearch}&addRecipeInformation=true&number=10`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setListData(json.results);
      console.log("fetched");
    } catch (error) {
      console.error(error);
    }
  };

  // get food search by name from web api.
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

  // get recipe based on welcome page type filter.
  const submitPrevType = async () => {
    getFavorite();
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${prevType}&addRecipeInformation=true&number=10`
    try {
      const response = await fetch(url);
      const json = await response.json();
      setListData(json.results);
      console.log("fetched");
    } catch (error) {
      console.error(error);
    }
  };

  // get food list filtered by categories from web api.
  const submitType = async (idx, type) => {
    getFavorite();
    setSelectedId(idx);
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

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Inter_700Bold,
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  else{
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>
          {" "}
        </StatusBar>
        <ScrollView>
          <View
            style={{
              marginLeft: 15,
              marginRight: 20,
              marginTop: 15,
              height: 35,
              marginBottom: 2,
              flexDirection: 'row'}}>
            <TouchableOpacity style={{alignSelf: 'center', padding: 7, top: 1}} onPress={() => navigation.goBack()}>
              <Feather name='arrow-left' size={24} color={colors.topBarItem}></Feather>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#FFEED2",
                alignItems: "center",
                paddingHorizontal: 13,
                borderRadius: 20,
                height: 38,
                justifyContent: 'flex-start'
                }}>
                <Ionicons name="search" size={20} color={colors.mainYellow} />
                <TextInput
                  style={{marginLeft: 10, fontFamily: 'Inter_500Medium', fontSize: 14, flex: 1}}
                  blurOnSubmit={false}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderColor}
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                  onSubmitEditing={submitSearch}/>

              {searchQuery && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close" size={20} color="#969696" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {mealTypes.map((types) => {
                const backgroundColor = types.id === selectedId ? colors.mainYellow : '#f2f2f2';
								const color = types.id === selectedId ? colors.white : '#828282';
                const marginLeft = types.id === 1 ? 20 : 0;
                return(
                  <TouchableOpacity
                    style={{
                      marginLeft: marginLeft,
                      marginRight: 7,
                      backgroundColor: backgroundColor,
                      alignSelf: "center",
                      paddingHorizontal: 16,
                      paddingVertical: 6,
                      borderRadius: 25
                    }}
                    key={types.id}
                    onPress={() => submitType(types.id, types.value)}>
                    <Text style={{color: color, fontFamily: "Rubik_400Regular", fontSize: 14, textTransform: "capitalize"}}>{types.value}</Text>
                  </TouchableOpacity>)}
              )}
            </ScrollView>
          </View>
          <View style={styles.itemWrapper}>
            {listData == null || listData.length == 0 ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 120,
                  marginHorizontal: 48,
                }}>
                <ImageBackground
                  source={require("../assets/NoSearchResult.png")}
                  style={{ width: 250, height: 250, justifyContent: "flex-end" }}>
                  <Text
                    style={{
                      fontFamily: 'Inter_700Bold',
                      textAlign: "center",
                      fontSize: 18,
                    }}>
                    No results found
                  </Text>
                </ImageBackground>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    marginTop: 5,
                    color: "#555555",
                  }}>
                  Try search another food to find what are you looking for
                </Text>
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
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
  }
});

export default Main;

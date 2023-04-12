import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { firebase } from "../firebase";
import { useFonts, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';

import colors from "../config/colors";
import Food from "../components/Food";

/**
 * List of favorite food page.
 *
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

function Favorite({ navigation }) {

  const [listData, setListData] = useState([]); // list of food retrieved from web api based on user favorite food ids.
  const [ids, setIds] = useState([]); // list of food id favorited by user.
  const [apiKey, setData] = useState(""); //key needed to retrieve food from API
  const isMounted = useMounted();  // state to trigger second use effect

  // request url to get list of food based on bulk of ids.
  const url = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${ids}`;

  // get apiKey from database trigger.
  useEffect(() => {
    getApiKey();
  }, []);

  // get list of food from web api.
  useEffect(() => {
    if (isMounted) {
      getFavorite();
    }
  }, [apiKey]);
  
  //run after apiKey is triggered
  useEffect(() => {
    if (isMounted) {
      getFavoriteList();
    }
  }, [ids]);

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
  
  // get favorite ids on user data from database.
  const getFavorite = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        setIds(data.data().favorites);
        console.log("db favorites: " + data.data().favorites);
      });
  };

  // get food list from web api based on ids.
  const getFavoriteList = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setListData(json);
      console.log("fetched");
    } catch (error) {
      console.error(error);
    }
  };

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>
          {" "}
        </StatusBar>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 15,
              marginBottom: 20,
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Feather name='arrow-left' size={24} color={colors.topBarItem}></Feather>
            </TouchableOpacity>
            <Text style={styles.sectionText}>Favorites</Text>
            <Feather name='arrow-left' size={24} color={colors.white}></Feather>
          </View>

          <View style={{ padding: 20 }}>
            {listData == undefined || ids == undefined || ids == '' ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 150,
                  marginHorizontal: 48,
                }}>
                <ImageBackground
                  source={require("../assets/EmptyInbox.png")}
                  style={{ width: 350, height: 250, justifyContent: "flex-end" }}>
                  <View style={{ top: 20 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontFamily: 'Inter_700Bold'
                      }}>
                      Your favorite is empty
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: 'Inter_400Regular',
                        fontSize: 14,
                        marginTop: 3,
                        color: "#555555",
                      }}>
                      Explore the recipes and add them to favorite and show them here
                    </Text>
                  </View>
                </ImageBackground>
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
                  favorite={ids}></Food>))
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 19,
    color: colors.topBarItem,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default Favorite;

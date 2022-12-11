import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";
import Food from "../components/Food";
import apiKey from "../key";
import { firebase } from "../firebase";

function Favorite({ navigation }) {
  const [listData, setListData] = useState([]);
  const [ids, setIds] = useState([]);
  //const ids = '639637,641202,662075,663313,635675'; //change to id on user data

  useEffect(() => {
    getFavorite();
  }, []);

  useEffect(() => {
    getFavoriteList();
  }, [ids]);

  const getFavorite = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        setIds(data.data().favorites);
        console.log("db favorites: " + data.data().favorites);
        console.log(data.data().favorites);
      });
  };

  const url = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${ids}`;

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

  return (
    <View style={styles.container}>
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
            onPress={() => navigation.navigate("UserDetails")}>
            <Ionicons name="arrow-back-outline" size={24} color={"black"} />
          </TouchableOpacity>
          <Text style={styles.sectionText}>Favorites</Text>
          <Ionicons name="arrow-back-outline" size={24} color={"white"} />
        </View>

        <View style={{ padding: 20 }}>
          {listData == undefined || ids == "" ? (
            <View
              style={{
                alignItems: "center",
                marginVertical: 150,
                marginHorizontal: 48,
              }}>
              <ImageBackground
                source={require("../assets/EmptyInbox.png")}
                style={{ width: 250, height: 250, justifyContent: "flex-end" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}>
                  Your favorite is empty
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    marginTop: 3,
                    color: "#555555",
                  }}>
                  Explore the recipes and add them to favorite to show them here
                </Text>
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
                favorite={ids}></Food>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
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
    fontSize: 19,
    fontWeight: "bold",
    color: colors.black,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default Favorite;

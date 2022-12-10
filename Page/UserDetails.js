import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";
import { firebase } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const UserDetails = ({ navigation }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        if (data.exists) {
          setUser(data.data());
          console.log(data);
        } else console.log("user doesnt exist");
      });
  };

  console.log(user);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.black}>
        {" "}
      </StatusBar>
      <View style={{ flex: 0.1, backgroundColor: colors.white, marginTop: 30 }}>
        <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}>
          My Account
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}>
          <Image
            source={require("../assets/defaultProfilePicture.png")}
            style={Styles.profileImage}
          />
        </View>
        <View>
          <Text
            style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
            {user.userName}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 13,
              textAlign: "center",
              color: colors.grey,
            }}>
            {user.email}
          </Text>
          <View style={{ marginTop: 30 }}>
            <TouchableOpacity style={{ padding: 10 }}>
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <View style={{ flex: 1.5 }}>
                  <Icon name="align-justify" size={23} color="#darkGrey" />
                </View>
                <View style={{ justifyContent: "center", flex: 10 }}>
                  <Text>Account Info</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Icon name="angle-right" size={23} color="#darkGrey" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => navigation.navigate("Favorite")}>
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <View style={{ flex: 1.5 }}>
                  <Icon name="bookmark" size={29} color="#darkGrey" />
                </View>
                <View style={{ justifyContent: "center", flex: 10 }}>
                  <Text>Favorite</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Icon name="angle-right" size={23} color="#darkGrey" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
              style={{ padding: 10 }}>
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <View style={{ flex: 1.5 }}>
                  <Icon name="lock" size={30} color="#darkGrey" />
                </View>
                <View style={{ justifyContent: "center", flex: 10 }}>
                  <Text>Security</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Icon name="angle-right" size={23} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10 }}>
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <View style={{ flex: 1.5 }}>
                  <Icon name="address-book" size={28} />
                </View>
                <View style={{ justifyContent: "center", flex: 10 }}>
                  <Text>Contact Us</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Icon name="angle-right" size={23} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10 }}>
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <View style={{ flex: 1.5 }}>
                  <Icon name="mobile" size={45} />
                </View>
                <View style={{ justifyContent: "center", flex: 10 }}>
                  <Text>About App</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Icon name="angle-right" size={23} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => firebase.auth().signOut()}>
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <View style={{ flex: 1.5 }}>
                  <Icon name="sign-out" size={30} />
                </View>
                <View style={{ justifyContent: "center", flex: 10 }}>
                  <Text>Logout</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Icon name="angle-right" size={23} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={Styles.navBar}>
        <View style={Styles.navWrapper}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.navigate("Main")}>
            <Ionicons
              name="home-outline"
              color={colors.white}
              size={24}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.navigate("IngredientList")}>
            <Image
              style={Styles.pantry}
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
          <TouchableOpacity>
            <View style={Styles.sectionWrapper}>
              <Ionicons
                name="person-outline"
                color={colors.mainGreen}
                size={22}
                style={{ right: 4 }}></Ionicons>
              <Text style={Styles.sectionText}>User</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  button: {
    width: 180,
    height: 50,
    backgroundColor: "#22CB65",
    borderRadius: 30,
    marginTop: 34,
    justifyContent: "center",
  },
  buttonText: {
    //fontFamily: 'NotoSans-Medium',
    color: "#FFF",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    // position: 'absolute',
    // zIndex: 2
  },
  itemWrapper: {
    padding: 20,
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

export default UserDetails;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

import colors from "../config/colors";

/**
 * User details page.
 *
 * @param {navigation} navigation - Navigation to another page.
 *
 */

const UserDetails = ({ navigation }) => {
  const [user, setUser] = useState({}); // user data object.

  // retrieve user data from database trigger when page load.
  useEffect(() => {
    getUser();
  }, []);

  // retrieve user data from database.
  const getUser = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        if (data.exists) {
          setUser(data.data());
        } else console.log("user doesnt exist");
      });
  };

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>
            {" "}
        </StatusBar>
        <View style={{ flex: 0.1, backgroundColor: colors.white, marginTop: 30 }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 30, textAlign: "center", color: colors.mainYellow }}>
            My Account
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              marginTop: 20
            }}>
            {user.imgProfile == null ? (
              <Image
                source={require("../assets/defaultProfile.png")}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            ) : (
              <Image
                source={{ uri: user.imgProfile }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100 / 2,
                  borderWidth: 3,
                  borderColor: colors.white,
                }}
              />
            )}
          </View>
          <View>
            <Text
              style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, textAlign: "center" }}>
              {user.userName}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 13,
                textAlign: "center",
                color: '#6C6982',
              }}>
              {user.email}
            </Text>
            <View style={{ marginTop: 40 }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => navigation.navigate("AccountInfo")}>
                <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                  <View style={{ flex: 1.5 }}>
                  <Ionicons
                    name="person-outline"
                    size={24}/>
                  </View>
                  <View style={{ justifyContent: "center", flex: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Account Details</Text>
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
                  <Ionicons
                    name="bookmark-outline"
                    size={24}/>
                  </View>
                  <View style={{ justifyContent: "center", flex: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Favorite</Text>
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
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}/>
                  </View>
                  <View style={{ justifyContent: "center", flex: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Password</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Icon name="angle-right" size={23} />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: 10 }}>
                <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                  <View style={{ flex: 1.5 }}>
                  <Ionicons
                    name="mail-outline"
                    size={24}/>
                  </View>
                  <View style={{ justifyContent: "center", flex: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Contact Us</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Icon name="angle-right" size={23} />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: 10 }}>
                <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                  <View style={{ flex: 1.5 }}>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}/>
                  </View>
                  <View style={{ justifyContent: "center", flex: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>About App</Text>
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
                  <Ionicons
                    name="log-out-outline"
                    size={24}/>
                  </View>
                  <View style={{ justifyContent: "center", flex: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Logout</Text>
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
              onPress={() => navigation.navigate("Welcome")}>
              <Feather name="home" size={22} color={colors.white}></Feather>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => navigation.navigate("IngredientList")}>
              <MaterialCommunityIcons name="fridge-outline" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => navigation.navigate("ShoppingCart")}>
              <Feather name="shopping-cart" size={22} color={colors.white}></Feather>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={Styles.sectionWrapper}>
              <Feather name="user" size={22} color={colors.mainYellow} style={{right: 4}}></Feather>
              <Text style={Styles.sectionText}>User</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const Styles = StyleSheet.create({
  itemWrapper: {
    padding: 20,
  },
  navBar: {
    width: "100%",
    backgroundColor: colors.mainYellow,
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
    color: colors.mainYellow,
    left: 4,
    fontWeight: "500",
  },
});

export default UserDetails;

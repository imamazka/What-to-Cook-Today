import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground
} from "react-native";
import { firebase } from "../firebase";
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

import colors from "../config/colors";

/**
 * Shopping cart page, used by user to list their to-do's shop list.
 * 
 * @param {navigation} navigation - Navigation to another screen. 
 */

function useMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}

function ShoppingCart({ navigation }) {

  const [ingredient, setIngredient] = useState();             // newly added to-do item.
  const [ingredientItems, setIngredientItems] = useState([]); // list of unfinished to-do items.
  const [finishedItems, setFinishedItems] = useState([]);     // list of finished to-do items.
  const [addItem, setAddItem] = useState(false);              // bottom navigation will hide if user input new item.
  const isMounted = useMounted();                             // state to trigger second use effect

  // get list from user database trigger when page load.
  useEffect(() => {
    fetchItem();
  }, []);

  //second trigger after first useEffect is triggered.
  useEffect(() => {
    if (isMounted) {
      setItem();
    }
  }, [ingredientItems, finishedItems]);

  // get item from user database.
  const fetchItem = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        setIngredientItems(data.data().ingredientItems);
        setFinishedItems(data.data().finishedItems);
      });
  };
  console.log(ingredientItems);

  // update item from user database.
  const setItem = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        ingredientItems: ingredientItems,
        finishedItems: finishedItems,
      });
  };

  // new add item handler.
  const handleAddIngredient = () => {
    Keyboard.dismiss();
    setIngredientItems([...ingredientItems, ingredient]);
    setIngredient(null);
    setAddItem(!addItem);
  };

  // delete item from unfinished list.
  function deleteIngredient(index) {
    let ingredientCopy = [...ingredientItems];
    ingredientCopy.splice(index, 1);
    setIngredientItems(ingredientCopy);
    console.log("deleted");
  }

  // move item from unfinished to finished list.
  function completeIngredient(index) {
    finishedItems.push(ingredientItems[index]);
    let ingredientCopy = [...ingredientItems];
    ingredientCopy.splice(index, 1);
    setIngredientItems(ingredientCopy);
    console.log("finished");
  }

  // move item from finished to unfinished list.
  function cancelFinished(index) {
    ingredientItems.push(finishedItems[index]);
    let ingredientCopy = [...finishedItems];
    ingredientCopy.splice(index, 1);
    setFinishedItems(ingredientCopy);
    setItem();
    console.log("cancelled");
  }

  // delete item from finished list.
  function deleteFinished(index) {
    let ingredientCopy = [...finishedItems];
    ingredientCopy.splice(index, 1);
    setFinishedItems(ingredientCopy);
    console.log("deleted");
  }

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold
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
            <View style={styles.listWrapper}>
              <Text style={styles.sectionTitle}>Shopping Cart</Text>

              {ingredientItems.length == 0 && finishedItems.length == 0 ? (
                <View
                  style={{
                    alignItems: "center",
                    marginVertical: 130,
                    marginHorizontal: 48,
                  }}>
                  <ImageBackground
                    source={require("../assets/NoItemsCart.png")}
                    style={{
                      width: 350,
                      height: 250,
                      justifyContent: "flex-end",
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontFamily: 'Inter_700Bold'
                      }}>
                      Your cart is empty
                    </Text>
                  </ImageBackground>
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      textAlign: "center",
                      fontSize: 14,
                      marginTop: 5,
                      color: "#555555",
                    }}>
                    Add new item to your shopping cart
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.section}>To Shop</Text>
                  <View>
                    {ingredientItems.length == 0 ? (
                      <Text style={styles.empty}>-- Empty --</Text>
                    ) : (
                      ingredientItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.item}>
                          <View style={styles.itemLeft}>
                            <Ionicons
                              name={"ellipse-outline"}
                              size={23}
                              color={colors.grey}
                              onPress={() => completeIngredient(index)}></Ionicons>
                            <Text style={styles.itemText}>{item}</Text>
                          </View>

                          <TouchableOpacity onPress={() => deleteIngredient(index)}>
                            <View style={styles.square}>
                              <Ionicons
                                name="trash-outline"
                                size={22}
                                style={{ left: 0.8 }}></Ionicons>
                            </View>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))
                    )}
                  </View>

                  <Text style={styles.section}>Finished</Text>
                  <View>
                    {finishedItems.length == 0 ? (
                      <Text style={styles.empty}>-- Empty --</Text>
                    ) : (
                      finishedItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.item}>
                          <View style={styles.itemLeft}>
                            <Ionicons
                              name={"checkmark-circle"}
                              size={23}
                              color={colors.grey}
                              onPress={() => cancelFinished(index)}></Ionicons>
                            <Text style={styles.itemFinished}>{item}</Text>
                          </View>

                          <TouchableOpacity onPress={() => deleteFinished(index)}>
                            <View style={styles.square}>
                              <Ionicons
                                name="trash-outline"
                                size={22}
                                style={{
                                  left: 0.8,
                                  color: colors.darkGrey,
                                }}></Ionicons>
                            </View>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))
                    )}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
          {addItem ? (
            <KeyboardAvoidingView>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder={"Input new item"}
                  value={ingredient}
                  onChangeText={(text) => setIngredient(text)}
                  onSubmitEditing={handleAddIngredient}></TextInput>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => handleAddIngredient()}>
                  <Ionicons
                    name="add-outline"
                    size={20}
                    color={colors.black}></Ionicons>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          ) : (
            <View>
              <TouchableOpacity onPress={() => setAddItem(true)}>
                <View style={styles.addButton}>
                  <Ionicons
                    name="add-outline"
                    size={23}
                    onPress={() => setAddItem(true)}></Ionicons>
                </View>
              </TouchableOpacity>

              <View style={styles.navBar}>
                <View style={styles.navWrapper}>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate("Welcome")}>
                  <Feather name="home" size={22} color={colors.white}></Feather>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => navigation.navigate("IngredientList")}>
                    <MaterialCommunityIcons name="fridge-outline" size={25} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <View style={styles.sectionWrapper}>
                    <Feather name="shopping-cart" size={22} color={colors.mainYellow} style={{right: 4}}></Feather>
                    <Text style={styles.sectionText}>Cart</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => navigation.navigate("UserDetails")}>
                    <Feather name="user" size={22} color={colors.white}></Feather>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: colors.topBarItem,
    marginBottom: 10,
    alignSelf: "center",
  },
  section: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 30,
    color: "#3a3a3b",
  },
  empty: {
    alignSelf: "center",
    color: colors.grey,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginVertical: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 70,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "flex-end",
    right: 25,
    bottom: 15,
    shadowColor: colors.black,
    elevation: 9,
  },
  inputWrapper: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    elevation: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    width: "70%",
    height: 50,
    backgroundColor: "#f2f2f2",
    paddingLeft: 20,
    borderRadius: 10,
    fontSize: 17,
  },
  confirmButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    shadowColor: colors.black,
    elevation: 4,
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
    left: 3,
    fontWeight: "500",
  },
  item: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  itemLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%",
  },
  itemText: {
    maxWidth: "80%",
    marginLeft: 15,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    textDecorationLine: "none",
    color: colors.black,
  },
  square: {
    width: 32,
    height: 32,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  itemFinished: {
    maxWidth: "80%",
    marginLeft: 15,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    textDecorationLine: "none",
    color: colors.darkGrey,
    textDecorationLine: "line-through",
  },
});

export default ShoppingCart;

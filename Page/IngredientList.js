import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import colors from "../config/colors";
import ingredients from "../assets/data/ingredients";
import IngredientItem from "../components/IngredientItem";

/**
 * Page used by user to submit their already have ingredients.
 * 
 * @param {navigation} navigation - navigation to another page. 
 * 
 */

function IngredientList({ navigation }) {

  const [selected, setSelected] = useState([]);   // list of already have ingredients selected by user.

  // continue button on press handler to show search result.
  const handlePress = () => {
    if (selected.length === 0) return;
    else navigation.navigate("FoodList", { selected: selected });
  };

  /*
  const handleRemove = () => {
    setSelected([]);
  }*/

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>
          {" "}
        </StatusBar>
        <ScrollView>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.sectionTitle}>Select Your Ingredients!</Text>
            {
            /*selected.length === 0 ? (<View></View>) : 
              (<TouchableOpacity style={styles.removeWrapper} onPress={handleRemove}>
                <Text style={{fontSize: 12, color: colors.white}}>Remove All</Text>
                <Feather name='x' size={15} color={colors.white} style={{top: 0.75}}></Feather>
              </TouchableOpacity>
              )*/
            }
            <View
              style={{ padding: 5, marginBottom: selected.length === 0 ? 0 : 40 }}>
              {ingredients.map((category) => (
                <View style={styles.categoriesWrapper} key={category.id}>
                  <View style={styles.categoryTitleWrapper}>
                    <Image source={category.image} style={styles.categoryImage} />
                    <Text style={styles.categoryTitle}>{category.name}</Text>
                  </View>
                  <View style={{height: 0.75, width: "100%", backgroundColor: colors.black}}></View>
                  <View style={styles.itemWrapper}>
                    {category.children.map((item) => (
                      <IngredientItem
                        key={item.id}
                        name={item.name}
                        selected={selected}
                        //remove={false}
                        setSelected={setSelected}></IngredientItem>
                    ))}
                  </View>
                </View>
              ))}
              <View style={styles.info}>
              <Text style={{ color: "#555555", fontFamily: 'Inter_400Regular' }}>
                * We assume you already have typical pantry items. Such as water,
                salt, flour, etc.
              </Text>
            </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={selected.length === 0 ? 1 : 0.6}>
          <View
            onPress={handlePress}
            style={[
              styles.continueWrapper,
              {
                backgroundColor:
                  selected.length === 0 ? "#f1f1f1" : colors.mainYellow,
                opacity: selected.length === 0 ? 0 : 1,
              },
            ]}>
            <Text
              onPress={handlePress}
              style={[
                styles.continueText,
                { color: selected.length === 0 ? colors.black : colors.white },
              ]}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.navBar}>
          <View style={styles.navWrapper}>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => navigation.navigate("Welcome")}>
              <Feather name="home" size={22} color={colors.white}></Feather>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.sectionWrapper}>
              <MaterialCommunityIcons name="fridge-outline" size={25} color={colors.mainYellow} style={{right: 4}} />
              <Text style={styles.sectionText}>Pantry</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => navigation.navigate("ShoppingCart")}>
              <Feather name="shopping-cart" size={22} color={colors.white}></Feather>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => navigation.navigate("UserDetails")}>
              <Feather name="user" size={22} color={colors.white}></Feather>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 25,
    marginBottom: 15,
    marginHorizontal: 24,
    marginTop: 10,
    color: colors.mainYellow,
    alignSelf: 'center'
  },
  removeWrapper: {
    height: 20, 
    width: 90, 
    borderRadius: 8,
    backgroundColor: colors.mainYellow, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around',
    paddingHorizontal: 3,
    alignSelf: 'flex-end',
    marginRight: 25,
    marginBottom: 5,
  },
  info: {
    marginBottom: 15,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: 10,
  },
  categoriesWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    shadowColor: colors.black,
    elevation: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  categoryTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 10,
  },
  categoryTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    marginLeft: 15,
    textTransform: "capitalize",
    color: colors.topBarItem
  },
  itemWrapper: {
    marginHorizontal: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  continueWrapper: {
    width: 150,
    height: 40,
    borderRadius: 70,
    position: "absolute",
    bottom: 11,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    elevation: 6,
  },
  continueText: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    top: 2
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
    paddingHorizontal: 8,
    paddingVertical: 6
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
    left: 0,
    fontWeight: "500",
  },
});

export default IngredientList;

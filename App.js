//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase } from './firebase';
import React, { useState, useEffect } from "react";

import IngredientList from "./Page/IngredientList";
import ShoppingCart from "./Page/ShoppingCart";
import Login from "./Page/Login";
import Register from "./Page/Register";
import FoodPage from "./Page/FoodPage";
import FoodList from "./Page/FoodList";
import Home from "./Page/Home";
import Favorite from "./Page/Favorite";
import Main from "./Page/Main";
import UserDetails from "./Page/UserDetails";

const Stack = createNativeStackNavigator();

function App() {
  const [initalizing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if (initalizing) setInitializing(false);
  }
  useEffect(() =>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber
  }, []);
  
  if (initalizing) return null;

  if(!user){
    return(
      <Stack.Navigator>
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="IngredientList" component={IngredientList} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="FoodPage" component={FoodPage} />
        <Stack.Screen name="FoodList" component={FoodList} />
        <Stack.Screen name="Favorite" component={Favorite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>

  )
}
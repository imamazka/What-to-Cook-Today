//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IngredientList from './Page/IngredientList';
import ShoppingCart from './Page/ShoppingCart';
import Login from "./Page/Login";
import Register from "./Page/Register";
import FoodPage from './Page/FoodPage';
import FoodList from './Page/FoodList';
import Home from "./Page/Home";
import Favorite from './Page/Favorite';
import Main from "./Page/Main";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen name='IngredientList' component={IngredientList}/>
        <Stack.Screen name='ShoppingCart' component={ShoppingCart}/>
        <Stack.Screen name='FoodPage' component={FoodPage}/>
        <Stack.Screen name='FoodList' component={FoodList}/>
        <Stack.Screen name='Favorite' component={Favorite}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

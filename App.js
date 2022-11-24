import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import IngredientList from './Page/IngredientList';
import ShoppingCart from './Page/ShoppingCart';
import Login from "./Page/Login";
import Register from "./Page/Register";
import FoodPage from './Page/FoodPage';
import FoodList from './Page/FoodList';
import Home from "./Page/Home";
import Favorite from './Page/Favorite';
import Main from "./Page/Main";

export default function App() {
  return (
    <Favorite />
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

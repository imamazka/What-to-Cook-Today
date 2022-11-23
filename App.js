<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import IngredientList from "./Page/IngredientList";
import ShoppingCart from "./Page/ShoppingCart";
import Login from "./Page/Login";
import Register from "./Page/Register";
import FoodPage from "./Page/FoodPage";
import Home from "./Page/Home";

export default function App() {
  return <Home />;
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import IngredientList from './Page/IngredientList';
import ShoppingCart from './Page/ShoppingCart';
import Login from "./Page/Login";
import Register from "./Page/Register";
import FoodPage from './Page/FoodPage';
import FoodList1 from './Page/FoodList1';
import FoodList2 from './Page/FoodList2';

export default function App() {
  return (
    <FoodPage />
  );
>>>>>>> 1ae2fa051929cdbf4e0a62b0d3a246aa1888be94
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

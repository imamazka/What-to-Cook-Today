import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import IngredientList from './Page/IngredientList';
import ShoppingCart from './Page/ShoppingCart';
import Login from "./Page/Login";
import Register from "./Page/Register";
import FoodPage from './Page/FoodPage';

export default function App() {
  return (
    <ShoppingCart />
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

<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IngredientList from './Page/IngredientList';
import Login from './Page/Login';
import ShoppingCart from './Page/ShoppingCart';

export default function App() {
  return (
    <ShoppingCart />
  );
=======
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Page/Login";
import Register from "./Page/Register";

export default function App() {
  return <Register />;
>>>>>>> c97eba57e3b2ace9d0697256b93b4e63fb6c4bf2
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

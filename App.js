import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IngredientList from './Page/IngredientList';
import Login from './Page/Login';
import ShoppingCart from './Page/ShoppingCart';

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
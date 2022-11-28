import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";

const Home = ({navigation}) => {
  return (
    <View style={StyleSheet.container}>
      <View
        style={{
          width: 250,
          alignSelf: "center",
          marginTop: 22,
        }}>
        <Text
          style={{
            color: "#22CB65",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
          }}>
          What To Cook Today?
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={require("../assets/ingridient.jpg")}
          style={{
            width: 350,
            height: 350,
            borderRadius: 350 / 2,
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity style={styles.loginButton} activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ alignSelf: "center", marginTop: 15, flexDirection: "row" }}>
        <Text style={styles.signUpFoot}>Already have an account, </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Register')}>
          <Text
            style={[
              styles.signUpFoot,
              { color: "#0C40F9", textDecorationLine: "underline" },
            ]}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  loginButton: {
    width: 200,
    height: 60,
    backgroundColor: "#22CB65",
    borderRadius: 30,
    marginTop: 30,
    justifyContent: "center",
  },
  buttonText: {
    //fontFamily: 'NotoSans-Medium',
    color: "#FFF",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
  },
  signUpFoot: {
    fontSize: 13,
  },
});

export default Home;

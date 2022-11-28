import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 250,
          alignSelf: "center",
        }}>
        <Text
          style={{
            color: "#22CB65",
            fontSize: 42,
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
            width: 360,
            height: 360,
            borderRadius: 360 / 2,
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity style={styles.loginButton} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ alignSelf: "center", marginTop: 15, flexDirection: "row" }}>
        <Text style={styles.signUpFoot}>Already have an account, </Text>
        <TouchableOpacity activeOpacity={0.5}>
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
    height: 50,
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

import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";

const Home = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  return (
    <ImageBackground
      source={require("../assets/Home.png")}
      style={[
        StyleSheet.container,
        { width: width, height: height, justifyContent: "flex-end" },
      ]}>
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            alignSelf: "center",
            marginBottom: 20,
          }}>
          <Text
            style={{
              color: "white",
              fontSize: 45,
              fontWeight: "900",
              textAlign: "center",
            }}>
            What To Cook Today?
          </Text>
        </View>
        {/* <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={require("../assets/ingridient.jpg")}
          style={{
            width: 350,
            height: 350,
            borderRadius: 350 / 2,
            resizeMode: "cover",
          }}
        />
      </View> */}
        <View
          style={{
            alignSelf: "center",
            //backgroundColor: "red",
            flexDirection: "row",
          }}>
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ alignSelf: "center", marginTop: 15, flexDirection: "row" }}>
          <Text style={styles.signUpFoot}>Already have an account, </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Login")}>
            <Text
              style={[
                styles.signUpFoot,
                {
                  color: "#22CB65",
                  textDecorationLine: "underline",
                  fontWeight: "800",
                },
              ]}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
    height: 50,
    backgroundColor: "#22CB65",
    borderRadius: 30,
    marginHorizontal: 30,
    marginBottom: 35,
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    //fontFamily: 'NotoSans-Medium',
    color: "#FFF",
    textAlign: "center",
    fontSize: 21,
    fontWeight: "400",
    //fontFamily: "Poppins-Medium",
  },
  signUpFoot: {
    fontSize: 15,
    color: "white",
  },
});

export default Home;

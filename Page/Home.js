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
import {LinearGradient} from 'expo-linear-gradient';

const Home = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  return (
    <ImageBackground
      source={require("../assets/Background.jpg")}
      style={{ width: width, height: '100%', justifyContent: "flex-end" }}>
        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={{ height: '90%', width: '100%', justifyContent: 'flex-end' }}>
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
                marginBottom: 50
              }}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
      </LinearGradient>
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
});

export default Home;

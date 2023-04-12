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
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';

import colors from "../config/colors";

/**
 * Page shown to user when they first time open the app.
 * 
 * @param {navigation} navigation - navigation props to another screen 
 * 
 */

const Home = ({ navigation }) => {
  
  const { width, height } = useWindowDimensions();
  
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  else{
    return (
      <SafeAreaView>
        <StatusBar barStyle={"light-content"} backgroundColor={colors.black}>
          {" "}
        </StatusBar>
        <ImageBackground
          source={require("../assets/Background.jpg")}
          style={{ width: width, height: "100%", justifyContent: "flex-end" }}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
            style={{ height: "90%", width: "100%", justifyContent: 'space-between' }}>
            <Image 
              source={require("../assets/logo.png")}
              style={{ width: 250, height: 250, alignSelf: 'center', top: 32 }}>
            </Image>
            <View style={{ flexDirection: "row", alignSelf: 'flex-end', bottom: 30 }}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  loginButton: {
    height: 50,
    backgroundColor: colors.mainYellow,
    borderRadius: 30,
    marginHorizontal: 30,
    marginBottom: 35,
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    top: 2
  },
});

export default Home;

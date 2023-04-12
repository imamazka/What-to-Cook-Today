import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  StatusBar
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { firebase } from "../firebase";
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';

import colors from "../config/colors";

/**
 * Login page for user. If didn't have any account, can be redirected to register page
 * 
 * @param {password} password
 * @param {error} error
 * @param {...props} props
 * @param {navigation} navigation - navigation to another screen
 * 
 */

const InputText = ({ password, error, ...props }) => {
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={{ marginTop: 22, marginHorizontal: 30 }}>
      <View
        style={[
          Styles.inputText,
          {
            flexDirection: "row",
            alignItems: "center",
            paddingRight: password ? 47 : 20,
          },
        ]}>
        <TextInput
          secureTextEntry={hidePassword}
          style={{ flex: 1 }}
          {...props}
        />
        {password && (
          <Feather
            name={hidePassword ? "eye-off" : "eye"}
            size={20}
            color="grey"
            style={{ position: "absolute", right: 20 }}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
      {error && (
        <Text
          style={{ color: "red", fontSize: 12, marginLeft: 5, marginTop: 3 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const Login = ({ navigation }) => {

  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOnChange = (text, input) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleOnError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validate = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      setLoading(false);
      handleOnError("Your email or password incorrect", "email");
      handleOnError("Your email or password incorrect", "password");
      console.error(error);
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          backgroundColor: colors.white,
        }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>
          {" "}
        </StatusBar>
        <Spinner visible={loading} />
        <View style={{ backgroundColor: colors.white }}>
          <View style={{ alignItems: "center", bottom: 25 }}>
            <Text style={Styles.loginText}>LOGIN</Text>
          </View>
          <InputText
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            onChangeText={(text) => handleOnChange(text, "email")}
            error={errors.email}
            keyboardType="email-address"
          />
          <InputText
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            onChangeText={(text) => handleOnChange(text, "password")}
            error={errors.password}
            password
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={Styles.forgotPass}>forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <TouchableOpacity
              style={Styles.loginButton}
              activeOpacity={0.5}
              onPress={validate}>
              <Text style={Styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ alignSelf: "center", marginTop: 15, flexDirection: "row" }}>
            <Text style={Styles.signUpFoot}>Doesn't have any account? </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Register")}>
              <Text
                style={[
                  Styles.signUpFoot, {color: colors.mainYellow, textDecorationLine: "underline", fontWeight: "800"}
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <Text style={Styles.signUpFoot}> now</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const Styles = StyleSheet.create({
  loginText: {
    fontSize: 40,
    color: colors.mainYellow,
    fontFamily: 'Poppins_700Bold',
  },
  inputText: {
    backgroundColor: colors.inputShades,
    borderRadius: 30,
    height: 50,
    paddingLeft: 20,
    elevation: 6,
  },
  forgotPass: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    fontWeight: "500",
    marginTop: 10,
    marginRight: 40,
  },
  loginButton: {
    height: 50,
    backgroundColor: colors.mainYellow,
    borderRadius: 30,
    marginTop: 34,
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 30,
    alignContent: 'center'
  },
  buttonText: {
    fontFamily: 'Poppins_500Medium',
    color: colors.white,
    textAlign: "center",
    fontSize: 20,
    top: 2
  },
  signUpFoot: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    top: 10
  },
});

export default Login;

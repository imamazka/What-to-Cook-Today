import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
  StatusBar
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { firebase } from "../firebase";
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';

import colors from "../config/colors";

/**
 * Register page if user did not have any account
 * 
 * @param {password} param0 
 * @param {error} error
 * @param {...props} props
 * @param {navigation} navigation - navigation to another page
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

const Register = ({ navigation }) => {

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOnChange = (text, input) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleOnError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validate = async () => {
    let valid = true;
    Keyboard.dismiss();

    const emailRegistered = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", data.email)
      .get();
    const userNameRegistered = await firebase
      .firestore()
      .collection("users")
      .where("userName", "==", data.userName)
      .get();

    if (!emailRegistered.empty) {
      handleOnError("Your email already exist", "email");
      valid = false;
    }
    if (!userNameRegistered.empty) {
      handleOnError("Your user name already exist", "userName");
      valid = false;
    }
    if (data.password.length < 8 || data.confirmPassword.length < 8) {
      handleOnError(
        "Your password must contain at least 8 character",
        "password"
      );
      handleOnError(
        "Your password must contain at least 8 character",
        "confirmPassword"
      );
      valid = false;
    } else if (data.confirmPassword !== data.password) {
      handleOnError("Your password is not same", "confirmPassword");
      handleOnError("Your password is not same", "password");
      valid = false;
    }

    if (valid) inputValid();
  };

  const inputValid = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                userName: data.userName,
                email: data.email,
                phoneNumber: "",
                country: "",
                genre: "",
                address: "",
                imgProfile: null,
                favorite: [],
                ingredientItems: [],
                finishedItems: [],
              });
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
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
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          backgroundColor: colors.white,
        }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>
          {" "}
        </StatusBar>
        <Spinner visible={loading} />
        <View
          style={{
            backgroundColor: colors.white,
          }}>
          <View
            style={{
              alignItems: "center",
            }}>
            <Text style={[Styles.loginText]}>REGISTER</Text>
          </View>
          <InputText
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Username"
            onChangeText={(text) => handleOnChange(text, "userName")}
            error={errors.userName}
          />
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
            password
            error={errors.password}
          />
          <InputText
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirm Password"
            onChangeText={(text) => handleOnChange(text, "confirmPassword")}
            password
            error={errors.confirmPassword}
          />
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <TouchableOpacity
              style={Styles.loginButton}
              activeOpacity={0.7}
              onPress={validate}>
              <Text style={Styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              marginTop: 15,
              flexDirection: "row",
            }}>
            <Text style={Styles.signUpFoot}>Already have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}>
              <Text
                style={[
                  Styles.signUpFoot,
                  {
                    color: colors.mainYellow,
                    textDecorationLine: "underline",
                    fontWeight: "800",
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const Styles = StyleSheet.create({
  loginText: {
    fontSize: 45,
    color: colors.mainYellow,
    fontFamily: 'Poppins_700Bold',
    bottom: 30
  },
  inputText: {
    backgroundColor: colors.inputShades,
    borderRadius: 30,
    height: 50,
    paddingLeft: 20,
    elevation: 6,
  },
  loginButton: {
    height: 50,
    backgroundColor: colors.mainYellow,
    borderRadius: 30,
    marginTop: 60,
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 30,
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
  },
});

export default Register;

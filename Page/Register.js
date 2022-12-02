import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

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

  const validate = () => {
    let valid = true;
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
  console.log(data);

  const inputValid = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(data));
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleOnError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
      <Spinner visible={loading} />
      <View
        style={{
          backgroundColor: "#FFF",
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
        />
        <InputText
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          onChangeText={(text) => handleOnChange(text, "email")}
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
          <Text style={Styles.signUpFoot}>Already have an account,</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Login")}>
            <Text
              style={[
                Styles.signUpFoot,
                { color: "#0C40F9", textDecorationLine: "underline" },
              ]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  loginText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#22CB65",
    //fontFamily: 'NotoSans-Bold'
  },
  inputText: {
    backgroundColor: "#F6F6F6",
    borderRadius: 30,
    height: 50,
    paddingLeft: 20,
    //paddingRight: 20,
    elevation: 6,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#22CB65",
    borderRadius: 30,
    marginTop: 34,
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 30,
  },
  buttonText: {
    //fontFamily: 'NotoSans-Medium',
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  signUpFoot: {
    fontSize: 13,
  },
});

export default Register;

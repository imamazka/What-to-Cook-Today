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

const InputText = ({ password, error, ...props }) => {
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={{ marginTop: 22, marginHorizontal: 25 }}>
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
    name: "",
    password: "",
    confirmPassword: "",
    userNamse: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    if (data.password.length < 8 || data.confirmPassword.length < 8) {
      handleOnError(
        "Your password must contain at least 8 character",
        "password"
      );
      handleOnError(
        "Your password must contain at least 8 character",
        "confirmPassword"
      );
    }
    if (data.confirmPassword !== data.password) {
      handleOnError("Your password is not same", "confirmPassword");
      handleOnError("Your password is not same", "password");
    }
  };

  const handleOnChange = (text, input) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleOnError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <ScrollView vertical={true} showsVerticalScrollIndicator>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          marginTop: "25%",
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
        <View style={{ alignItems: "center" }}>
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
          <TouchableOpacity activeOpacity={0.5}>
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
    width: 180,
    height: 50,
    backgroundColor: "#22CB65",
    borderRadius: 30,
    marginTop: 34,
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

export default Register;
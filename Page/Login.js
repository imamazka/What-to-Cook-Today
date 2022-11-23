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
    </View>
  );
};

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (text, input) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          marginVertical: "33%",
        }}>
        <View style={{ alignItems: "center" }}>
          <Text style={Styles.loginText}>LOGIN</Text>
        </View>
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
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={Styles.forgotPass}>forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity style={Styles.loginButton} activeOpacity={0.5}>
            <Text style={Styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ alignSelf: "center", marginTop: 15, flexDirection: "row" }}>
          <Text style={Styles.signUpFoot}>Don't have an account,</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              style={[
                Styles.signUpFoot,
                { color: "#0C40F9", textDecorationLine: "underline" },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <Text style={Styles.signUpFoot}> Now</Text>
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
  forgotPass: {
    //fontFamily: 'NotoSans-Medium',
    fontSize: 12,
    marginTop: 20,
    marginRight: 40,
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

export default Login;

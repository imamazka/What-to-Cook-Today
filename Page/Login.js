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

const InputText = (props) => {
  return (
    <TextInput
      style={Styles.inputText}
      value={props.state}
      placeholder={props.placeholder}
      onChangeText={(text) => props.setState(text)}
      secureTextEntry={props.secure}
    />
  );
};

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  return (
    <ScrollView showsVerticalScrollIndicator="true">
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <View style={Styles.containerLogin}>
          <Text style={Styles.loginText}>LOGIN</Text>
        </View>
        <InputText
          state={email}
          placeholder="Email"
          setState={setEmail}
          secure={false}
        />
        <View style={{ marginTop: 20 }}>
          <InputText
            styles={Styles.inputText}
            state={password}
            placeholder="Password"
            setState={setPassword}
            secure={visiblePassword ? false : true}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 40, top: 15, zIndex: 1 }}
            onPress={() => {
              setShowPassword(!showPassword);
              setVisiblePassword(!visiblePassword);
            }}
            activeOpacity={0.9}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="grey"
            />
          </TouchableOpacity>
        </View>
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
  containerLogin: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 150,
    marginBottom: 22,
  },
  loginText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#22CB65",
    //fontFamily: 'NotoSans-Bold'
  },
  inputText: {
    backgroundColor: "#F6F6F6",
    //marginTop: 22,
    marginHorizontal: 25,
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 20,
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

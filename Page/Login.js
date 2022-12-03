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
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../firebase";

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
    </View>
  );
};

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (text, input) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };
  console.log(data);

  const valid = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      } catch (error) {
        alert(error.message);
      }
    }, 3000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
      }}>
      <Spinner visible={loading} />
      <View style={{ backgroundColor: "#FFF" }}>
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
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <TouchableOpacity
            style={Styles.loginButton}
            activeOpacity={0.5}
            onPress={valid}>
            <Text style={Styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ alignSelf: "center", marginTop: 15, flexDirection: "row" }}>
          <Text style={Styles.signUpFoot}>Don't have an account, </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Register")}>
            <Text
              style={[
                Styles.signUpFoot,
                {
                  color: "#0C40F9",
                  textDecorationLine: "underline",
                  fontWeight: "800",
                },
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
    fontWeight: "500",
    marginTop: 10,
    marginRight: 40,
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
    fontWeight: "500",
  },
});

export default Login;

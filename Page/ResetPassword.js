import { Feather } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { firebase } from "../firebase";
const InputText = ({ password, error, ...props }) => {
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={{ marginTop: 22 }}>
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

const ResetPassword = ({ navigation }) => {
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const currentUser = firebase.auth().currentUser;

  const handleOnError = (errorMessage, input) => {
    setErrors((...prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleOnChange = (text, input) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };

  console.log(currentUser);

  const validate = () => {
    if (data.confirmPassword != data.password) {
      handleOnError("Your password is not same", "password");
      handleOnError("Your password is not same", "confirmPassword");
    } else if (currentUser) {
      currentUser
        .updatePassword(data.password)
        .then(() =>
          Alert.alert(
            "Password Updated",
            "Your password has been changed successfully. Use your new password to log in"
          )
        )
        .catch((error) => Alert.alert("Error", "Something went wrong!!!"));
    } else {
      Alert.alert("Error", "Please enter a new password");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      <View style={{ marginTop: 25 }}>
        <TouchableOpacity onPress={() => navigation.navigate("UserDetails")}>
          <Feather name="arrow-left" size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Icon name="lock" size={200} />
        <Text style={{ fontSize: 15 }}>Please enter your new password</Text>
      </View>
      <InputText
        placeholder="New password"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => handleOnChange(text, "password")}
        password
        error={errors.password}
      />
      <InputText
        placeholder="Confirm password"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => handleOnChange(text, "confirmPassword")}
        password
        error={errors.confirmPassword}
      />
      <View style={{ alignSelf: "center", flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "#22CB65",
            borderRadius: 30,
            justifyContent: "center",
            marginTop: 20,
            flex: 1,
          }}
          activeOpacity={0.5}
          onPress={validate}>
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
            }}>
            Create Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  inputText: {
    backgroundColor: "#F6F6F6",
    borderRadius: 30,
    height: 50,
    paddingLeft: 20,
    //paddingRight: 20,
    elevation: 6,
  },
});

export default ResetPassword;

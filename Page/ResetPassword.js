import { Feather } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const [data, setData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const currentUser = firebase.auth().currentUser;
  const emailCred = firebase.auth.EmailAuthProvider.credential(
    currentUser.email,
    data.currentPassword
  );

  const handleOnChange = (text, input) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };

  const validate = () => {
    if (data.confirmPassword != data.password) {
      Alert.alert(
        "Error",
        "Your new password and confirm password are not same"
      );
    } else if (data.password == data.currentPassword) {
      Alert.alert(
        "Error",
        "Your new password must be different with your current password"
      );
    } else {
      firebase
        .auth()
        .currentUser.reauthenticateWithCredential(emailCred)
        .then(() => {
          currentUser.updatePassword(data.password);
          Alert.alert(
            "Password Updated!",
            "Your password has been changed successfully. Use your new password to log in."
          );
          navigation.navigate("UserDetails");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ }}>
        <View style={{ marginTop: 25, marginLeft: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("UserDetails")}>
            <Feather name="arrow-left" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 10 }}>
          <Icon name="lock" size={200} />
          <Text style={{ fontSize: 15 }}>Please enter your new password</Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <InputText
            placeholder="Current password"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => handleOnChange(text, "currentPassword")}
            password
            error={errors.currentPassword}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <InputText
            placeholder="New password"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => handleOnChange(text, "password")}
            password
            error={errors.password}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <InputText
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => handleOnChange(text, "confirmPassword")}
            password
            error={errors.confirmPassword}
          />
        </View>
        <View style={{ alignSelf: "center", flexDirection: "row", marginHorizontal: 20 }}>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "#22CB65",
              borderRadius: 30,
              justifyContent: "center",
              marginVertical: 50,
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
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  inputText: {
    backgroundColor: "#F6F6F6",
    borderRadius: 30,
    height: 50,
    paddingLeft: 20,
    //paddingRight: 20,
    elevation: 5,
  },
});

export default ResetPassword;

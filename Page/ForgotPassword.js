import { Feather } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import colors from "../config/colors";
import { firebase } from "../firebase";

const InputText = ({ error, ...props }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 20,
          backgroundColor: "#F6F6F6",
          borderRadius: 30,
          height: 50,
          paddingLeft: 20,
          //paddingRight: 20,
          elevation: 6,
        }}>
        <TextInput style={{ flex: 1 }} {...props} />
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

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((data) => {
        data.docs.forEach((datas) => {
          setUser(datas.data());
        });
      });
  };

  const handleOnError = (errorMessage, error) => {
    setErrors((...prevState) => ({ ...prevState, [error]: errorMessage }));
  };

  console.log(user);

  const validate = () => {
    let valid = true;

    if (email != user.email) {
      handleOnError("Your email incorrect", "email");
      valid = false;
    }

    if (valid) resetPassword();
  };

  const resetPassword = () => {
    navigation.navigate("ResetPassword");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      <View style={{ marginTop: 25 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Feather name="arrow-left" size={30} />
        </TouchableOpacity>
      </View>
      <Text
        style={{ color: colors.mainGreen, fontSize: 50, fontWeight: "bold" }}>
        Forget Password
      </Text>
      <Text style={{ fontSize: 15 }}>
        Please enter your email to reset your password
      </Text>
      <InputText
        placeholder="Input your email"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        error={errors.email}
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
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

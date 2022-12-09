import { Feather } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
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
  const [email, setEmail] = useState("");
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loadEmails = async () => {
    try {
      setLoading(true);
      const usersRef = firebase.firestore().collection("users");
      const querySnapshot = await usersRef.get();
      const users = querySnapshot.docs.map((doc) => doc.data());
      const emails = users.map((user) => user.email);
      setUser(emails);
    } catch (error) {
      Alert.alert("Error", "something went wrong!!!");
    }
    setLoading(false);
  };

  const filteredEmails = user.filter((user) => user.includes(email));

  const handleOnError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleSubmit = async () => {
    await loadEmails();

    if (filteredEmails.length === 0) {
      handleOnError("Your email incorrect", "email");
    } else {
      firebase.auth().sendPasswordResetEmail(email);
      Alert.alert("Success", "Check your email to reset your password");
    }
  };

  console.log(user);

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      {loading && <ActivityIndicator />}
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
          onPress={handleSubmit}>
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

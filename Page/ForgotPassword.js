import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { firebase } from "../firebase";
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';

import colors from "../config/colors";

/**
 * Forgot password page.
 * 
 * @param {error} error
 * @param {...props} props
 * @param {navigation} navigation - Navigation to another page.
 * 
 */

const InputText = ({ error, ...props }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 20,
          backgroundColor: colors.inputShades,
          borderRadius: 30,
          height: 50,
          paddingLeft: 20,
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

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white, paddingHorizontal: 20, justifyContent: 'center'}}>
        {loading && <ActivityIndicator />}
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>
          {" "}
        </StatusBar>
        <View style={{ justifyContent:'center' }}>
          <Text
            style={{ color: colors.mainYellow, fontFamily: 'Poppins_700Bold', fontSize: 38, alignSelf: 'center' }}>
            Forgot Password
          </Text>
          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, paddingTop: 65, paddingBottom: 5, alignSelf: 'center' }}>
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
                backgroundColor: colors.mainYellow,
                borderRadius: 30,
                justifyContent: "center",
                marginTop: 70,
                flex: 1,
              }}
              activeOpacity={0.5}
              onPress={handleSubmit}>
              <Text
                style={{
                  color: colors.white,
                  textAlign: "center",
                  fontFamily: 'Poppins_500Medium',
                  fontSize: 20,
                  top: 2
                }}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

export default ForgotPassword;

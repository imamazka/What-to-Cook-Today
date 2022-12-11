import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect, createRef } from "react";
import { ScrollView, TextInput, Text, Alert } from "react-native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import countries from "../assets/dummy data/countries";
import Spinner from "react-native-loading-spinner-overlay";

const AccountInfo = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        if (data.exists) {
          setData(data.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const phoneNumberFormat = (number) => {
    let text = "";
    let cleaned = ("" + number).replace(/\D/g, "");
    for (var i = 0; i < cleaned.length; i++) {
      if (i == 0) text = "";
      else if (i % 4 == 0) text = text + "-";
      text = text + cleaned[i];
    }
    setData({ ...data, phoneNumber: text });
  };

  const handleUpdate = () => {
    setLoading(true);
    try {
      setLoading(false);
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          userName: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          country: data.country,
          genre: data.genre,
          address: data.address,
        })
        .then(() => {
          Alert.alert(
            "Profile Updated!",
            "Your profile has been updated successfully."
          );
        })
        .catch((error) => Alert.alert("Error", error.message));
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  console.log(data);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Spinner visible={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20 }}>
          <View style={{ marginTop: 25 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetails")}>
              <Ionicons name="arrow-back-outline" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
              <View
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                }}>
                <ImageBackground
                  source={require("../assets/defaultProfilePicture.png")}
                  style={{ width: 140, height: 140 }}
                  imageStyle={{ borderRadius: 70 }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Ionicons
                      name="camera"
                      size={35}
                      color="white"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "white",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <View style={style.inputContainer}>
              <Ionicons name="person-outline" size={25} />
              <TextInput
                value={data ? data.userName : ""}
                placeholder="Username"
                placeholderTextColor="#aaa"
                autoCorrect={false}
                onChangeText={(text) => setData({ ...data, userName: text })}
                style={style.input}
              />
            </View>
            <View style={style.inputContainer}>
              <Ionicons name="mail-outline" size={25} />
              <TextInput
                value={data ? data.email : ""}
                placeholder="Email"
                placeholderTextColor="#aaa"
                autoCorrect={false}
                onChangeText={(text) => setData({ ...data, email: text })}
                style={style.input}
              />
            </View>
            <View style={style.inputContainer}>
              <Ionicons name="call-outline" size={25} />
              <TextInput
                value={data ? data.phoneNumber : ""}
                placeholder="Phone Number"
                placeholderTextColor="#aaa"
                autoCorrect={false}
                onChangeText={(text) => phoneNumberFormat(text)}
                keyboardType="number-pad"
                style={style.input}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  marginRight: 5,
                }}>
                <Picker
                  placeholder="Select a country"
                  selectedValue={data ? data.country : ""}
                  style={{ width: "50%", flexGrow: 1 }}
                  onValueChange={(itemValue) =>
                    setData({ ...data, country: itemValue })
                  }>
                  <Picker.Item
                    label="Select a country"
                    enabled={false}
                    color="#aaa"
                  />
                  {Object.keys(countries).map((code) => (
                    <Picker.Item
                      label={countries[code].country}
                      value={code}
                      key={code}
                    />
                  ))}
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                <Picker
                  placeholder="Select a gender"
                  selectedValue={data ? data.genre : "Female"}
                  style={{ width: "50%", flexGrow: 1 }}
                  onValueChange={(itemValue, itemIndex) =>
                    setData({ ...data, genre: itemValue })
                  }>
                  <Picker.Item
                    label="Select a gender"
                    enabled={false}
                    color="#aaa"
                  />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Male" value="Male" />
                </Picker>
              </View>
            </View>
            <View style={style.inputContainer}>
              <Ionicons name="home-outline" size={25} />
              <TextInput
                value={data ? data.address : ""}
                placeholder="Address"
                placeholderTextColor="#aaa"
                autoCorrect={false}
                multiline={true}
                onChangeText={(text) => setData({ ...data, address: text })}
                style={[style.input, {}]}
              />
            </View>
          </View>
          <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: "#22CB65",
                borderRadius: 30,
                justifyContent: "center",
                marginVertical: 20,
                flex: 1,
              }}
              activeOpacity={0.6}
              onPress={handleUpdate}>
              <Text
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "500",
                }}>
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountInfo;

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  input: { flex: 1, paddingLeft: 15 },
});

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import CountryPicker from "react-native-country-picker-modal";

const AccountInfo = () => {
  const [data, setData] = useState({});
  const [countries, setCountries] = useState([]);

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        if (data.exists) {
          console.log("User Data", data.data());
          setData(data.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fba73a17bamsh1ac99d77d642644p10ed19jsnb1cfd28ce40a",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        console.log("success");
      })
      .catch((err) => console.error(err));
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <ImageBackground
                source={require("../assets/defaultProfilePicture.png")}
                style={{ width: 120, height: 120 }}
                imageStyle={{ borderRadius: 60 }}>
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
              placeholderTextColor="#666666"
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
              placeholderTextColor="#666666"
              autoCorrect={false}
              onChangeText={(text) => setData({ ...data, email: text })}
              style={style.input}
            />
          </View>
          <View style={style.inputContainer}>
            <Ionicons name="call" size={25} />
            <TextInput
              value={data ? data.phoneNumber : ""}
              placeholder="Phone Number"
              placeholderTextColor="#666666"
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
              }}>
              <Picker
                placeholder="Select a country"
                selectedValue={data ? data.country : ""}
                style={{ width: "50%", flexGrow: 1 }}
                onValueChange={(itemValue) =>
                  setData({ ...data, country: itemValue })
                }>
                {countries && console.log(countries)}
                {/* {countries.map((country) => (
                  <Picker.Item
                    key={country.code}
                    label={country.name}
                    value={country.name}
                  />
                ))} */}
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
                onValueChange={(itemValue) =>
                  setData({ ...data, genre: itemValue })
                }>
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Male" value="Male" />
              </Picker>
            </View>
          </View>
        </View>
      </View>
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

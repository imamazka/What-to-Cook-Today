import "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';

import countries from "../assets/data/countries";
import colors from "../config/colors";

/**
 * User account info page.
 *
 * @param {navigation} navigation - Navigation to another page.
 *
 */

const AccountInfo = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

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

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const takePhotoFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [2, 2],
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const choosePhotoFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 2],
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    try {
      await firebase.storage().ref(filename).putFile(uploadUri);

      const url = await firebase.storage().ref(filename).getDownloadURL();

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && data.imgProfile) {
      imgUrl = data.imgProfile;
    }
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
          imgProfile: imgUrl,
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

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          opacity: isOpen ? 0.5 : 1,
          backgroundColor: isOpen ? "lightgrey" : "white",
        }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>
          {" "}
        </StatusBar>
        <Spinner visible={loading} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Modal
            onBackdropPress={() => setIsOpen(false)}
            onBackButtonPress={() => setIsOpen(false)}
            isVisible={isOpen}
            swipeDirection="down"
            onSwipeComplete={toggleModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={600}
            animationOutTiming={500}
            backdropTransitionInTiming={700}
            backdropTransitionOutTiming={500}
            style={style.modal}>
            <View style={style.modalContent}>
              <View style={style.center}>
                <View style={style.barIcon} />
                <View style={{ alignItems: "center", marginVertical: 15 }}>
                  <Text style={style.panelTitle}>Upload Photo</Text>
                  <Text style={style.panelSubtitle}>
                    Choose Your Profile Picture
                  </Text>
                </View>
                <TouchableOpacity
                  style={style.panelButton}
                  onPress={takePhotoFromCamera}>
                  <Text style={style.panelButtonTitle}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.panelButton}
                  onPress={choosePhotoFromLibrary}>
                  <Text style={style.panelButtonTitle}>Choose From Library</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                marginBottom: 20,
                justifyContent: "space-between",
              }}>
              <TouchableOpacity
                style={style.backButton}
                onPress={() => navigation.navigate("UserDetails")}>
                <Feather name='arrow-left' size={24} color={colors.topBarItem}></Feather>
              </TouchableOpacity>
              <Text style={style.sectionText}>Account Info</Text>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={isOpen ? "lightgrey" : "white"}
                style={{ opacity: isOpen ? 0.5 : 1 }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <TouchableOpacity onPress={toggleModal} activeOpacity={0.6}>
                <View
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 70,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}>
                  {image != null ? (
                    <ImageBackground
                      source={{ uri: image ? image : data.imgProfile }}
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
                  ) : (
                    <ImageBackground
                      source={require("../assets/defaultProfile.png")}
                      style={{ width: 140, height: 140 }}
                      imageStyle={{ borderRadius: 70 }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                      </View>
                    </ImageBackground>
                  )}
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
                  editable={false}
                  onChangeText={(text) => setData({ ...data, email: text })}
                  style={[style.input, { color: "black" }]}
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
                    borderColor: '#9e9e9e',
                    borderRadius: 8,
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
                    borderColor: '#9e9e9e',
                    borderRadius: 8,
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
                  backgroundColor: colors.mainYellow,
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
                    fontFamily: 'Poppins_500Medium',
                    top: 2
                  }}>
                  Update Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default AccountInfo;

const style = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    minHeight: 250,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "grey",
    borderRadius: 3,
  },
  text: {
    color: "black",
    fontSize: 24,
    marginTop: 100,
  },
  panelTitle: {
    fontSize: 27,
    fontWeight: "bold",
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  panelButton: {
    padding: 13,
    borderRadius: 40,
    backgroundColor: colors.mainYellow,
    alignItems: "center",
    marginVertical: 7,
    width: "100%",
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 19,
    color: colors.topBarItem,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#9e9e9e',
    padding: 10,
  },
  input: { 
    flex: 1, 
    paddingLeft: 15 
  },
});

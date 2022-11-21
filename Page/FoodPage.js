import React from 'react';
import { Text, Image, ImageBackground, StyleSheet, View, StatusBar, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const { height } = Dimensions.get("window");

function FoodPage(props) {
    return (
        <ScrollView>
            <View>
                <ImageBackground style={styles.image} source={require("../assets/FoodPage.jpg")}>
                    <View style={styles.topBar}></View>
                </ImageBackground>
                <View>
                    <View>
                        <View>
                            <Text>Ayam Bakar</Text>
                        </View>
                        <View>
                            <Text>
                                
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height: height / 2.5,
    },
    topBar: {
        width: '100%',
        height: 50,
        backgroundColor: '#22CB65'
    },
})

export default FoodPage;
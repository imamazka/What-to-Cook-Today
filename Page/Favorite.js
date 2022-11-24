import React from 'react';
import { StatusBar, View, StyleSheet, ScrollView, Text } from 'react-native';

import colors from '../config/colors';
import Food from '../components/Food';

function Favorite(props) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topBar}></View>
                <View style={styles.wrapper}>
                    <Text style={styles.sectionText}>Favorites</Text>

                    <Food image={require('../assets/Food1.jpg')} name={'Food 1'} rating={'4.8'} ingredient={'1 egg  |  1 oatmeal  |  1 tomato'}></Food>
                    <Food image={require('../assets/Food2.jpg')} name={'Food 2'} rating={'4.8'} ingredient={'1 egg  |  1 oatmeal  |  1 tomato'}></Food>
                    <Food image={require('../assets/Food3.jpg')} name={'Food 3'} rating={'4.8'} ingredient={'1 egg  |  1 oatmeal  |  1 tomato'}></Food>
                    <Food image={require('../assets/Food4.jpg')} name={'Food 4'} rating={'4.8'} ingredient={'1 egg  |  1 oatmeal  |  1 tomato'}></Food>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
    },
    topBar: {
        width: '100%',
        height: 50,
        backgroundColor: colors.mainGreen
    },
    wrapper: {
        padding: 20,
    },
    sectionText: {
        fontSize: 22,
        fontWeight: "bold",
        padding: 10,
        paddingTop: 0,
        paddingBottom: 15,
        color: colors.black
    },
})

export default Favorite;
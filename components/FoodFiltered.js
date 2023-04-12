import React, { useEffect, useState } from 'react';
import { 
	View, 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	Dimensions, 
	ImageBackground 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../firebase";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_700Bold, Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';
import { Poppins_300Light } from '@expo-google-fonts/poppins';
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import colors from '../config/colors';

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width/2 - 10 * 2.3;

/**
 * Food component from FoodList page.
 * 
 * @param {props} props - Props from FoodList page.
 * 
 */

function FoodFiltered(props) {
		
		const navigation = useNavigation();               // navigation to another page.
		const [selected, setSelected] = useState(false);    // add to favorite state to change button color.

		// change favorite button color if already favorited trigger.
		useEffect(() => {
			if(props.favorite!=undefined){
				if(props.favorite.includes(props.foodId)){
					setSelected(true);
				}
			}
		}, []);

		// food favorite handler to user database.
		function handleFavorite(){
			if(selected==false){
				setSelected(!selected);
				firebase
					.firestore()
					.collection("users")
					.doc(firebase.auth().currentUser.uid)
					.update({
							favorites: firebase.firestore.FieldValue.arrayUnion(props.foodId)
					})  
					console.log("add food ID: "+ props.foodId +" to database");
			}
			else{
				setSelected(!selected);
				firebase
					.firestore()
					.collection("users")
					.doc(firebase.auth().currentUser.uid)
					.update({
							favorites: firebase.firestore.FieldValue.arrayRemove(props.foodId)
					})
					console.log("remove food ID: "+ props.foodId +" from database");
			} 
		};

		let [fontsLoaded] = useFonts({
			Inter_700Bold,
			Inter_500Medium,
			Inter_400Regular,
			Poppins_300Light
		});

		if (!fontsLoaded) {
			return null;
		}
		
		else {
			return (
				<TouchableOpacity style={styles.itemWrapper} onPress={() => navigation.navigate('FoodPage', {foodId: props.foodId})}>
					<ImageBackground style={styles.itemImage} source={{ uri: props.imageUri }}>
						<LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.65)']} style={styles.bottomImage}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<View style={styles.infoPadding}>
									<Ionicons name='heart' size={16} color={colors.white}></Ionicons>
									<Text style={{ fontFamily: 'Poppins_600SemiBold', marginLeft: 4, fontSize: 12, color: colors.white, top: 1 }}>{props.rating}</Text>
								</View>
								<TouchableOpacity style={styles.infoPadding} onPress={handleFavorite}>
									<Ionicons name={selected ? 'bookmark' : 'bookmark-outline'} size={22} color={selected ? colors.mainYellow : colors.white}></Ionicons>
								</TouchableOpacity>
							</View>
							<Text style={styles.itemName}>{props.name}</Text>
						</LinearGradient>
					</ImageBackground>
						
					<View style={styles.infoWrapper}>
						<View style={{flexDirection: 'row'}}>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{props.ingredients.slice(0, 3).map(item => (
								<View style={{flexDirection: 'row', alignItems: 'center'}} key={item.name}>
									<Text style={{ fontFamily: 'Poppins_300Light', color: '#3A3A3B' }}>{item.name}</Text>
									<View style={styles.divider}/>
								</View>))
								}
							<Text style={{ fontFamily: 'Poppins_300Light', color: '#3A3A3B' }}>etc.</Text>
						</View>
					</View>

					<View style={styles.info}>
						<FontAwesome name='check' size={22} color='#23c552'></FontAwesome>
						<Text style={styles.infoText}>{props.owned} Ingredients</Text>
						<FontAwesome name='times' size={22} color='#f84f31'></FontAwesome>
						<Text style={styles.infoText}>{props.missing} Ingredients</Text>
					</View>
					</View>
				</TouchableOpacity>
			);
		}
}

const styles = StyleSheet.create({
		itemWrapper: {
				width: '100%',
				marginBottom: 20,
				backgroundColor: colors.white,
				borderRadius: 15,
				paddingBottom: 10,
				shadowColor: colors.black,
				elevation: 9,
		},
		itemImage: {
				width: '100%',
				height: ITEM_WIDTH,
				resizeMode: 'cover',
				borderTopLeftRadius: 15,
				borderTopRightRadius: 15,
				overflow: 'hidden',
		},
		bottomImage: {
				height : '100%', 
				width : '100%',
				justifyContent: 'space-between',
				paddingHorizontal: 12,
				paddingBottom: 10,
		},
		itemName: {
				fontFamily: 'Inter_700Bold',
				fontSize: 18,
				textTransform: 'capitalize',
				color: colors.white,
		},
		infoPadding: {
			backgroundColor: 'rgba(48, 48, 48, 0.4)',
			top: 10,
			borderRadius: 8,
			paddingHorizontal: 8,
			paddingVertical: 4,
			flexDirection: 'row',
			alignItems: 'center'
		},
		bookmark: {
				position: 'absolute',
				top: 13,
				right: 13,
				backgroundColor: 'rgba(48, 48, 48, 0.4)',
				borderRadius: 5,
				paddingVertical: 3,
				paddingHorizontal: 4
		},
		infoWrapper: {
				paddingHorizontal: 15,
				paddingTop: 9,
		},
		divider: {
				height: 14, 
				width: 2.35, 
				backgroundColor: colors.mainYellow, 
				marginHorizontal: 7, 
				borderRadius: 5,
				bottom: 1
		},
		info: {
				flexDirection: 'row',
				marginTop: 5,
				alignItems: 'center',
		},
		infoText: {
				fontFamily: 'Inter_400Regular',
				fontSize: 14.5,
				marginLeft: 3,
				marginRight: 15
		}
})

export default FoodFiltered;
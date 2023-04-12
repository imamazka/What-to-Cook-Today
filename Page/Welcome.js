import React, { useEffect, useState, useRef } from 'react';
import { 
	ScrollView,
	StatusBar,
	SafeAreaView, 
	StyleSheet,
	useWindowDimensions,
	TextInput,
	Keyboard,
	Image,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { firebase } from "../firebase";
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_800ExtraBold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';

import mealTypes from "../assets/data/meal_types";
import RandomRecipes from '../components/RandomRecipes';
import TypeRecipes from '../components/TypeRecipes';
import colors from '../config/colors';

/**
 * Page shown after welcome page.
 * Used to show random recipes, search by name, and search by category.
 * 
 * @param {navigation} navigation - Navigation to another page
 * 
 */

const Welcome = ({ navigation }) => {

	const { width, height } = useWindowDimensions();

	const scrollRef = useRef();	// scroll position attribute

	const [searchQuery, setSearchQuery] = useState("");		// search recipe query.
	const [type, setType] = useState("main course"); 			// selected recipe type.
	const [randomList, setRandomList] = useState([]); 		// list of random foods retrieved from the web api
	const [typeList, setTypeList] = useState([]);					// list of type-based foods retrieved from the web api.
	const [searchBar, setSearchBar] = useState(false);		// hide / show search bar.
	const [favorite, setFavorite] = useState([]); 				// user favorited ids list.
	const [apiKey, setData] = useState(""); 							// key needed to retrieve food from API.
	const [selectedId, setSelectedId] = useState(1);			// current selected recipe type.

	// 2 types of request url based on 2 type of search.
	const urlRandom = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
	const urlFilter = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}&addRecipeInformation=true&number=10`;

	// get favorited ids and and list of foods when page load trigger.
  useEffect(() => {
    getApiKey();
  });

  useEffect(() => {
    getFavorite();
    getRandomList();
		getTypeList();
  }, [apiKey]);

  //get api key from database
  const getApiKey = () => {
    firebase
    .firestore()
    .collection("api")
    .doc("apiKeys")
    .get()
    .then((data) => {
      setData(data.data().key);
    });
  }

	// get favorited ids from database.
  const getFavorite = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        setFavorite(data.data().favorites);
      });
  };

	// get random list of foods from web api.
  const getRandomList = async () => {
    getFavorite();
    try {
      const response = await fetch(urlRandom);
      const json = await response.json();
      setRandomList(json.recipes);
      console.log("get random fetched");
    } catch (error) {
      console.error(error);
    }
  };

	// get type-based list of foods from web api when page first load.
	const getTypeList = async () => {
    try {
      const response = await fetch(urlFilter);
      const json = await response.json();
      setTypeList(json.results);
      console.log('get type list fetched');
    } catch (error) {
      console.error(error);
    }
	}

	// navigate to other page if user search recipe name.
	function submitSearch() {
    Keyboard.dismiss();
    console.log(searchQuery);
		navigation.navigate("Main", {prevSearch: searchQuery, prevType: type, method: 'search', typeId: -1});
  };

	// get type-based list of foods from web api.
	const submitType = async (idx, seachType) => {
		setSelectedId(idx);
		setType(seachType);
		console.log(type);
		try {
      const response = await fetch(urlFilter);
      const json = await response.json();
      setTypeList(json.results);
			console.log('submit type fetched');
			scrollRef.current?.scrollTo({ y: 0, animated: true });
    } catch (error) {
      console.error(error);
    }
	}

	let [fontsLoaded] = useFonts({
		Poppins_800ExtraBold,
    Poppins_600SemiBold,
		Poppins_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

	else {
		return(
				<SafeAreaView style={styles.container}>
					<StatusBar barStyle={"dark-content"} backgroundColor={colors.white}>{" "}</StatusBar>
					<ScrollView>
						<View style={styles.wrapper}>

							<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
								<View style={{maxWidth: '70%'}}>
									<Text style={styles.title}>Find best recipes for cooking</Text>
								</View>
								<View style={{flexDirection: 'row'}}>
									{searchBar ? (<View/>) : (
									<TouchableOpacity style={{paddingHorizontal: 7, paddingVertical: 10}} onPress={() => setSearchBar(true)}>
										<Feather name='search' size={25} color={colors.mainYellow}/>
									</TouchableOpacity>
									)}
									<TouchableOpacity style={{paddingHorizontal: 7, paddingVertical: 10}} onPress={() => navigation.navigate('Favorite')}>
										<Feather name='bookmark' size={25} color={colors.mainYellow}/>
									</TouchableOpacity>
								</View>
							</View>

							{searchBar ? (
								<View style={{height: 46, borderColor: '#d9d9d9', borderWidth: 1, borderRadius: 10, marginTop: 20, flexDirection: 'row'}}>
									<Ionicons name='search' size={20} color={colors.topBarItem} style={{alignSelf: 'center', marginLeft: 16}}/>
									<TextInput
										style={{ flex: 1, marginLeft: 16, fontFamily: 'Poppins_400Regular', fontSize: 14, top: 1.5 }}
										blurOnSubmit={false}
										placeholder="Search Recipes"
										placeholderTextColor="#c1c1c1"
										value={searchQuery}
										onChangeText={(text) => setSearchQuery(text)}
										onSubmitEditing={submitSearch}/>
									{searchQuery && (
										<TouchableOpacity onPress={() => setSearchQuery("")} style={{flexDirection: 'row'}}>
											<Ionicons name="close" size={20} color={colors.topBarItem} style={{alignSelf: 'center', marginRight: 10}}/>
										</TouchableOpacity>)
									}
								</View>) : (<View/>)
							}

							<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 5}}>
								<Text style={styles.section}>Discover</Text>
								<TouchableOpacity 
								style={{flexDirection: 'row', right: 4, alignSelf: 'center', top: 1}} 
								onPress={() => navigation.navigate("Main", {prevSearch: searchQuery, prevType: type, method: 'random', typeId: -1})}>
									<Text style={styles.child}>See all</Text>
									<Feather name='arrow-right' size={20} color={colors.mainYellow} style={{left: 4}}></Feather>
								</TouchableOpacity>
							</View>
						</View>
						
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
							{randomList == null || randomList.length == 0 ? (
								<View style={{marginLeft: width/2-25}}>
									<Text>Loading ...</Text>
								</View>
							) : (
								randomList.map((item, index) => (
									<RandomRecipes
										key={item.id}
										index={index}
										foodId={item.id}
										imageUri={item.image}
										name={item.title}
										type={item.dishTypes[0]}
										likes={item.aggregateLikes}
										time={item.readyInMinutes}
										favorite={favorite}/>
								))
							)}
						</ScrollView>

						<View style={{ marginTop: 30, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={styles.section}>Category</Text>
						</View>
						
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 5}}>
							{mealTypes.map((types) => {
								const backgroundColor = types.id === selectedId ? colors.mainYellow : colors.white;
								const color = types.id === selectedId ? colors.white : '#FFBC49';
								const marginLeft = types.id === 1 ? 20 : 0;
								return(
									<TouchableOpacity
										style={{
											marginLeft: marginLeft,
											marginRight: 11,
											backgroundColor: backgroundColor,
											alignSelf: "center",
											paddingHorizontal: 12,
											paddingVertical: 8,
											borderRadius: 10}}
										key={types.id}
										onPress={() => submitType(types.id, types.value)}> 
										<Text style={{
											color: color,
											fontFamily: 'Poppins_600SemiBold',
											fontSize: 14,
											textTransform: "capitalize",
											}}>{types.value}</Text>
									</TouchableOpacity>
								)}
							)}
						</ScrollView>

						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 15}} ref={scrollRef}>
							{typeList == null || typeList.length == 0 ? (
								<View style={{marginLeft: width/2-25}}>
									<Text>Loading ...</Text>
								</View>
							) : (
								typeList.map((item, index) => (
									<TypeRecipes
										key={item.id}
										index={index}
										foodId={item.id}
										imageUri={item.image}
										name={item.title}
										type={item.dishTypes[0]}
										likes={item.aggregateLikes}
										time={item.readyInMinutes}/>
								))
							)}
							{typeList == null || typeList.length == 0 ? (<View></View>) : (
								<TouchableOpacity 
									style={{width: 75, height: 75, marginRight: 20, borderRadius: 100, marginTop: 30}} 
									onPress={() => navigation.navigate("Main", {prevSearch: searchQuery, prevType: type, method: 'type', selectedTypeId: selectedId})}>
									<Ionicons name='chevron-forward' size={50} color={colors.mainYellow}style={{alignSelf: 'center', marginTop: 11}}></Ionicons>
								</TouchableOpacity>)
							}
						</ScrollView>

						<View style={styles.wrapper}>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
								<Text style={styles.section}>Search based on your ingredient</Text>
								<TouchableOpacity style={{flexDirection: 'row', right: 4, top: 7}} onPress={() => navigation.navigate('IngredientList')}>
									<Text style={styles.child}>Try</Text>
									<Feather name='arrow-right' size={20} color={colors.mainYellow} style={{left: 4}}/>
								</TouchableOpacity>
							</View>

							<Image 
								source={require("../assets/ingredients.jpg")}
          			style={{ width: width-40, height: 200, borderRadius: 15, marginTop: 5, marginBottom: 15 }}>
							</Image>
							
						</View>
					</ScrollView>

					<View style={styles.navBar}>
						<View style={styles.navWrapper}>
							<TouchableOpacity>
								<View style={styles.sectionWrapper}>
									<Feather name="home" size={22} color={colors.mainYellow} style={{right: 4}}></Feather>
									<Text style={styles.sectionText}>Home</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity
								style={{ padding: 5 }}
								onPress={() => navigation.navigate("IngredientList")}>
								<MaterialCommunityIcons name="fridge-outline" size={25} color="white" />
							</TouchableOpacity>
							<TouchableOpacity
								style={{ padding: 5 }}
								onPress={() => navigation.navigate("ShoppingCart")}>
								<Feather name="shopping-cart" size={22} color={colors.white}></Feather>
							</TouchableOpacity>
							<TouchableOpacity
								style={{ padding: 5 }}
								onPress={() => navigation.navigate("UserDetails")}>
								<Feather name="user" size={22} color={colors.white}></Feather>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
    container: {
			flex: 1,
			backgroundColor: colors.white,
		},
		wrapper: {
			marginTop: 20,
    	paddingHorizontal: 20,
		},
		title: {
			left: 2,
			fontFamily: 'Poppins_800ExtraBold',
			fontSize: 26,
			color: colors.topBarItem,
		},
		section: {
			left: 2,
			fontFamily: 'Poppins_600SemiBold',
			fontSize: 22,
			color: colors.topBarItem,
		},
		child: {
			fontFamily: 'Poppins_600SemiBold',
			fontSize: 14,
			color: colors.mainYellow,
			justifyContent: 'flex-end',
		},
		navBar: {
			width: "100%",
			backgroundColor: colors.mainYellow,
		},
		navWrapper: {
			width: "100%",
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			padding: 8,
		},
		sectionWrapper: {
			backgroundColor: colors.white,
			padding: 8,
			paddingHorizontal: 18,
			borderRadius: 18,
			flexDirection: "row",
			justifyContent: "space-evenly",
			alignItems: "center",
		},
		sectionText: {
			fontSize: 13,
			color: colors.mainYellow,
			left: 4,
			fontWeight: "500",
		},
});

export default Welcome;
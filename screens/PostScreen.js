import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
	Image,
	ScrollView,
	Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
	'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class PostScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			speakerColor: 'gray',
			speakerIcon: 'volume-high-outline',
			light_theme: false,
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
		this.fetchUser();
	}

	async fetchUser() {
		let theme;
		const auth = getAuth();
		const userId = auth.currentUser.uid;

		onValue(ref(db, '/users/' + userId), (snapshot) => {
			theme = snapshot.val().current_theme;
			this.setState({
				light_theme: theme === 'light' ? true : false,
			});
		});
	}

	async initiateTTS(title, author, post, moral) {
		const current_color = this.state.speakerColor;
		this.setState({
			speakerColor: current_color === 'gray' ? '#ee8249' : 'gray',
		});

	}

	render() {
		if (!this.props.route.params) {
			this.props.navigation.navigate('Home');
		} else if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			return (
				<View
					style={this.state.light_theme ? styles.containerLight : styles.container}>
					<SafeAreaView style={styles.droidSafeArea} />
					<View style={styles.appTitle}>
						<View style={styles.appIcon}>
							<Image
								source={require('../assets/logo.png')}
								style={styles.iconImage}></Image>
						</View>
						<View style={styles.appTitleTextContainer}>
							<Text
								style={
									this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText
								}>
								Spectagram App
							</Text>
						</View>
					</View>
					<View style={styles.postContainer}>
						<ScrollView style={styles.postCard}>
							<Image
								source={require('../assets/favicon.png')}
								style={styles.image}></Image>

							<View style={styles.dataContainer}>
								<View style={styles.titleTextContainer}>
									<Text style={styles.postTitleText}>
										{this.props.route.params.post.title}
									</Text>
									<Text style={styles.postAuthorText}>
										{this.props.route.params.post.author}
									</Text>
									<Text style={styles.postAuthorText}>
										{this.props.route.params.post.created_on}
									</Text>
								</View>
								<View style={styles.iconContainer}>
									<TouchableOpacity
										onPress={() =>
											this.initiateTTS(
												this.props.route.params.post.title,
												this.props.route.params.post.author,
												this.props.route.params.post.post,
												this.props.route.params.post.moral
											)
										}>
										<Ionicons
											name={this.state.speakerIcon}
											size={RFValue(30)}
											color={this.state.speakerColor}
											style={{ margin: RFValue(15) }}
										/>
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.postTextContainer}>
								<Text style={styles.postText}>
									{this.props.route.params.post.post}
								</Text>
								<Text style={styles.moralText}>
									Moral - {this.props.route.params.post.moral}
								</Text>
							</View>
							<View style={styles.actionContainer}>
								<View style={styles.likeButton}>
									<Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
									<Text style={styles.likeText}>12k</Text>
								</View>
							</View>
						</ScrollView>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#15193c',
	},
	containerLight: {
		flex: 1,
		backgroundColor: 'white',
	},
	droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
	},
	appTitle: {
		flex: 0.07,
		flexDirection: 'row',
	},
    authorNameText:{
        color: "white",
        fontSize:RFValue(20)
    },
    authorNameText:{
        color: "black",
        fontSize:RFValue(20)
    },
	appIcon: {
		flex: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	appTitleTextContainer: {
		flex: 0.7,
		justifyContent: 'center',
	},
	appTitleText: {
		color: 'white',
		fontSize: RFValue(28),
		fontFamily: 'Bubblegum-Sans',
	},
	appTitleTextLight: {
		color: 'black',
		fontSize: RFValue(28),
		fontFamily: 'Bubblegum-Sans',
	},
	postContainer: {
		flex: 1,
	},
	postCard: {
		margin: RFValue(20),
		backgroundColor: '#2f345d',
		borderRadius: RFValue(20),
	},
	image: {
		width: '100%',
		alignSelf: 'center',
		height: RFValue(200),
		borderTopLeftRadius: RFValue(20),
		borderTopRightRadius: RFValue(20),
		resizeMode: 'contain',
	},
	dataContainer: {
		flexDirection: 'row',
		padding: RFValue(20),
	},
	titleTextContainer: {
		flex: 0.8,
	},
	postTitleText: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(25),
		color: 'white',
	},
	postAuthorText: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(18),
		color: 'white',
	},
	iconContainer: {
		flex: 0.2,
	},
	postTextContainer: {
		padding: RFValue(20),
	},
	postText: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(15),
		color: 'white',
	},
	moralText: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(20),
		color: 'white',
	},
	actionContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: RFValue(10),
	},
	likeButton: {
		width: RFValue(160),
		height: RFValue(40),
		flexDirection: 'row',
		backgroundColor: '#eb3948',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: RFValue(30),
	},
	likeText: {
		color: 'white',
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(25),
		marginLeft: RFValue(5),
	},
});

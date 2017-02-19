import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	TextInput,
	Image,
	View
} from 'react-native';

import Forecast from './Forecast';

const API_KEY = 'bbeb34ebf60ad50f7893e7440a1e2b0b';

export default class WeatherProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zip: '',
			forecast: null
		};
	}

	_handleTextChange(event) {
		var zip = event.nativeEvent.text;
		fetch('http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&units=metric&APPID=' + API_KEY)
			.then((response) => response.json())
			.then((responseJSON) => {
				console.log(responseJSON);
				this.setState({
					forecast: {
						main: responseJSON.weather[0].main,
						description: responseJSON.weather[0].description,
						temp: responseJSON.main.temp,
						name: responseJSON.name
					}
				});
			})
			.catch((error) => {
				console.warn(error);
			});
	}


	render() {
		var content = null;
		if (this.state.forecast !== null) {
			content = <Forecast
				main={this.state.forecast.main}
				description={this.state.forecast.description}
				temp={this.state.forecast.temp}
				name={this.state.forecast.name}
			/>;
		}
		return (
			<View style={styles.container}>
				<Image source={require('./img/image.jpg')}
				       resizeMode='cover'
				       style={styles.backdrop}>
					<View style={styles.overlay}>

						<View style={styles.row}>

							<Text style={styles.mainText}>
								Current weather for
							</Text>

							<View style={styles.zipContainer}>
								<TextInput
									style={[styles.zipCode, styles.mainText]}
									onSubmitEditing={(event) => this._handleTextChange(event)}/>
							</View>

						</View>

						{content}
					</View>
				</Image>
			</View>
		);
	}
}
var baseFontSize = 16;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 30
	},
	backdrop: {
		flex: 1,
		flexDirection: 'column',
	},
	overlay: {
		paddingTop: 5,
		backgroundColor: '#000',
		opacity: 0.5,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#d6d7da',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	row: {
		// flex: 1,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'flex-start',
		padding: 30
	},
	zipContainer: {
		// flex: 1,
		flexBasis: 50,
		borderBottomColor: '#DDDDDD',
		borderBottomWidth: 1,
		marginLeft: 5,
		marginTop: 3
	},
	zipCode: {
		width: 50,
		height: baseFontSize
	},
	mainText: {
		// flex: 1,
		fontSize: baseFontSize,
		color: '#FFFFFF'
	}
});
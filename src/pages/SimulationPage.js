import React from 'react';
import { TextInput, StyleSheet, Button, ScrollView, View, KeyboardAvoidingView,
		 ActivityIndicator, Alert, YellowBox } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import FormRow from "../components/FormRow";
import SocketIOClient from 'socket.io-client';

YellowBox.ignoreWarnings(['Setting a timer', 'Unrecognized WebSocket connection']);

export default class SimulationPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			xsize: "",
			ysize: "",
			isLoading: false,
			message: '',
			value: 0,
		}
	}

	componentDidMount() {
		this.state.socket = SocketIOClient('http://10.42.0.1:8080', {
			timeout: 10000,
			jasonp: false,
			transports: ['websocket'],
			autoConnect: true,
		})
	}
	  

	onChangeHandler(field, value) {
		this.setState({ [field]: value });
	}

	simulate() {
		// Ring
		if( parseInt(this.state.xsize, 10) > 4 ) {
			this.setState({ message: 'Tamanho em X deve ser no máximo 4' })
			return;
		}

		if( parseInt(this.state.ysize, 10) > 4 ) {
			this.setState({ message: 'Tamanho em Y deve ser no máximo 4' })
			return;
		}

		if( parseInt(this.state.xsize, 10) < 1 || Number.isNaN(parseInt(this.state.xsize, 10)) ) {
			this.setState({ message: 'Tamanho em X deve ser no mínimo 1' })
			return;
		}


		if(this.state.value) { // Ring
			this.state.socket.emit('simulate', {
					topology: "Ring",
					xsize: parseInt(this.state.xsize, 10),
				}
			)

		} else { // Mesh
			if( parseInt(this.state.ysize, 10) < 1 || Number.isNaN(parseInt(this.state.ysize, 10)) ) {
				this.setState({ message: 'Tamanho em Y deve ser no mínimo 1' })
				return;
			}

			this.state.socket.emit("simulate", {
					topology: "Mesh",
					xsize: parseInt(this.state.xsize, 10),
					ysize: parseInt(this.state.ysize, 10)
				}
			)
		}

		this.state.socket.on('result', (result) => {
			this.props.navigation.navigate('Results', { results: result })
		});

	}

	renderButton() {
		if (this.state.isLoading)
			return <ActivityIndicator size="large" style={ styles.loading } />

		return (
			<View>
				<View style={ styles.button }>
						<Button 
							title='Simular'
							color='#6542f4'
							onPress={()=> this.simulate() }
						/>
					</View>
			</View>
		)
	}

	renderMessage() {
		const { message } = this.state;
		if(!message)
			return null;

		Alert.alert(
			"Erro!",
			message.toString(),
			[{
				text: "OK",
				onPress: () => { this.setState({ message: '' })}
			}]
		);
	}

	renderYsize() {

		if (this.state.value)
			return null;

		return(
			<FormRow>
				<TextInput
					style={ styles.input }
					placeholder="Tamanho em Y"
					keyboardType="number-pad"
					value={ this.state.ysize }
					onChangeText={ value => this.onChangeHandler('ysize', value) }
				/>
			</FormRow>
		)
	}

	onPressRadio(value) {
		this.setState(
			{value: value}
		)
		if(value)
			this.setState({ ysize: "" })
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
				<ScrollView style={ styles.container }>
					<View style={ styles.radio }>
						<RadioForm
							radio_props={ [{label: 'Mesh', value: 0}, {label: 'Ring', value: 1}] }
							initial={0}
							onPress={ (value) => { this.onPressRadio(value) }}
						/>
					</View>

					{/* Aqui Text é filho de FormRow */}
					<FormRow>
						<TextInput
							style={ styles.input }
							placeholder="Tamanho em X"
							keyboardType="number-pad"
							value={ this.state.xsize }
							onChangeText={ value => this.onChangeHandler('xsize', value) }
						/>
					</FormRow>

					{ this.renderYsize() }
					{ this.renderButton() }
					{ this.renderMessage() }
					
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
	},
	input: {
		paddingRight: 5,
		paddingLeft: 5
	},
	button: {
		paddingTop: 20,
		fontSize: 11
	},
	logo: {
		aspectRatio: 1,
		resizeMode: 'center',
		width: 400,
		height: 400
	},
	logoview: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	loading: {
		padding: 20
	},
	radio: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 10
	}
});
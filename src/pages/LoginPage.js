import React from 'react';
import { TextInput, StyleSheet, Button, ScrollView, View, Image, KeyboardAvoidingView,
		 ActivityIndicator, Alert } from 'react-native';

import firebase from 'firebase'

import FormRow from "../components/FormRow";

import apijs from "../../api.json"

export default class LoginPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			isLoading: false,
			message: ""
		}
	}

	componentDidMount() {
		var firebaseConfig = apijs;

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
	}

	onChangeHandler(field, value) {
		this.setState({ [field]: value });
	}

	accessApp() {
		this.setState({ isLoading: false })
		this.props.navigation.replace('Simulate')
	}

	getMsgByErrorCode(errorCode) {
		switch (errorCode) {
			case "auth/wrong-password":
				return "Senha incorreta";
			case "auth/invalid-email":
				return "E-mail inválido";
			case "auth/user-not-found":
				return "Usuário não encontrado";
			case "auth/user-disable":
				return "Usuário desativado";
			case "auth/email-already-in-use":
				return "Usuário já está em uso";
			case "auth/operation-not-allowed":
				return "Operação não permitida";
			case "auth/weak-password":
				return "Senha muito fraca";
			default:
				return "Erro desconhecido";
		}
	}

	renderButton() {
		if (this.state.isLoading)
			return <ActivityIndicator size="large" style={ styles.loading } />

		return (
			<View>
				<View style={ styles.button }>
						<Button 
							title='Entrar'
							color='#6542f4'
							onPress={()=> this.login() }
						/>
					</View>
					
					<View style={ styles.button }>
						<Button 
							title='Cadastre-se'
							color='#a08af7'
							onPress={()=> this.signup() }
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

	login() {
		this.setState({ isLoading: true, message: ''});
		const { email, password } = this.state;

		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				this.accessApp()
			})
			.catch(error => {
				this.setState({
					message: this.getMsgByErrorCode(error.code),
					isLoading: false
				});
			})
	}

	doSignUp() {
		const { email, password } = this.state;

		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				this.accessApp()
			})
			.catch(error => {
				this.setState({
					message: this.getMsgByErrorCode(error.code),
					isLoading: false
				});
			})
	}

	signup() {
		const { email, password } = this.state;
		if(!email || !password){
			Alert.alert(
				"Cadastro",
				"Informe e-mail e senha"
			);
			return null;
		}
		Alert.alert(
			"Cadastro",
			"Deseja cadastrar seu usuário com os dados informados?",
			[{
				text: "Cancelar",
				style: 'cancel'
			},
			{
				text: "Cadastrar",
				onPress: () => { this.doSignUp() }
			}]
		);
	};

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
				<ScrollView style={ styles.container }>
					<View style={ styles.logoview }>
						<Image
							source={ require("../../assets/icon.png")}
							style ={ styles.logo }
						/>
					</View>

					{/* Aqui Text é filho de FormRow */}
					<FormRow>
						<TextInput
							style={ styles.input }
							placeholder="user@domain.com"
							keyboardType="email-address"
							value={ this.state.email }
							onChangeText={ value => this.onChangeHandler('email', value) }
						/>
					</FormRow>
					<FormRow>
						<TextInput
							style={ styles.input }
							placeholder="***************"
							secureTextEntry
							value={ this.state.password }
							onChangeText={ value => this.onChangeHandler('password', value) }
						/>
					</FormRow>

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
	}
});
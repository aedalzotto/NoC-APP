import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

export default class DetailsPage extends React.Component {

	constructor(props) {
		super(props);
		
	}

	onPressNode(item) {
		this.props.navigation.navigate('Details', { node: item })
	}

	renderRight(node) {
		if(node.right) {
			return(
				<View style={ styles.container }>
					<Text style={styles.default}>Right</Text>
					<Text style={styles.default}>{ node.right }</Text>
					<Text style={styles.default}>{ node.communication.ports.right }</Text>
				</View>
			)
		}
	}

	renderLeft(node) {
		if(node.left) {
			return(
				<View style={ styles.container }>
					<Text style={styles.default}>Left</Text>
					<Text style={styles.default}>{ node.left }</Text>
					<Text style={styles.default}>{ node.communication.ports.left }</Text>
				</View>
			)
		}
	}

	renderTop(node) {
		if(node.top) {
			return(
				<View style={ styles.container }>
					<Text style={styles.default}>Top</Text>
					<Text style={styles.default}>{ node.top }</Text>
					<Text style={styles.default}>{ node.communication.ports.top }</Text>
				</View>
			)
		}
	}

	renderBottom(node) {
		if(node.bottom) {
			return(
				<View style={ styles.container }>
					<Text style={styles.default}>Bottom</Text>
					<Text style={styles.default}>{ node.bottom }</Text>
					<Text style={styles.default}>{ node.communication.ports.bottom }</Text>
				</View>
			)
		}
	}

	render() {
		const { node } = this.props.navigation.state.params;
		return (
			<ScrollView>
				<View style={{flex: 1}}>
					<Text style={styles.default}>ID: { node.id }</Text>
					<Text style={styles.default}>Mensagens: { node.communication.message_count }</Text>
					<Text style={[styles.default, {marginBottom: 30}]}>Requests: { node.communication.requests }</Text>

					<View style={ styles.container }>
						<Text style={[ styles.default, {fontWeight: 'bold'} ]}>Conexão</Text>
						<Text style={[ styles.default, {fontWeight: 'bold'} ]}>Nodo</Text>
						<Text style={[ styles.default, {fontWeight: 'bold'} ]}>Volume</Text>
					</View>
					<View style={ styles.container }>
						<Text style={styles.default}>Local</Text>
						<Text style={styles.default}>{ node.local }</Text>
						<Text style={styles.default}>{ node.communication.ports.local }</Text>
					</View>
					{ this.renderRight(node) }
					{ this.renderLeft(node) }
					{ this.renderTop(node) }
					{ this.renderBottom(node) }
				</View>
			</ScrollView>	
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row"
	},
	default: {
		padding: 20,
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		borderStyle: 'solid',
		textAlign: 'center',
		flex: 1
	}
});
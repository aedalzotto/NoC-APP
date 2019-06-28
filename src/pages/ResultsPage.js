import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';

export default class ResultsPage extends React.Component {

	constructor(props) {
		super(props);
		
	}

	onPressNode(item) {
		this.props.navigation.navigate('Details', { node: item })
	}

	renderNodes(results) {
		const { nodes, x } = results;

		return (
			<FlatList
				data={ nodes }
				keyExtractor={ item => item.id}
				numColumns={ x }
				renderItem={({ item }) => {
					return (
						<TouchableOpacity style={styles.item} onPress={() => this.onPressNode(item)}>
							
							<Text style={styles.text}>ID: {item.id}</Text>
							<Text> </Text>

							<Text style={styles.text}>Messages</Text>
							<Text style={styles.text}>{item.communication.message_count}</Text>

							<Text style={styles.text}>Requests</Text>
							<Text style={styles.text}>{item.communication.requests}</Text>
							
						</TouchableOpacity>
					);
				}}
			/>
		);
	}

	render() {
		const {results} = this.props.navigation.state.params;
		return (
			<ScrollView horizontal={true} style={{flex: 1}}>
				{ this.renderNodes(results) }
			</ScrollView>
		);
	}

}

const styles = StyleSheet.create({
	item: {
		alignItems: "center",
		backgroundColor: "#779999",
		flexGrow: 1,
		margin: 5,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	text: {
		color: "#333333"
	}
});
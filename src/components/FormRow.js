import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FormRow = props => {
	const { children } = props;

	return (
		<View style={ styles.container }>
			{ children }
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: "gray",
		marginTop: 5,
		marginBottom: 5,
		elevation: 0.5
	}
});

// Exportar para usar em outras páginas
export default FormRow;
import { createAppContainer, createStackNavigator } from 'react-navigation'

import LoginPage from './src/pages/LoginPage';
import SimulationPage from './src/pages/SimulationPage';
import ResultsPage from './src/pages/ResultsPage';
import DetailsPage from './src/pages/DetailsPage';

// Pilha de navegação
const AppNavigator = createStackNavigator(
	{
		// Primeiro elemento da pilha é o executado no export default abaixo
		// 'Login': {
		// 	screen: LoginPage,
		// 	navigationOptions: {
		// 		header: null
		// 	}
		// },
		'Simulate': {
			screen: SimulationPage,
			navigationOptions: {
				title: 'Simular',
				headerTitleStyle: {
					textAlign: 'left'
				}
			}
		},
		'Results': {
			screen: ResultsPage,
			navigationOptions: {
				title: 'Resultados',
				headerTitleStyle: {
					textAlign: 'left'
				}
			}
		},
		'Details': {
			screen: DetailsPage,
			navigationOptions: {
				title: 'Detalhes do Nodo',
				headerTitleStyle: {
					textAlign: 'left'
				}
			}
		}
	},
	// Segundo parâmetro: padrões de headers, usados quando nada é informado
	{
		defaultNavigationOptions: {
			title: 'NoC App',
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6542f4',
				borderBottomColor: '#f4f2ff'
			},
			headerTitleStyle: {
				color: 'white',
				fontSize: 20,
				flexGrow: 1,
				textAlign: 'center'
			}
		}
	}
);

// Container da pilha
const AppContainer = createAppContainer(AppNavigator);

// export default: manda executar
// App.js é o primeiro arquivo a ser executado.
export default AppContainer;

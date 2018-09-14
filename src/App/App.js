import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Posts from '../Components/Posts';
import store from '../store';
import './App.css';

const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Posts} />
			</Switch>
		</BrowserRouter>
	</Provider>
);

export default App;

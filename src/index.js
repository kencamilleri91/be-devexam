import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import store from './store/BetentStore.js';
import App from './App.js';

window.onload = () => {
	ReactDOM.render(<AppContainer><App store={store} /></AppContainer>, document.getElementById('app'));
};

// This starts listening for changes ot App.js for hot reloading
if (module.hot) {
	module.hot.accept('./App.js', () => {
		const NewRoot = require('./App.js').default;
		ReactDOM.render(<AppContainer><NewRoot store={store} /></AppContainer>, document.getElementById('app'));
	});
}

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';

import styles from './styles/styles.scss';

import TestPage from './containers/TestPage.js';

export default function App({store}) {
	return (
		<div style={styles}>
			<HashRouter>
				<Switch>
					<Route name="TestPage" path="/" exact render={(props) => (
						<TestPage store={store} routerParams={props} />
					)} />
				</Switch>
			</HashRouter>
		</div>
	);
}

App.propTypes = {
	store: PropTypes.object.isRequired,
};

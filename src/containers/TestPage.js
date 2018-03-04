import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import ClickableBallContainer from '../components/ClickableBallContainer.js';

const enableExtraBallContainerForExperimentationPurposes = false;

@observer class TestPage extends React.Component {
	constructor() {
		super();
	}

	render() {
		const {ballColor, randomizeColor, fatalError} = this.props.store;
		if(fatalError) {
			console.error(fatalError);
		}
		return (
			<div className="TestPage">
				{!fatalError ?
					<ClickableBallContainer ballColor={ballColor} randomizeColor={randomizeColor} />
					: <div>An error has occured! Please check the console</div>
				}
				{!fatalError && enableExtraBallContainerForExperimentationPurposes ?
					<ClickableBallContainer ballColor={ballColor} randomizeColor={randomizeColor} />
					: null
				}
			</div>
		);
	}
}

TestPage.propTypes = {
	store: PropTypes.object,
	routerParams: PropTypes.object,
};

export default TestPage;

import React from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

const BALL_STATE_TOP_LEFT = 0;
// const BALL_STATE_TOP_RIGHT = 1;
// const BALL_STATE_BOTTOM_RIGHT = 2;
const BALL_STATE_BOTTOM_LEFT = 3;

@observer class ClickableBallContainer extends React.Component {
	constructor() {
		super();

		this.incrementState = this.incrementState.bind(this);
	}

	@observable ballState = BALL_STATE_TOP_LEFT;
	@observable loading = false;

	@action
	incrementState() {
		// Ignore call if already in an AJAX query
		if(this.loading === true) {
			return;
		}
		this.loading = true;
		this.props.randomizeColor((err) => {
			this.loading = false;
			if(err) {
				console.error(err);
			}
			// Upon request success, increment the state
			this.ballState++;
			// Loop back from bottom left to top left
			if(this.ballState > BALL_STATE_BOTTOM_LEFT) {
				this.ballState = BALL_STATE_TOP_LEFT;
			}
		});
	}

	render() {
		const { ballColor } = this.props;
		const ballColorHex = (ballColor || {}).hex;
		const ballStateClassName = 'ball s' + this.ballState;
		if(!ballColorHex) {
			return <div>Loading..</div>;
		}
		return (
			<div className="ClickableBallContainer" onClick={this.incrementState}>
				<div className={ballStateClassName} style={{ background: '#' + ballColorHex }}>&nbsp;</div>
				<img className="spinner" style={{ display: this.loading ? 'block' : 'none'}} alt="Loading" src="/img/spinner.gif"></img>
			</div>
		);
	}
}

ClickableBallContainer.propTypes = {
	ballColor: PropTypes.object, // TaggedColor
	randomizeColor: PropTypes.func,
};

export default ClickableBallContainer;

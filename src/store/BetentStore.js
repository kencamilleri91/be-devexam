import { observable, action } from 'mobx';
import request from 'superagent';

import TaggedColor from '../models/TaggedColor';

// In the store we'll keep things pertaining to the app's overall state instead of individual components
class BetentStore {
	@observable ballColor; // TaggedColor
	@observable fatalError; // string

	constructor() {
		this.randomizeColor = this.randomizeColor.bind(this);

		this.randomizeColor();
	}

	// callback: function(error, TaggedColor)
	@action
	ajaxGetNewColor(callback) {
		request
			.get('http://www.colr.org/json/color/random')
			.set('Accept', 'application/json')
			.end(action((err, res) => {
				if(!res || !res.xhr || !res.xhr.response) {
					callback('Request could not be completed. Error is: ' + err, null);
					return;
				}
				const taggedColor = new TaggedColor(JSON.parse(res.xhr.response));
				let errorMessage = err;
				if(!errorMessage && (!taggedColor.hex || typeof taggedColor.hex !== 'string')) {
					errorMessage = 'Invalid hex color "' + taggedColor.hex + '"';
					console.error(errorMessage, ' - Response is: ', res);
				}
				callback(errorMessage, taggedColor);
			}));
	}

	// callback: function(error, TaggedColor)
	@action
	randomizeColor(callback) {
		this.ajaxGetNewColor((err, taggedColor) => {
			if(err) {
				this.fatalError = err;
			} else {
				this.ballColor = taggedColor || {};
				if(this.ballColor.hex === '') {
					this.ballColor.hex = '000';
				}
				if(!err) {
					console.log('New TaggedColor: ', taggedColor);
				}
			}
			if(callback) {
				callback(err, taggedColor);
			}
		});
	}
}

export default window.store = new BetentStore;

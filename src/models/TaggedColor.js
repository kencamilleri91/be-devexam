import { observable } from 'mobx';

// This class is not needed because all we need is just the hex value,
// but this was included to demonstrate the use of models in mobx and
// their advantage in assigning json from a request into a well defined
// object of type TaggedColor - the colr.org request returns tags for each color
export default class TaggedColor {
	@observable hex = '' // string: format 'rrggbb'
	@observable tags = [] // Array<string>

	// based on the API call from
	// www.colr.org/json/color/random
	constructor(json) {
		if(json) {
			const color = json.colors[0];
			this.hex = json.new_color;
			// sometimes, this web hook returns an empty hex, assume this to be black
			if(!this.hex || this.hex === '') {
				this.hex = '000';
			}
			this.tags = this.getTags(color.tags);
		}
	}

	getTags(tagsArray) {
		if(!tagsArray || !tagsArray.map) { return []; }
		return tagsArray.map((tag) => tag.name);
	}

	asJson()  {
		return {
			hex: this.hex,
			tags: this.tags,
		};
	}
}

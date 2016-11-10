import * as _ from './tools.js';

export const bookmarks = {
	url(url) {
		if (!_.validateUrl(url))
			return 'Please enter a valid URL';
	}
}
import * as _ from './tools.js';

export const bookmarks = {
	title(title) {
		if (!title.trim())
			return 'Please enter a title';
	},
	url(url) {
		if (!url.trim()) 
			return 'Please enter a URL';
		if (!_.validateUrl(url))
			return 'Please enter a valid URL';
	}
}
import * as _ from '../../tools.js';

const listValidator = {
	title(title) {
		if (!title.trim())
			return 'Please enter a title';
	},
};

export default listValidator;
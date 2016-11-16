import LocalStorageCollection from '../base/localstorage.js';

import * as _ from '../../tools.js';

import ListModel from './model.js';
import listValidator from './validators.js';

export default class Lists extends LocalStorageCollection {

	constructor() {
		super();

		this.setUpModelHooks();
	}

	get model() {
		return ListModel;
	}

	get validator() {
		return listValidator;
	}

	setUpModelHooks() {
		this.preCreate(model => {
			model.date = new Date;
			
			// set slug
			model.slug = _.slugify(model.title);

			if (!model.bookmarks) model.bookmarks = [];
			if (!model.description) model.description = '';
			return model;
		});
	}

}
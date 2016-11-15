import LocalStorageCollection from '../base/localstorage.js';

import * as _ from '../../tools.js';

import ListModel from './model.js';
import listValidator from './validators.js';

export default class Lists extends LocalStorageCollection {

	get model() {
		return ListModel;
	}

	get validator() {
		return listValidator;
	}

}
import Model from './base/model.js';

export default class Bookmark extends Model {

	getDetailUrl() {
		return "/bookmark/" + this.id + '/' + this.slug;
	}

	getEditUrl() {
		return "/bookmark/" + this.id + '/' + this.slug + "/edit";
	}

}
import Model from '../base/model.js';

export default class ListModel extends Model {

	get fields() {
		return {
			title: String,
			bookmarks: Array
		}
	}

	getDetailUrl() {
		return "/bookmark/" + this.id + '/' + this.slug;
	}

	getEditUrl() {
		return "/bookmark/" + this.id + '/' + this.slug + "/edit";
	}

}
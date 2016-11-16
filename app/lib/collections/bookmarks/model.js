import Model from '../base/model.js';

export default class BookmarkModel extends Model {

	getDetailUrl() {
		return "/bookmark/" + this.id + '/' + this.slug;
	}

	getEditUrl() {
		return "/bookmark/" + this.id + '/' + this.slug + "/edit";
	}

	getDate() {
		return new Date(this.date);
	}

}
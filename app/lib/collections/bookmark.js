import Model from './model';

export default class Bookmark extends Model {

	constructor(properties) {
		super(properties);
	}

	getDetailUrl() {
		return "/bookmark/" + this.id + '/' + this.slug;
	}

	getEditUrl() {
		return "/bookmark/" + this.id + '/' + this.slug + "/edit";
	}

}
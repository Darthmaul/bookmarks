import Model from '../base/model.js';

export default class ListModel extends Model {

	get fields() {
		return {
			title: String,
			bookmarks: Array
		}
	}

	getDetailUrl() {
		return "/list/" + this.id + '/' + this.slug;
	}

	getEditUrl() {
		return "/list/" + this.id + '/' + this.slug + "/edit";
	}

}

export function isListModel(model) {
	return model instanceof ListModel;
}
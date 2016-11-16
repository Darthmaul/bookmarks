import * as _ from '../../tools.js';
import Dispatcher from '../../behaviour/dispatcher.js';
import Model from './model.js';

export default class Collection {

	constructor() {
		this.models = {};
		this.hooks = [];
		this.name = this.constructor.name;
		this.dispatcher = new Dispatcher();
	}

	get model() {
		return Model;
	}

	// hooks

	preCreate(fn) {
		this.hooks.push(fn);
	}

	callHooks(model) {
		for (var i = 0, l = this.hooks.length; i < l; i++) {
			const hookFn = this.hooks[i];
			model = hookFn(model);
			if (!model) throw new Error('You must return a model from collection hook callbacks');
		}
		return model;
	}

	// query models

	all() {
		return Object.keys(this.models).map(key => this.models[key]);
	}

	make(attrs) {
		return new this.model(attrs, this);
	}

	// get model from single id or array of ids
	get(id) {
		if (_.isString(id)) {
			const attrs = this.models[id];
			return attrs ? this.make(attrs) : false;
		}
		if (_.isArray(id)) {
			const ids = id;
			return ids.map(id => this.models[id]);
		}
		return false;
	}

	// events

	// change fires for all events

	onChange(callback) {
		this.dispatcher.register('change', callback);
	}

	// add models when you don't want to give them a new id

	onAdd(callback) {
		this.dispatcher.register('add', callback);
	}

	removeAdd(callback) {
		this.dispatcher.remove('add', callback);
	}

	// creating a model genereates a new id

	onCreate(callback) {
		this.dispatcher.register('create', callback);
	}

	onUpdate(callback) {
		this.dispatcher.register('update', callback);
	}

	onRemove(callback) {
		this.dispatcher.register('remove', callback);
	}

	triggerChange() {
		this.dispatcher.broadcast('change');
	}

	triggerAdd(model) {
		this.dispatcher.broadcast('add', model);
		this.triggerChange();
	}

	triggerCreate(model) {
		this.dispatcher.broadcast('create', model);
		this.triggerChange();
	}

	triggerUpdate(model) {
		this.dispatcher.broadcast('update', model);
		this.triggerChange();
	}

	triggerRemove(model) {
		this.dispatcher.broadcast('remove', model);
		this.triggerChange();
	}

	validateField(field, value) {
		const validator = this.validator[field];
		if (validator) {
			const result = validator(value);
			if (result) {
				return result;
			}
		}
	}

	validate(obj) {
		const errors = {};
		let validated = true;
		for (var field in obj) {
			const result = this.validateField(field, obj[field]);
			if (result) {
				errors[field] = result;
				validated = false;
			}
		}
		return { errors, validated };
	}

	// change models

	create(attrs) {
		let model = this.make(attrs);
		if (!model.id) model.id = _.generateID();
		model = this.callHooks(model);
		this.models[model.id] = model;
		this.triggerCreate(model);
		return model;
	}

	createMany(models) {
		const created = models.map((attrs) => {
			let model = this.make(attrs);
			if (!model.id) model.id = _.generateID();
			model = this.callHooks(model);
			this.models[model.id] = model;
			return model;
		});
		this.triggerCreate(created);
		return created;
	}

	add(model) {
		model = this.make(model);
		this.models[model.id] = model;
		this.triggerAdd(model);
		return model;
	}

	addMany(models) {
		const result = models.forEach(model => {
			model = this.make(model);
			this.models[model.id] = model;
			return model;
		});
		this.triggerAdd(result);
		return result;
	}

	update(attrs) {
		const id = attrs.id;
		if (id) {
			let model = this.get(id);
			if (model) {
				model = _.extend(model, attrs);
				model = this.callHooks(model);
				this.models[id] = model;
				this.triggerUpdate(model);
				return model;
			} else {
				throw new Error('Could not update the provided model. Does it have an ID property?');
			}
		}
	}

	remove(model) {
		let id;
		if (_.isObject(model)) {
			id = model.id;
		} else {
			// model is a string id
			model = this.get(model);
			id = model.id;
		}
		delete this.models[id];
		this.triggerRemove(model);
	}

}
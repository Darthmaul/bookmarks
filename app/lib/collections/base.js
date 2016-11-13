import * as _ from '../tools.js';
import Dispatcher from '../behaviour/dispatcher.js';

export default class Collection {

	constructor() {
		this.models = {};
		this.hooks = [];
		this.dispatcher = new Dispatcher();
		this.name = this.constructor.name;
	}

	shell() {
		return new Object;
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

	get(id) {
		if (id) return this.models[id];
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

	// change models

	create(model) {
		model = _.extend(this.shell(), model);
		model.id = _.generateID();
		model = this.callHooks(model);
		this.models[model.id] = model;
		this.triggerCreate(model);
		return model;
	}

	createMany(models) {
		const created = models.map((model) => {
			model.id = _.generateID();
			model = this.callHooks(model);
			this.models[model.id] = model;
			return model;
		});
		this.triggerCreate(created);
		return created;
	}

	add(model) {
		this.models[model.id] = model;
		this.triggerAdd(model);
		return model;
	}

	addMany(models) {
		models.forEach((model) => {
			this.models[model.id] = model;
		});
		this.triggerAdd(models);
		return models;
	}

	update(model) {
		const id = model.id;
		if (id) {
			this.models[id] = model;
			this.triggerUpdate(model);
		}
		return model;
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
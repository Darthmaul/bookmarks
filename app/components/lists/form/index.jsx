import React from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

import * as _ from '../../../lib/tools.js';
import Search from '../../../lib/behaviour/search.js';

// import styles for this component
require('!style!css!sass!./css/form.scss');

const DragHandle = SortableHandle(() => <span className="list-form__bookmark-item__drag-handle"><i className="ion-navicon" /></span>);

const SortableItem = SortableElement(({ bookmark, removeBookmark }) => (
	<li className="list-form__bookmark-item">
		<DragHandle />
		{bookmark.title}
		<a onClick={removeBookmark} href="#" className="list-form__bookmark-item__remove">&times;</a>
	</li>
));

const SortableList = SortableContainer(({ items, removeBookmark }) => (
	<ul className="list-form__bookmarks-list">
		<header className="list-form__bookmarks-header">
			<h3>bookmarks</h3>
		</header>
		{items.map((bookmark, index) => {
			return (
				<SortableItem key={bookmark.id} index={index} bookmark={bookmark} removeBookmark={(event) => removeBookmark(bookmark, event)} />
			);
		})}
	</ul>
));

export default class ListFormComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		lists: React.PropTypes.object,
		router: React.PropTypes.object
	};

	renderBookmarks() {
		const { bookmarks } = this.state;
		const collection = this.context.bookmarks;
		const models = collection.get(bookmarks);
		if (models.length) {
			return <SortableList useDragHandle={true} items={models} onSortEnd={this.onSortEnd.bind(this)} removeBookmark={this.removeBookmark.bind(this)} />
		}
	}

	onSortEnd({ oldIndex, newIndex }) {
		this.setState({
			bookmarks: arrayMove(this.state.bookmarks, oldIndex, newIndex)
		});
	}

	constructor(props, context) {
		super(props, context);
		const { list } = this.props;
		const { bookmarks } = this.context;
		this.search = new Search({ bookmarks });

		this.state = {
			errors: false,
			tags: list ? list.tags : [],
			bookmarks: list ? list.bookmarks : [],
			autocompleteBookmarks: [],
			autocompleteQueryLength: 0,
			shouldShowAutoComplete: false,
			isMounted: false
		};

		this.addAutocompleteBookmarks = this.addAutocompleteModels.bind(this);
	}

	componentDidMount() {
		this.search.onSearch(this.addAutocompleteBookmarks);
		this.setState({
			isMounted: true
		});
	}

	componentWillUnmount() {
		this.search.removeSearch(this.addAutocompleteBookmarks);
		this.setState({
			isMounted: false
		});
	}

	addAutocompleteModels(models) {
		const existingBookmarks = this.state.bookmarks;
		// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
		if (this.state.isMounted) {
			models = models.sort((a, b) => new Date(b.date) - new Date(a.date));
			models = models.map(model => model.id);
			models = models.filter(item => {
				return existingBookmarks.indexOf(item) == -1
			});
			this.setState({
				autocompleteBookmarks: models
			});
		}
	}

	renderAutoComplete() {
		const { bookmarks } = this.context;
		const { shouldShowAutoComplete, autocompleteBookmarks } = this.state;
		if (shouldShowAutoComplete && autocompleteBookmarks.length) {
			const results = bookmarks.get(autocompleteBookmarks);
			return (
				<div className="autocomplete">
					{results.map(bookmark => (
						<div onClick={this.addBookmark.bind(this, bookmark)} key={bookmark.id} className="autocomplete__result">
							{bookmark.title}
						</div>
					))}
				</div>
			)
		}
	}

	bookmarksFieldKeyDownHandler(event) {
		const input = this.refs.bookmarks;
		const bookmark = input.value;
		if (event.keyCode == 13 || event.charCode == 13) {
			event.preventDefault();
			/*
			if (bookmark.trim()) {
				const { bookmarks } = this.state;
				if (bookmarks.indexOf(bookmark.trim()) == -1) {
					bookmarks.push(bookmark);
					this.setState({ bookmarks }, () => {
						// setting input value to empty string doesn't show placeholder in webkit for some reason. bluring and focusing fixes it. 
						input.value = '';
						input.blur();
						input.focus();
					});
				}
			}
			*/
		} else {
			if (bookmark.length) {
				this.setState({
					autocompleteQueryLength: bookmark.length,
					shouldShowAutoComplete: true,
				});
				this.performSearch(bookmark);
			}
		}
	}

	bookmarksFieldKeyUphandler(event) {
		const input = this.refs.bookmarks;
		const value = input.value;

		if (!value.trim().length) {
			this.closeAutocomplete();
			input.focus();
		} else {
			this.setState({
				autocompleteQueryLength: value.trim().length
			});
		}
	}

	performSearch(bookmark) {
		this.search.search(bookmark);
	}

	removeBookmark({ id }, event) {
		event.preventDefault();
		event.stopPropagation();
		const { bookmarks } = this.state;
		const index = bookmarks.indexOf(id);
		if (index >= 0) {
			bookmarks.splice(index, 1);
		}
		this.setState({ bookmarks });
	}

	addBookmark({ id }, event) {
		const { bookmarks } = this.state;
		const input = this.refs.bookmarks;
		const index = bookmarks.indexOf(id);
		if (index == -1) {
			bookmarks.push(id);
			this.setState({
				bookmarks
			}, () => {
				// setting input value to empty string doesn't show placeholder in webkit for some reason. bluring and focusing fixes it. 
				input.value = '';
				input.blur();
				input.focus();
				this.closeAutocomplete();
			});
		}
	}

	submitHandler(event) {
		event.preventDefault();
		const { list } = this.props;
		const { lists, router } = this.context;
		const { title, description } = this.refs;
		const titleValue = title.value.trim();
		const descriptionValue = description.value.trim();

		const properties = {
			title: titleValue,
			description: descriptionValue,
			bookmarks: this.state.bookmarks
		};

		const { errors, validated } = lists.validate(properties);

		if (validated) {
			const saved =  list ? list.update(properties) : lists.create(properties);
			router.push(saved.getDetailUrl());
		} else {
			this.setState({ errors });
		}
	}

	getFieldError(field) {
		const { errors } = this.state;
		const error = errors[field];
		return error ? error : false;
	}

	renderFieldError(field) {
		const error = this.getFieldError(field);
		if (error) {
			return <span className="field-error">{error}</span>
		}
	}

	validateField(field, value) {
		const { lists } = this.context;
		return lists.validateField(field, value);
	}

	titleKeyUpHandler(event) {
		const errorState = this.getFieldError('title');
		if (errorState) {
			const { title } = this.refs;
			const error = this.validateField('title', title.value.trim());
			const { errors } = this.state;
			errors.title = error;
			this.setState({ errors });
		}
	}

	setDescriptionInputHeight() {
		const { description } = this.refs;
		if (description) {
			description.style.height = 'auto';
			description.style.height = description.scrollHeight + 'px';
		}
	}

	descriptionChangeHandler() {
		this.setDescriptionInputHeight();
	}

	closeAutocomplete() {
		const { bookmarks } = this.refs;
		this.refs.bookmarks.value = '';
		this.setState({ 
			autocompleteQueryLength: 0,
			shouldShowAutoComplete: false,
			autocompleteBookmarks: []
		});
		bookmarks.focus();
		bookmarks.blur();
	}

	clearInputClickHandler(event) {
		event.preventDefault();
		this.closeAutocomplete()
	}

	render() {
		let clearBtnHtml;
		const { list } = this.props;
		const { autocompleteQueryLength } = this.state;

		if (autocompleteQueryLength > 0) clearBtnHtml = <a href="#" onClick={this.clearInputClickHandler.bind(this)} className="autocomplete__clear">&times;</a>;
		return (
			<form onSubmit={this.submitHandler.bind(this)} className="list-form box-form box">
				<div className="box-form__inner">
					<header className="box-form__header">
						<h2 className="form-title">list</h2>
					</header>
					<div className="field-wrap">
						<input 
							ref="title" 
							defaultValue={list ? list.title : ''} 
							placeholder="title" 
							type="text" 
							className="field"  
							onKeyUp={this.titleKeyUpHandler.bind(this)}
						/>
						{this.renderFieldError('title')}
					</div>
					<div className="field-wrap">
						<textarea 
							ref={ref => {
								this.refs.description = ref;
								this.setDescriptionInputHeight();
							}} 
							onInput={this.descriptionChangeHandler.bind(this)} 
							defaultValue={list ? list.description : ''} 
							placeholder="description" 
							type="text" 
							rows="1" 
							className="field textarea" 
						/>
					</div>
					<div className="field-wrap">
						<input
							ref="bookmarks"
							placeholder="bookmarks"
							type="text"
							className="field list-form__bookmarks"
							onKeyDown={this.bookmarksFieldKeyDownHandler.bind(this)}
							onKeyUp={this.bookmarksFieldKeyUphandler.bind(this)}
						/>
						{clearBtnHtml}
						{this.renderAutoComplete()}
					</div>
				</div>
				{this.renderBookmarks()}
				<footer className="box-form__footer clearfix">
					<button type="submit" className="btn pull-right">{list ? 'update' : 'create'}</button>
				</footer>
			</form>
		);
	}

}

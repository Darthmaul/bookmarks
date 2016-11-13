export function toString(obj) {
	return Object.prototype.toString.call(obj);
}

export function isObject(obj) {
	return toString(obj) == '[object Object]';
}

export function isString(obj) {
	return toString(obj) == '[object String]';
}

export function isArray(obj) {
	return toString(obj) == '[object Array]';
}

export function isFunction(obj) {
	return obj && typeof obj === 'function';
}

export function hasOwnProperty(obj, property) {
	return Object.prototype.hasOwnProperty.call(obj, property);
}

export function keys(obj) {
	const objKeys = [];
	for (var property in obj) {
		if (hasOwnProperty(obj, property)) {
			objKeys.push(property);
		}
	}
	return objKeys;
}

export function generateID() {
	return '_' + Math.random().toString(36).substr(2, 9);
}

export function validateUrl(url) {
	const re = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	const regex = new RegExp(re);
	return regex.test(url);
}

export function validateImageUrl(url) {
    if (_.isString(url)) {
        return validateUrl(url) && ( url.match(/\.(jpeg|jpg|gif|png)$/) != null );
    }
    return false;
}

export function prependHttp(str) {
	if (!/^https?:\/\//i.test(str)) {
	    str = 'http://' + str;
	}
	return str;
}

/**
 * Enumerate over the properties of obj, calling function 'fn'
 * for each property: value pair in turn. If ctx is provided,
 * fn is bound to it, otherwise bound to obj.
 *
 * @param {Object} obj
 * @param {Function} fn
 * @param {Mixed} ctx
 * @api private
 */
export function forIn(obj, fn, ctx) {
	ctx = ctx || obj;
	for (let property in obj) {
		if (hasOwnProperty(obj, property)) {
			fn.call(ctx, property, obj[property]);
		}
	}
}

/**
 * Get length of obj keys, including properties 
 * set to null or undefined.
 *
 * @param {Object} obj
 * @return {Number}
 * @api private
 */
export function objectSize(obj) {
	let size = 0, key;
	for (key in obj) {
		if (hasOwnProperty(obj, key)) size++;
	}
	return size;
}

/**
 * Determine if str ends with suffix.
 *
 * @param {String} str
 * @param {String} suffix
 * @return {Boolean}
 * @api private
 */
export function endsWith(str, suffix) {
    return str.slice(-suffix.length) == suffix;
}

/**
 * Set url parameters from provided hash map on given string.
 *
 * @param {String} url
 * @param {Object} params
 * @return {String}
 * @api private
 */
export function setParams(url, params) {
	let str;
	if (objectSize(params) && !endsWith(url, '?')){
		url += '?';
	}
	forIn(params, function(property, value) {
		str = property + '=' + value + '&';
		url += str;
	});
	if (endsWith(url, '&')) 
		url = url.slice(0, -1);
	return url;
}

export function getUrlDetails(url) {
	const anchor = document.createElement('a');
	anchor.href = url;
	const { hostname, search, pathname, protocol } = anchor;
	return { hostname, pathname, protocol };
}

/**
 * Extend obj with an arbitrary number of source objects.
 *
 * @param {Object} obj - Host to extend.
 * @param {Object} obj - Add to host, ad infinitum.
 * @return {Object} - Host.
 * @api private
 */
export function extend(obj) {
	for (let i = 1, l = arguments.length; i < l; i++) {
		const source = arguments[i];
		for (const prop in source) {
			if (hasOwnProperty(source, prop)) {
				obj[prop] = source[prop];
			}
		}
	}
	return obj;
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[.,]/g, '-')          // Replace full stops & commas with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
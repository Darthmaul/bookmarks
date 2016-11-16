export default function noTouchOnStart() {
	if (!('ontouchstart' in document.documentElement) && !navigator.MaxTouchPoints && !navigator.msMaxTouchPoints) {
		document.body.className.length ? document.body.className += ' notouch' : document.body.className = 'notouch';
	}
}
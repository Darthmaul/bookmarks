const defaultBookmarks = [
	{ 
		title: 'Some of my photography',
		url: 'https://c4.staticflickr.com/1/773/22353007131_8cf5803bc8_k.jpg',
		domain: 'www.flickr.com',
		text: '# Go see it on Flickr! \n\n By the way, these bookmarks support markdown!',
		tags: ['default bookmark', 'photography'],
		slug: 'some-of-my-photography',
		date: new Date
	},
	{
		title: 'Github profile',
		url: 'http://github.com/ergusto', 
		domain: 'www.github.com',
		notes: 'You can see this project on Github.',
		tags: ['default bookmark'],
		slug: 'github-profile',
		date: new Date
	},
	{
		title: 'Twitter profile',
		url: 'http://twitter.com/ergusto', 
		domain: 'www.twitter.com',
		notes: 'Tweet terwoo',
		tags: ['default bookmark'],
		slug: 'twitter-profile',
		date: new Date
	}
];

export default defaultBookmarks;
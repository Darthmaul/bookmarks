const defaultBookmarks = [
	{ 
		title: 'Some of my photography',
		url: 'https://www.flickr.com/photos/fergusruston/',
		domain: 'www.flickr.com',
		text: 'Go see it on Flickr!',
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
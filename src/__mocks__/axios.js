const mockResponse = {
	data: '# sample title\n article text',
};

export const fetchContent = (slug) => {
	if (slug === 'foo') {
		return new Promise((resolve, reject) => {
			reject(new Error('Not found'));
		});
	} else {
		return new Promise(resolve => {
			resolve(mockResponse);
		});
	}
};

import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.VUE_APP_REQUESTS_BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
});

const contentSource = axios.create({
	baseURL: '/docs',
});

export const fetchContent = (slug) => (contentSource.get(`/${slug}.md`));

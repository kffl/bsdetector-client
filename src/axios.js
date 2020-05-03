import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.VUE_APP_REQUESTS_BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
});

export const fetchContent = (slug) => (axios.create({
	baseURL: `/docs/${slug}.md`,
	headers: {
		'content-type': 'application/json',
	},
}));

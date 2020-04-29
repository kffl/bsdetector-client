import axios from 'axios';
console.log(process.env);
export const api = axios.create({
	baseURL: process.env.VUE_APP_BACKEND_ADDR,
	headers: {
		'content-type': 'application/json',
	},
});

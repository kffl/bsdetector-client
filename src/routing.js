import Vue from 'vue';
import VueRouter from 'vue-router';
import { TheLandingPage, TheCodeEditor } from './views/index';

Vue.use(VueRouter);

export const router = new VueRouter({
	routes: [
		{ path: '/', component: TheLandingPage },
		{ path: '/editor', component: TheCodeEditor },
	],
});

import Vue from 'vue';
import VueRouter from 'vue-router';
import { TheLandingPage } from './views/index';

Vue.use(VueRouter);

export const router = new VueRouter({
	routes: [
		{ path: '/', component: TheLandingPage },
	],
});

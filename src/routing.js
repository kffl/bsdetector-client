import Vue from 'vue';
import VueRouter from 'vue-router';
import { TheLandingPage, TheCodeEditor, TheCodeUploader, TheKnowledgeBase } from './views/index';

Vue.use(VueRouter);

export const router = new VueRouter({
	routes: [
		{ path: '/', component: TheLandingPage },
		{ path: '/editor', component: TheCodeEditor },
		{ path: '/upload', component: TheCodeUploader },
		{ path: '/knowledge-base', component: TheKnowledgeBase },
		{ path: '/knowledge-base/:slug', component: TheKnowledgeBase },
	],
});

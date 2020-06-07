import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './routing';
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars.js';

Vue.config.productionTip = false;

const requireComponent = require.context('./components', false, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach((fileName) => {
	const componentConfig = requireComponent(fileName);
	const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
	Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.use(VueCodemirror);

new Vue({
	vuetify,
	router,
	render: (h) => h(App),
}).$mount('#app');

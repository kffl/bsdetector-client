import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './routing';

Vue.config.productionTip = false;

const requireComponent = require.context('./components', false, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach((fileName) => {
	const componentConfig = requireComponent(fileName);
	const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
	Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
	vuetify,
	router,
	render: (h) => h(App),
}).$mount('#app');

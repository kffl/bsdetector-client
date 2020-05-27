<template lang='pug'>
	v-app
		the-app-bar
		v-content
			router-view(class='py-4')
		v-footer(app, absolute, class='font-weight-light justify-center text-center text-truncate')
			| JavaScript Code Smells Detector - Paweł Kuffel, Bartosz Paulewicz, Tomasz Pućka, Marcin Rochowiak
</template>

<script>
import TheAppBar from './components/TheAppBar';
export default {
	name: 'App',
	components: {
		TheAppBar,
	},
};
</script>

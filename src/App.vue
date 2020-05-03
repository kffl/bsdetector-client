<template lang='pug'>
	v-app
		base-app-bar
		v-content
			router-view(class='py-4')
		v-footer(app, absolute, class='font-weight-light justify-center text-center') JavaScript Code Smells Detector - Paweł Kuffel, Bartosz Paulewicz, Tomasz Pućka, Marcin Rochowiak
</template>

<script>
export default {
	name: 'App',
};
</script>

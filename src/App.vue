<template lang='pug'>
	v-app
		v-app-bar(app, color='green', dark, dense)
			v-toolbar-title JavaScript Code Smells Detector
			v-spacer
			v-btn(to='/upload', text) Code upload
			v-btn(to='/editor', text) Code editor
			v-btn(to='/', text) Home page

		v-content
			router-view(class='py-4')

		v-footer(app, absolute, class='font-weight-light justify-center text-center') JavaScript Code Smells Detector - Paweł Kuffel, Bartosz Paulewicz, Tomasz Pućka, Marcin Rochowiak
</template>

<script>
export default {
	name: 'App',
};
</script>

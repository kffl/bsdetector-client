<template lang="pug">
		v-app-bar(app, color='green', dark, dense)
			v-toolbar-title JavaScript Code Smells Detector
			v-spacer
			v-btn(to='/knowledge-base', text) Knowledge base
			v-btn(to='/upload', text) Code upload
			v-btn(to='/editor', text) Code editor
			v-btn(to='/', text) Home page
</template>

<script>
export default {
	name: 'TheAppBar',
};
</script>

<template lang="pug">
		v-app-bar(class='app-bar', app, color='green', dark, dense)
			v-toolbar-title
				router-link(to='/', class='toolbar-title') JavaScript Code Smells Detector
			v-spacer
			v-btn(to='/knowledge-base', text) Knowledge base
			v-btn(to='/public-github-repo-analysis', text) Repo analysis
			v-btn(to='/upload', text) Code upload
			v-btn(to='/editor', text) Code editor
</template>

<script>
export default {
	name: 'TheAppBar',
};
</script>

<style lang="scss">
.app-bar {
	z-index: 50 !important; // overlay codemirror elements
}

.toolbar-title {
	color: white !important;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
}
</style>

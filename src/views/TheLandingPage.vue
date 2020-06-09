<template lang='pug'>
	v-container(class='fill-height', fluid)
		v-row(class='flex-column landing-page-row', align='center')
			h1(class='display-2 mb-1 font-weight-light text-center') JAVASCRIPT CODE SMELLS DETECTOR
			h2(class='headline mb-4 font-weight-light text-center') Provide JavaScript code and detect various code smells inside it.
			v-btn(to='/editor', class='px-10', x-large, color='green', dark) Get started!
			h3(class='headline font-weight-regular mb-1 statistics-header') Statistics
			p(v-for='(stat, statName) in stats', :key='statName', class='mb-1 grey--text text--darken-1')
				| Total number of {{ stat.title }} - #[vue-odometer(:value='stat.value')]

		base-snackbar(ref='snackbar')
</template>

<script>
// import { api } from '../axios';
import VueOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';

export default {
	name: 'TheLandingPage',
	components: {
		VueOdometer,
	},

	data: () => ({
		stats: {
			analyzedLines: { title: 'analyzed lines of code', value: 0 },
			detectedSmells: { title: 'detected code smells', value: 0 },
			analyzedFiles: { title: 'analyzed files', value: 0 },
			analyzedRepos: { title: 'analyzed repositories', value: 0 },
		},
	}),

	mounted () {
		// TODO: use code similar to the one below to fetch statistics from server.

		// api.get('stats').then(res => {
		// 		this.stats.analyzedLines = res.data.analyzedLines;
		// 		this.stats.detectedSmells = res.data.detectedSmells;
		// 		this.stats.analyzedFiles = res.data.analyzedFiles;
		// 		this.stats.analyzedRepos = res.data.analyzedRepos;
		// }).catch(err => {
		// 	const data = err.response.data;
		// 	this.$refs.snackbar.show(`Error! ${data.message ? data.message : 'Code smells detection failed'}.`);
		// });

		// TODO: remove. for testing purposes.
		this.stats.analyzedLines.value = 1100;
		this.stats.detectedSmells.value = 1000;
		this.stats.analyzedFiles.value = 900;
		this.stats.analyzedRepos.value = 800;
	},
};
</script>
<style lang="scss">
.landing-page-row {
	margin-top: 10vh;
}

.statistics-header {
	margin-top: 60px;
}
</style>

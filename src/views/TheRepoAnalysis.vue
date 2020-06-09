<template lang='pug'>
	v-container(class='fill-height', fluid)
		v-row(class='form-container', justify='center', align='center')
			div
				h3(class='headline font-weight-regular text-center') Analyze public GitHub repository
				h4(class='subtitle-1 font-weight-regular text-center grey--text text--darken-1') Provide the details of a repository you wish to detect smells in.
				v-form(ref='form', class='mt-6 d-flex flex-column', @submit.native.prevent)
					v-text-field(
						v-model='username',
						autofocus,
						color='green',
						label='Username',
						outlined,
						:rules='repoDataRules',
						)
					v-text-field(
						v-model='repoName',
						color='green',
						label='Repository name',
						outlined,
						:rules='repoDataRules',
						)
					v-btn(class='mt-2', type='submit', color='green', dark, large, :loading='isLoading', @click='detectSmells') Detect code smells

		v-row(v-show='detectorResult.length', ref='smellsContainer', class='pt-12' justify='center', no-gutters)
			v-col(class='d-flex flex-column', md='12', lg='11', xl='10')
				h3(class='headline font-weight-regular mb-0') Detected code smells in repository files
				base-files-smells-expansion-panels(:detectorResult='detectorResult')

		base-snackbar(ref='snackbar')
</template>

<script>
import { api } from '../axios';

export default {
	name: 'TheRepoAnalysis',

	data: () => ({
		username: '',
		repoName: '',
		repoDataRules: [value => !!value || 'This field is required.'],
		detectorResult: [],
		isLoading: false,
	}),

	methods: {
		async detectSmells () {
			if (!this.$refs.form.validate()) return;
			this.isLoading = true;

			api.post('analyzerepo', {
				username: this.username,
				reponame: this.repoName,
			}).then(async res => {
				this.detectorResult = []; // complete rerender is required for codemirror to work correctly
				await this.$nextTick();
				this.detectorResult = res.data;
				await this.$nextTick();
				this.$refs.smellsContainer.scrollIntoView({ behavior: 'smooth' });
			}).catch(err => {
				const data = err.response.data;
				this.$refs.snackbar.show(`Error! ${data.message ? data.message : 'Code smells detection failed'}.`);
			}).then(() => { this.isLoading = false; });
		},
	},
};
</script>

<style lang="scss">
@import '../styles/common';

.form-container {
	height: calc(100vh - #{$common__filled-viewport-height});
}
</style>

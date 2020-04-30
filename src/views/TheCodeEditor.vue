<template lang='pug'>
	v-row(class='align-self-start', justify='center', no-gutters)
		v-col(class='d-flex flex-column', md='11', lg='9', xl='8')
			h3(class='headline font-weight-regular mb-1 align-self-start') Code editor
			v-textarea(
				class='editor-textarea',
				v-model='code',
				autofocus,
				color='green',
				full-width,
				height='72vh',
				no-resize,
				outlined,
				placeholder='Write your code here...',
				:rules='codeEditorRules',
				)
			v-btn(color='green', dark, large, :loading='isLoading', @click='detectSmells') Detect code smells

			h3(v-show='!!detectorResult', class='headline font-weight-regular mt-8 mb-1 align-self-start') Detected code smells
			base-smells-expansion-panels(ref='smellsAccordion', :detectorResult='detectorResult')

		v-snackbar(v-model='snackbar.visibility', :timeout='snackbar.timeout', top, right, color='error')
			| {{ snackbar.message ? snackbar.message : 'Error! Code smells detection failed.' }}
</template>

<script>
import { api } from '../axios';

export default {
	name: 'TheCodeEditor',

	data: () => ({
		code: '',
		codeEditorRules: [value => !!value || 'In order to run detection, it\'s required to provide code.'],
		detectorResult: null,
		snackbar: {
			visibility: false,
			message: '',
			timeout: 4000,
		},
		isLoading: false,
	}),

	watch: {
		'snackbar.visibility': function () {
			if (!this.snackbar.visibility) this.snackbar.message = '';
		},
	},

	methods: {
		detectSmells () {
			if (!this.code) return;
			this.isLoading = true;

			api.post('analyze', {
				code: this.code,
			}).then(res => {
				this.detectorResult = res.data;
				this.$nextTick(() => { this.$refs.smellsAccordion.$el.scrollIntoView({ behavior: 'smooth' }); });
			}).catch(err => {
				this.snackbar.visibility = true;
				const data = err.response.data;
				if (data.message) this.snackbar.message = `Error! ${data.message}.`;
			}).then(() => { this.isLoading = false; });
		},
	},
};
</script>

<style lang="scss">
@import '../styles/common';

.editor-textarea textarea {
	@include common__code;
}
</style>

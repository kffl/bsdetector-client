<template lang='pug'>
	v-container(class='fill-height', fluid)
		v-row(justify='center', no-gutters)
			v-col(class='d-flex flex-column', md='11', lg='9', xl='8')
				h3(class='headline font-weight-regular mb-1 align-self-start') Code editor
				v-form(ref='form')
					v-textarea(
						class='editor-textarea',
						v-model='code',
						autofocus,
						color='green',
						full-width,
						height='calc(100vh - 230px)',
						no-resize,
						outlined,
						placeholder='Write your code here...',
						:rules='codeEditorRules',
						)
				v-btn(color='green', dark, large, :loading='isLoading', @click='detectSmells') Detect code smells

				div(v-show='!!detectorResult')
					div(ref='smellsContainer', class='d-flex flex-column pt-12')
						h3(class='headline font-weight-regular mb-1') Detected code smells
						base-smells-expansion-panels(:detectorResult='detectorResult')

			base-snackbar(ref='snackbar')
</template>

<script>
import { api } from '../axios';

export default {
	name: 'TheCodeEditor',

	data: () => ({
		code: '',
		codeEditorRules: [value => !!value || 'In order to run detection, it\'s required to provide code.'],
		detectorResult: null,
		isLoading: false,
	}),

	methods: {
		detectSmells () {
			if (!this.$refs.form.validate()) return;
			this.isLoading = true;

			api.post('analyze', { code: this.code }).then(res => {
				this.detectorResult = res.data;
				this.$nextTick(() => { this.$refs.smellsContainer.scrollIntoView({ behavior: 'smooth' }); });
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

.editor-textarea textarea {
	@include common__code;
}
</style>

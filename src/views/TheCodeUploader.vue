<template lang='pug'>
	v-container(class='fill-height', fluid)
		v-row(
			ref='dropArea',
			:class="{ 'dragged-over': isDraggedOver }",
			class='drop-area',
			justify='center',
			align='center',
			@dragenter='isDraggedOver = true',
			@dragleave='isDraggedOver = $refs.dropArea.contains($event.relatedTarget)',
			@drop.prevent='handleFilesUpload',
			@dragover.prevent,
			)
			div(class='d-flex flex-column ma-4')
				h3(class='headline font-weight-regular text-center') Upload files using field below or by dragging it on this area.
				v-form(ref='form', class='mt-2')
					v-file-input(
						v-model='files',
						class='mx-6',
						accept='.js',
						autofocus,
						backgroundColor='white',
						chips,
						color='green',
						multiple,
						outlined,
						placeholder='Click here to upload file...',
						:rules='fileInputRules',
						:show-size='1024',
						@change='handleFilesUpload',
						)
				v-btn(class='px-10 align-self-center', color='green', dark, large, :loading='isLoading', @click='detectSmells') Detect code smells

		v-row(v-show='detectorResult.length', ref='smellsContainer', class='pt-12' justify='center', no-gutters)
			v-col(class='d-flex flex-column', md='12', lg='11', xl='10')
				h3(class='headline font-weight-regular mb-1') Detected code smells in files
				base-files-smells-expansion-panels(:detectorResult='detectorResult')

		base-snackbar(ref='snackbar')
</template>

<script>
import { api } from '../axios';
import { uniqWith } from 'lodash';

export default {
	name: 'TheCodeUploader',

	data: () => ({
		files: [],
		fileInputRules: [
			value => !!value.length || 'In order to run detection, it\'s required to provide some files.',
			value => value.every(file => file.type === 'text/javascript') || 'Only JavaScript files are allowed.',
			value => value.length <= 10 || 'Limit of uploaded files equals 10.',
		],
		detectorResult: [],
		isDraggedOver: false,
		isLoading: false,
	}),

	methods: {
		handleFilesUpload (data) {
			const getUniqueFiles = (files1, files2) => uniqWith(
				files1.concat(...files2),
				(a, b) => a.name === b.name && a.lastModified === b.lastModified && a.size === b.size,
			);

			this.isDraggedOver = false;
			const files = data instanceof DragEvent ? [...data.dataTransfer.files] : data;
			if (files.length) this.files = getUniqueFiles(this.files, files);
		},

		detectSmells () {
			if (!this.$refs.form.validate()) return;
			this.isLoading = true;

			const formData = new FormData();
			this.files.forEach((file) => { formData.append('code', file); });
			api.post('analyzemultipart', formData, { headers: { 'content-type': 'multipart/form-data' } }).then(res => {
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

<style lang="scss" scoped>
@import '../styles/common';

$drop-area-margin-y: 12px;
$drop-area-margin-x: 24px;

.dragged-over {
	background: $colors__grey-lighten-3;
}

.drop-area {
	margin: $drop-area-margin-y $drop-area-margin-x;
	height: calc(100vh - #{$common__filled-viewport-height + 2 * $drop-area-margin-y});
	border: 3px dashed $colors__green-base;
}
</style>

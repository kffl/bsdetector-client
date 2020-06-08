<template lang='pug'>
	div
		p(class='body-2 mb-1 grey--text text--darken-5').
			Total number of detected code smells - {{ totalNumberOfDetectedSmells }},
			files analyzed - {{ detectorResult.length }},
			lines analyzed - {{ totalNumberOfAnalyzedLines }}
		v-expansion-panels(multiple, hover, :value='expandedPanels')
			v-expansion-panel(
				v-for='(fileSmells, i) in detectorResult',
				:key='i',
				:class="{ 'file-expansion-panel': i < detectorResult.length - 1}",
				)
				v-expansion-panel-header(color='grey lighten-4', ripple)
					span(class='panel-header title font-weight-medium') {{ fileSmells.fileName }}
				v-expansion-panel-content(class='py-2')
					p(v-if="fileSmells.error", class='title font-weight-regular ma-0')
						| Error! {{ fileSmells.error.message ? fileSmells.error.message : 'Code smells detection failed.' }}.
					base-smells-expansion-panels(v-else, :detectorResult='fileSmells', :use-container-for-clean-code='false')
</template>

<script>
export default {
	name: 'BaseFilesSmellsExpansionPanels',

	props: {
		detectorResult: {
			type: Array,
			default: () => [],
		},
	},

	computed: {
		totalNumberOfDetectedSmells: function () {
			return this.detectorResult.reduce(
				(totalNoSmells, fileSmells) =>
					fileSmells.smellsDetected.reduce((fileNoSmells, smells) => smells.occurrences.length + fileNoSmells, 0) + totalNoSmells, 0,
			);
		},
		totalNumberOfAnalyzedLines: function () {
			return this.detectorResult.reduce((acc, fileSmells) => fileSmells.linesAnalyzed + acc, 0);
		},
		expandedPanels: function () {
			return [...Array(this.detectorResult.length).keys()];
		},
	},
};
</script>

<style lang="scss">
@import '../styles/common';

.file-expansion-panel {
	margin-bottom: 24px;
}

.panel-header {
	text-transform: uppercase;
}
</style>

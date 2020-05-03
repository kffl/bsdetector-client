<template lang='pug'>
	v-expansion-panels(multiple, hover, :value='expandedPanels')
		v-expansion-panel(
			v-for='(fileSmells, i) in detectorResult',
			:key='i',
			:class="{ 'file-expansion-panel': i < detectorResult.length - 1}",
			)
			v-expansion-panel-header(color='grey lighten-4', ripple)
				span(class='panel-header title font-weight-medium') {{ fileSmells.fileName }}
			v-expansion-panel-content(class='pt-4')
				p(v-if="fileSmells.error", class='title font-weight-regular ma-0')
					| Error! {{ fileSmells.error.message ? fileSmells.error.message : 'Code smells detection failed.' }}.
				base-smells-expansion-panels(v-else, :detectorResult='fileSmells')

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
		expandedPanels: function () {
			return [...Array(this.detectorResult.length).keys()];
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../styles/common';

.file-expansion-panel {
	margin-bottom: 24px;
}

.panel-header {
	text-transform: uppercase;
}
</style>

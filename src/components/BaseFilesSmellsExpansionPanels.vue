<template lang='pug'>
	v-expansion-panels(multiple, hover, :value='expandedPanels')
		v-expansion-panel(v-for='(fileSmells, i) in detectorResult', :key='i', :class="{ 'file-expansion-panel': i < detectorResult.length - 1}")
			v-expansion-panel-header(color='grey lighten-4', ripple)
				span(class='panel-header title font-weight-medium') {{ fileSmells.fileName }}
			v-expansion-panel-content(class='pt-4')
				base-smells-expansion-panels(v-if='fileSmells', :detectorResult='fileSmells')
				p(v-else-if="fileSmells.error", class='title ma-0') {{ fileSmells.error }}

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

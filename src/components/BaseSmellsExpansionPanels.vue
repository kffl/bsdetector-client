<template lang='pug'>
	v-expansion-panels(v-if='detectedSmells.length', multiple, hover, :value='expandedPanels')
		v-expansion-panel(v-for='(smell, i) in detectedSmells', :key='i')
			v-expansion-panel-header(color='grey lighten-5', ripple)
				span(class='subtitle-1 font-weight-medium') {{ smell.smellName.toUpperCase() }}
			v-expansion-panel-content
				p(class='mt-2 mb-4 grey--text text--darken-1') {{ smell.smellDescription }}
				h6(class='title font-weight-regular') Occurrences
				v-card(v-for='(occurrence, j) in smell.occurrences', :key='j', class='occurrence-container grey lighten-4 px-2', outlined, tile)
					code(class='occurrence-snippet font-weight-medium') {{ occurrence.snippet }}
	v-card(v-else-if='!!detectorResult')
		v-card-text(class='title font-weight-regular text--primary') No smells detected! Your code is clean.

</template>

<script>
export default {
	name: 'BaseSmellsExpansionPanels',

	props: {
		detectorResult: {
			type: Object,
			default: null,
		},
	},

	data: () => ({
		detectedSmells: [],
		expandedPanels: [],
	}),

	watch: {
		detectorResult: function () {
			this.detectedSmells = this.detectorResult.smellsDetected.filter((smell) => smell.occurrences.length);
			this.expandedPanels = [...Array(this.detectedSmells.length).keys()];
		},
	},
};
</script>

<style lang="scss">
@import '../styles/common';

.occurrence-container + .occurrence-container {
	margin-top: 12px;
}

.occurrence-container .occurrence-snippet {
	@include common__code;

	width: 100%;
	background: none;
	color: inherit;
	box-shadow: none;
}
</style>

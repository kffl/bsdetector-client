<template lang='pug'>
- const cleanCodeMessage = 'No smells detected! Your code is clean.';

	v-expansion-panels(v-if='detectedSmells.length', multiple, hover, :value='expandedPanels')
		v-expansion-panel(v-for='(smell, i) in detectedSmells', :key='i')
			v-expansion-panel-header(color='grey lighten-5', ripple)
				span(class='panel-header subtitle-1 font-weight-medium') {{ smell.smellName }}
			v-expansion-panel-content
				p(class='mt-2 mb-4 grey--text text--darken-1') {{ smell.smellDescription }}
				h6(class='title font-weight-regular') Occurrences
				v-card(v-for='(occurrence, j) in smell.occurrences', :key='j', class='occurrence-container grey lighten-4 px-2', outlined, tile)
					code(class='occurrence-snippet font-weight-medium') {{ occurrence.snippet }}
	v-card(v-else-if='!!detectorResult && useContainerForCleanCode')
		v-card-text(class='title font-weight-regular text--primary')= cleanCodeMessage
	p(v-else-if='!!detectorResult', class='title font-weight-regular ma-0')= cleanCodeMessage
</template>

<script>
export default {
	name: 'BaseSmellsExpansionPanels',

	props: {
		detectorResult: {
			type: Object,
			default: null,
		},
		useContainerForCleanCode: {
			type: Boolean,
			default: true,
		},
	},

	computed: {
		detectedSmells: function () {
			return this.detectorResult ? this.detectorResult.smellsDetected.filter((smell) => smell.occurrences.length) : [];
		},
		expandedPanels: function () {
			return [...Array(this.detectedSmells.length).keys()];
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../styles/common';

.panel-header {
	text-transform: uppercase;
}

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

.occurrence-container .occurrence-snippet::before {
	content: none;
}
</style>

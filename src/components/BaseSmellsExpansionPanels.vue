<template lang='pug'>
- const cleanCodeMessage = 'No code smells detected! Your code is clean.';
	div
		p(class='body-2 grey--text text--darken-5', :class="numberOfDetectedSmells ? 'mb-2' : 'mb-0'")
			template(v-if='numberOfDetectedSmells')
				| Number of detected code smells - {{ numberOfDetectedSmells }}, lines analyzed - {{ detectorResult.linesAnalyzed }}
			template(v-else-if='!!detectorResult') Number of analyzed lines - {{ detectorResult.linesAnalyzed }}
		v-expansion-panels(v-if='detectedSmells.length', multiple, hover, :value='expandedPanels')
			v-expansion-panel(v-for='(smell, i) in detectedSmells', :key='i')
				v-expansion-panel-header(color='grey lighten-5', ripple)
					span(class='panel-header subtitle-1 font-weight-medium') {{ smell.smellMeta.title }}
				v-expansion-panel-content
					p(class='mt-2 mb-2 grey--text text--darken-1') {{ smell.smellMeta.description }}
					router-link(:to='`/knowledge-base/${smell.smellMeta.slug}`', target='_blank') Learn more about this smell.
					h6(class='title font-weight-regular mt-3') Occurrences
					codemirror(
						ref='codeMirrorSnippets',
						v-for='(occurrence, j) in smell.occurrences',
						:key='j',
						class='smells-code-mirror',
						:value='occurrence.snippet',
						:options='snippetCodeMirrorOptions'
						)
		v-card(v-else-if='!!detectorResult && useContainerForCleanCode')
			v-card-text(class='title font-weight-regular text--primary')= cleanCodeMessage
		p(v-else-if='!!detectorResult', class='title font-weight-regular mb-0 mt-3')= cleanCodeMessage
</template>

<script>
import smells from '../resources/smells';

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

	data: () => ({
		snippetCodeMirrorOptions: {
			tabSize: 2,
			mode: 'text/javascript',
			lineNumbers: true,
			readOnly: 'nocursor',
			scrollbarStyle: 'simple',
		},
	}),

	computed: {
		detectedSmells: function () {
			var result = this.detectorResult ? this.detectorResult.smellsDetected.filter((smell) => smell.occurrences.length) : [];
			return result.map((smell) => ({ ...smell, smellMeta: smells.find(el => el.name === smell.smellName) }));
		},
		numberOfDetectedSmells: function () {
			return this.detectedSmells.reduce((acc, smell) => smell.occurrences.length + acc, 0);
		},
		expandedPanels: function () {
			return [...Array(this.detectedSmells.length).keys()];
		},
	},

	watch: {
		detectedSmells: {
			deep: true,
			immediate: true,
			handler: function () {
				const occurrences = this.detectedSmells.reduce((acc, smell) => [...acc, ...smell.occurrences], []);
				this.$nextTick(() => {
					if (!this.$refs.codeMirrorSnippets || !occurrences.length) return;
					this.$refs.codeMirrorSnippets.forEach((snippet, i) => {
						snippet.codemirror.setOption('firstLineNumber', occurrences[i].lineStart);
						snippet.codemirror.markText(
							{ line: 0, ch: occurrences[i].colStart - 1 },
							{ line: occurrences[i].lineEnd - occurrences[i].lineStart, ch: occurrences[i].colEnd - 1 },
							{ className: 'smell-highlight' },
						);
					});
				});
			},
		},
	},
};
</script>

<style lang="scss">
.panel-header {
	text-transform: uppercase;
}

.smells-code-mirror {
	.CodeMirror {
		background: #fcfcfc;
		height: auto;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	& + & {
		margin-top: 12px;
	}
}

.smell-highlight {
	background-color: #ffdada;
}
</style>

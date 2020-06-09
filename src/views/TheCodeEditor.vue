<template lang='pug'>
	v-container(class='fill-height', fluid)
		v-row(justify='center', no-gutters)
			v-col(class='d-flex flex-column', md='12', lg='10', xl='9')
				div(class='d-flex justify-space-between align-center mb-1')
					h3(class='headline font-weight-regular') Code editor
					v-dialog(v-model='helperDialog', max-width='600')
						template(#activator='{ on }')
							v-btn(class='title', color='grey lighten-1', outlined, icon, small, v-on='on') ?
						v-card
							v-card-title(class='grey lighten-3') Keybindings
							v-card-text(class='mt-4 keybindings-content').
								#[h3 Ctrl-Space]
								Autocomplete
								#[h3 Ctrl-F / Cmd-F]
								Find
								#[h3 Ctrl-G / Cmd-G]
								Find next
								#[h3 Shift-Ctrl-G / Shift-Cmd-G]
								Find previous
								#[h3 Shift-Ctrl-F / Cmd-Option-F]
								Replace
								#[h3 Shift-Ctrl-R / Shift-Cmd-Option-F]
								Replace all
								#[h3 Alt-F]
								Persistent find (without autoclose, 'Enter' to find next, 'Shift-Enter' to find previous)
								#[h3 Alt-G]
								Jump to line

				codemirror(ref='editor', v-model='code', class='code-editor-code-mirror' :options='codeMirrorOptions')
				v-btn(color='green', dark, large, :loading='isLoading', @click='detectSmells') Detect code smells

				div(v-show='!!detectorResult')
					div(ref='smellsContainer', class='d-flex flex-column pt-12')
						h3(class='headline font-weight-regular mb-1') Detected code smells
						base-smells-expansion-panels(ref='smellsPanel', :detectorResult='detectorResult')

			base-snackbar(ref='snackbar')
</template>

<script>
import { api } from '../axios';
import 'codemirror/lib/codemirror.css';

const codeCharactersLimit = 100000;

export default {
	name: 'TheCodeEditor',

	data: () => ({
		code: '',
		codeMirrorOptions: {
			tabSize: 2,
			mode: 'text/javascript',
			extraKeys: {
				'Ctrl-Space': 'autocomplete',
				'Alt-F': 'findPersistent',
			},
			highlightSelectionMatches: { annotateScrollbar: true },
			lineNumbers: true,
			autofocus: true,
			matchBrackets: true,
			autoCloseBrackets: true,
			styleActiveLine: { nonEmpty: true },
			scrollbarStyle: 'simple',
		},
		detectorResult: null,
		isLoading: false,
		helperDialog: false,
	}),

	methods: {
		detectSmells () {
			if (!this.code) {
				this.$refs.snackbar.show('Error! In order to run detection, it\'s required to provide code.');
				return;
			} else if (this.code.length > codeCharactersLimit) {
				this.$refs.snackbar.show(`Error! Provided code length is too big. Maximal code length is ${codeCharactersLimit} characters.`);
				return;
			}
			this.isLoading = true;

			api.post('analyze', { code: this.code }).then(res => {
				this.detectorResult = res.data;
				this.$nextTick(() => {
					this.$refs.smellsContainer.scrollIntoView({ behavior: 'smooth' });
					if (!this.$refs.smellsPanel.detectedSmells) return;
					this.$refs.smellsPanel.detectedSmells.forEach((smell) => {
						smell.occurrences.forEach((occurrence) => {
							this.$refs.editor.codemirror.markText(
								{ line: occurrence.lineStart - 1, ch: occurrence.colStart - 1 },
								{ line: occurrence.lineEnd - 1, ch: occurrence.colEnd - 1 },
								{ className: 'smell-highlight' },
							);
						});
					});
				});
			}).catch(err => {
				const data = err.response.data;
				this.$refs.snackbar.show(`Error! ${data.message ? data.message : 'Code smells detection failed'}.`);
			}).then(() => { this.isLoading = false; });
		},
	},
};
</script>

<style lang="scss">
	.code-editor-code-mirror {
		.CodeMirror {
			height: calc(100vh - 220px);
			margin-bottom: 24px;
			border: 1px solid #ddd;
			border-radius: 4px;

			&-focused {
				border: 1px solid #999;
			}

			&-selection-highlight-scrollbar {
				background-color: #97e099;
				opacity: 0.5;
			}
		}

		.cm-matchhighlight {
				background-color: #bbecbd;
		}
	}

	.keybindings-content h3 {
		margin-top: 8px;
	}
</style>

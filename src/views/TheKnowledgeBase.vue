<template>
  <v-container>
    <h1>Knowledge Base</h1>
    <p v-if="loading">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </p>
    <div v-if="error">
      <h2>404</h2>
      <p>The requested page was not found</p>
      <v-btn to="/">Go back</v-btn>
    </div>
    <div v-if="content">
      <vue-markdown v-bind:source="content" />
    </div>
  </v-container>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { fetchContent } from '../axios';
import smells from '../resources/smells';

export default {
	data () {
		return {
			loading: false,
			error: null,
			content: null,
		};
	},
	created () {
		if (smells.some(smell => smell.slug === this.$route.params.slug)) {
			this.fetchPageContent();
		} else {
			this.error = true;
		}
	},
	watch: {
		$route: 'fetchPageContent',
	},
	methods: {
		fetchPageContent () {
			this.error = this.content = null;
			this.loading = true;
			fetchContent(this.$route.params.slug)
				.get('')
				.then(res => {
					this.loading = false;
					this.content = res.data;
				})
				.catch(err => {
					this.loading = false;
					this.error = err;
				});
		},
	},
	components: {
		VueMarkdown,
	},
};
</script>

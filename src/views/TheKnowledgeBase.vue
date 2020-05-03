<template>
  <div class="outer-container">
    <v-navigation-drawer width="400">
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">

          <v-list-item-content>
            <v-list-item-title class="list-header">Knowledge Base</v-list-item-title>
            <v-list-item-subtitle>Availiable smells</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in navSmells" :key="item.title" link :to='"/knowledge-base/" + item.slug'>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container class="content">
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
			<div v-if="mainPage">
				<h1>Knowledge base</h1>
				<p>Welcome to the knowledge base. Here you can find detailed explenations of code smells that are being detected in your code.</p>
			</div>
    </v-container>
  </div>
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
			navSmells: smells,
			mainPage: false,
		};
	},
	created () {
		if (!this.$route.params.slug) {
			this.mainPage = true;
			return;
		}
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

<style scoped>
	.outer-container {
		padding: 0 !important;
		height: 100%;
		display: flex;
	}
	.content {
		padding: 32px;
	}
	.list-header {
		font-size: 1.6em !important;
		line-height: 1.6em !important;
	}
</style>
<style>
	.content code::after, .content code::before {
		content: none !important;
	}
	.content code, .content code{
		padding: 8px !important;
		margin-top: 10px;
		width: 100%;
	}
</style>

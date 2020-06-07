<template>
	<div class="outer-container">
		<v-navigation-drawer permanent width="400">
			<div class='mx-4 mb-2'>
				<h3 class="title font-weight-medium">Knowledge Base</h3>
				<h4 class='subtitle font-weight-regular'>Available smells</h4>
			</div>

			<v-divider></v-divider>

			<v-list dense nav>
				<v-list-item v-for="item in navSmells" :key="item.title" link :to='"/knowledge-base/" + item.slug'>
					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-container class="content">
			<p v-show="loading">
				<v-progress-circular indeterminate color="red"></v-progress-circular>
			</p>
			<div v-if="error">
				<h2>404</h2>
				<p>The requested page was not found</p>
				<v-btn to="/">Go back</v-btn>
			</div>
			<div v-else-if="content">
				<vue-markdown v-bind:source="content" />
			</div>
			<div v-if="mainPage && !loading">
				<h1>Knowledge base</h1>
				<p>Welcome to the knowledge base. Here you can find detailed explanations of code smells that are being detected in your code.</p>
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
		this.initialize();
	},
	watch: {
		$route: 'initialize',
	},
	methods: {
		initialize () {
			if (!this.$route.params.slug) {
				this.mainPage = true;
				this.content = null;
				this.error = null;
				return;
			}
			if (smells.some(smell => smell.slug === this.$route.params.slug)) {
				this.fetchPageContent();
			} else {
				this.error = true;
			}
		},
		fetchPageContent () {
			this.error = this.content = null;
			this.mainPage = false;
			this.loading = true;
			fetchContent(this.$route.params.slug)
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

<style>
	.outer-container {
		padding: 0;
		height: 100%;
		display: flex;
	}

	.content {
		padding: 32px;
	}

	.content code::after, .content code::before {
		content: none;
	}

	.content code, .content code {
		padding: 8px;
		margin-top: 10px;
		width: 100%;
	}
</style>

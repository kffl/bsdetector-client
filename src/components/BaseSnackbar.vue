<template lang='pug'>
v-snackbar(v-model='visibility', :timeout='timeout', top, right, :color='color') {{ message }}
</template>

<script>
export default {
	name: 'BaseSnackbar',

	data: () => ({
		visibility: false,
		message: '',
		timeout: 4000,
		color: '',
	}),

	methods: {
		show (message = 'Error!', color = 'red darken-1') {
			this.message = message;
			this.color = color;
			this.visibility = true;
		},
	},
};
</script>

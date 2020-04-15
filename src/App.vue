<template lang='pug'>
	v-app
		v-app-bar
		v-content
			v-containter(fluid)
				router-view
		v-footer
</template>

<script>
export default {
	name: 'App',
};
</script>

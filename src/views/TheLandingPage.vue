<template lang='pug'>
	v-row(class='flex-column', align='center')
		h1(class='display-2 mb-1 font-weight-light') JAVASCRIPT CODE SMELLS DETECTOR
		h2(class='headline mb-4 font-weight-light') Provide your JavaScript code and detect various code smells inside it.
		v-btn(to='/editor', class='px-10', x-large, color='green', dark) Get started!
</template>

<script>
export default {
	name: 'TheLandingPage',
};
</script>

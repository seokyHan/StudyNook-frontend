<template>
	<div id="app">
		<Header v-if="this.mountHeader" />
		<div class="app__contents">
			<RouterView />
		</div>
		<Footer v-if="this.mountFooter" />
	</div>
</template>

<script>
export default {
	name: 'App',
	
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
@import './scss/antDesign.scss';
@import './scss/reset.scss';
@import './scss/common.scss';
</style>

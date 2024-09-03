<template>
  <div id="app">
    <Header v-if="this.mountHeader" />
    <div>
      <RouterView />
    </div>
    <Footer v-if="this.mountFooter" />
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  computed: {
    mountHeader() {
      return this.$route.name !== 'NotFound';
    },
    mountFooter() {
      return (
        this.$route.fullPath !== '/test' && this.$route.name !== 'NotFound'
      );
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://unpkg.com/swiper@6.8.4/swiper-bundle.min.css');
@import './css/antDesign.css';
@import './css/common.css';
@import './css/reset.css';
</style>

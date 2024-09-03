<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header id="header">
    <RouterLink to="/" class="header__title"></RouterLink>
    <HeaderNavigation />
  </header>
</template>

<script>
import HeaderNavigation from '@/components/common/HeaderNavigation.vue';
export default {
  components: {
    HeaderNavigation,
  },
};
</script>

<style lang="css" scoped>
@import './css/header.css';
</style>

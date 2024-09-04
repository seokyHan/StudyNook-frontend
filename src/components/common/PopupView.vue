<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-box">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import './css/popup.css';
</style>

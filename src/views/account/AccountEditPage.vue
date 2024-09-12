<template>
  <div class="account-container">
    <AccountEditForm />
  </div>
</template>

<script>
import AccountEditForm from '@/components/account/AccountEditForm.vue';

export default {
  components: {
    AccountEditForm,
  },
};
</script>

<style lang="css" scoped>
@import './css/account.css';
</style>

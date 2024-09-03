<template>
  <div>
    <MainVisual />
    <MainNotice />
    <MainGroups />
  </div>
</template>

<script>
import MainVisual from '@/components/main/MainVisual.vue';
import MainNotice from '@/components/main/MainNotice.vue';
import MainGroups from '@/components/main/MainGroups.vue';

export default {
  components: {
    MainVisual,
    MainNotice,
    MainGroups,
  },
};
</script>

<template>
  <div>
    <MainVisual />
    <MainNotice />
    <MainPopularGroups />
    <MainGroups />
  </div>
</template>

<script>
import MainVisual from '@/components/main/MainVisual.vue';
import MainNotice from '@/components/main/MainNotice.vue';
import MainPopularGroups from '@/components/main/MainPopularGroups.vue';
import MainGroups from '@/components/main/MainGroups.vue';

export default {
  components: {
    MainVisual,
    MainNotice,
    MainPopularGroups,
    MainGroups,
  },
};
</script>

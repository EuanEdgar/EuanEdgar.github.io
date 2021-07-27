<template>
  <DataLoader path="categories">
    <template v-slot="{data}">
      <CategoriesList :categories="data" />
    </template>
  </DataLoader>
</template>

<script lang="js">
import CategoriesList from '@/sites/blog/components/CategoriesList';
import DataLoader from '@/sites/blog/components/DataLoader';

export default {
  components: {
    CategoriesList,
    DataLoader,
  },
};
</script>

<style lang="scss" scoped>
</style>

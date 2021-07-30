<template>
  <DataLoader :path="dataPath">
    <template v-slot="{data}">
      <CategoryDisplay :category="data" />
    </template>
  </DataLoader>
</template>

<script lang="js">
import CategoryDisplay from '@/sites/blog/components/CategoryDisplay';
import DataLoader from '@/sites/blog/components/DataLoader';

export default {
  computed: {
    slug() {
      const { currentRoute } = this.$router;
      return currentRoute.params.slug;
    },
    dataPath() {
      const { slug } = this;
      return `categories/${slug}/category.json`;
    },
  },
  components: {
    CategoryDisplay,
    DataLoader,
  },
};
</script>

<style lang="scss" scoped>
</style>

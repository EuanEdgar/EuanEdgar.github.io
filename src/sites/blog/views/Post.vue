<template>
  <DataLoader :path="dataPath">
    <template v-slot="{data}">
      <Post :post="data" />
    </template>
  </DataLoader>
</template>

<script lang="js">
import DataLoader from '@/sites/blog/components/DataLoader';
import Post from '@/sites/blog/components/Post';

export default {
  computed: {
    slug() {
      const { currentRoute } = this.$router;
      return currentRoute.params.slug;
    },
    dataPath() {
      const { slug } = this;
      return `posts/${slug}`;
    },
  },
  components: {
    DataLoader,
    Post,
  },
};
</script>

<style lang="scss" scoped>
</style>

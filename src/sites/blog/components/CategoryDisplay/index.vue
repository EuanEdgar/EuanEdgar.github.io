<template>
  <div>
    <CategoryHeading :category="category" />
    <PostsList :posts="category.posts" />
  </div>
</template>

<script lang="js">
import PostsList from '@/sites/blog/components/PostsList';
import CategoryHeading from './CategoryHeading';

export default {
  props: {
    category: Object,
  },
  components: {
    CategoryHeading,
    PostsList,
  },
};
</script>

<style lang="scss" scoped>
</style>

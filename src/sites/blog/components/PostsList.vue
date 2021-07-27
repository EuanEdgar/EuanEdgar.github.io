<template>
  <Grid
    :items="posts"
    :count="3"
  >
    <template v-slot="{item}">
      <PostListing :post="item" />
    </template>
  </Grid>
</template>

<script lang="js">
import PostListing from '@/sites/blog/components/PostListing';
import Grid from '@/components/Grid';

export default {
  props: {
    posts: Array,
  },
  components: {
    PostListing,
    Grid,
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <Grid
    :items="categories"
    :count="3"
  >
    <template v-slot="{item}">
      <CategoryListing :category="item" />
    </template>
  </Grid>
</template>

<script lang="js">
import CategoryListing from '@/sites/blog/components/CategoryListing';
import Grid from '@/components/Grid';

export default {
  props: {
    categories: Array,
  },
  components: {
    CategoryListing,
    Grid,
  },
};
</script>

<style lang="scss" scoped>
</style>

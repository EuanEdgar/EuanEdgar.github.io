<template>
  <router-link
    :to="category.location"
    class="category-listing"
  >
    <b-card
      :title="category.name"
      :img-src="headerImage"
    >
      <b-card-text
        v-if="category.summary"
      >
        {{ category.summary }}
      </b-card-text>
    </b-card>
  </router-link>
</template>

<script lang="js">
import categoryAsset from '@/sites/blog/utils/categoryAsset';

export default {
  props: {
    category: Object,
  },
  computed: {
    headerImage() {
      const { headerImage } = this.category;
      if (headerImage) {
        return categoryAsset(this.category, headerImage);
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

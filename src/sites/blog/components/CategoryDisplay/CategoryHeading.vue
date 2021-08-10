<template>
  <Nav
    :text="category.name"
    :image="image"
    :imageOptions="imageOptions"
  />
</template>

<script lang="js">
import Nav from '@/sites/blog/components/Nav';
import categoryAsset from '@/sites/blog/utils/categoryAsset';

export default {
  props: {
    category: Object,
  },
  computed: {
    image() {
      const {
        headerImage,
        category,
      } = this;

      return categoryAsset(category, headerImage.src);
    },
    imageOptions() {
      const { headerImage } = this;

      return headerImage.options;
    },
    headerImage() {
      const { category } = this;
      const { headerImage } = category;

      return headerImage;
    },
  },
  components: {
    Nav,
  },
};
</script>

<style lang="scss" scoped>
</style>

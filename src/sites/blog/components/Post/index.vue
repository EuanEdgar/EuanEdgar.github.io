<template>
  <b-container>
    <img
      v-if="headerImage"
      :src="headerImage"
    />
    <h1>{{ post.name }}</h1>
    <CategoriesList :categories="post.categories" />
    <Markdown
      :content="post.content"
      :getAsset="(asset) => postAsset(post, asset)"
      incrementHeadings
    />
  </b-container>
</template>

<script lang="js">
import postAsset from '@/sites/blog/utils/postAsset';
import Markdown from '@/sites/blog/components/Markdown';

import CategoriesList from './CategoriesList';

export default {
  props: {
    post: Object,
  },
  computed: {
    headerImage() {
      const {
        headerImage,
      } = this.post;

      if (headerImage) {
        return postAsset(this.post, headerImage);
      }
      return null;
    },
  },
  methods: {
    postAsset,
  },
  components: {
    CategoriesList,
    Markdown,
  },
};
</script>

<style lang="scss" scoped>
</style>

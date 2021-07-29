<template>
  <div>
    <h1>{{ post.name }}</h1>
    <p>
      <router-link
        v-for="category in post.categories"
        :key="category.name"
        :to="category.location"
      >
        {{ category.name }}
      </router-link>
    </p>

    <img
      v-if="headerImage"
      :src="headerImage"
    />
    <Markdown
      :content="post.content"
      :getAsset="(asset) => postAsset(post, asset)"
    />
  </div>
</template>

<script lang="js">
import postAsset from '@/sites/blog/utils/postAsset';

import Markdown from '@/sites/blog/components/Markdown';

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
    Markdown,
  },
};
</script>

<style lang="scss" scoped>
</style>

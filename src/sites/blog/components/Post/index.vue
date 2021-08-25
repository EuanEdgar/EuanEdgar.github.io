<template>
  <div>
    <Nav
      :image="image"
      :imageOptions="imageOptions"
      :text="post.name"
    />
    <b-container>
      <CategoriesList :categories="post.categories" />
      <Markdown
        :content="post.content"
        :getAsset="(asset) => postAsset(post, asset)"
        :getLink="(link) => blogLink(link)"
        incrementHeadings
      />
    </b-container>
  </div>
</template>

<script lang="js">
import blogLink from '@/sites/blog/utils/blogLink';
import postAsset from '@/sites/blog/utils/postAsset';
import Markdown from '@/sites/blog/components/Markdown';
import Nav from '@/sites/blog/components/Nav';

import CategoriesList from './CategoriesList';

export default {
  props: {
    post: Object,
  },
  computed: {
    image() {
      const {
        headerImage,
      } = this;

      if (headerImage) {
        return postAsset(this.post, headerImage.src);
      }
      return null;
    },
    imageOptions() {
      const { headerImage } = this;

      if (headerImage) {
        return headerImage.options;
      }
      return undefined;
    },
    headerImage() {
      const { headerImage } = this.post;
      return headerImage;
    },
  },
  methods: {
    blogLink,
    postAsset,
  },
  components: {
    CategoriesList,
    Markdown,
    Nav,
  },
};
</script>

<style lang="scss" scoped>
</style>

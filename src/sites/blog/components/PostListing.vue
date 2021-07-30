<template>
  <router-link
    :to="post.location"
    class="post-listing"
  >
    <b-card
      :title="post.name"
      :img-src="headerImage"
    >
      <b-card-text
        v-if="post.summary"
      >
        {{ post.summary }}
      </b-card-text>
    </b-card>
  </router-link>
</template>

<script lang="js">
import postAsset from '@/sites/blog/utils/postAsset';

export default {
  props: {
    post: Object,
  },
  computed: {
    headerImage() {
      const { headerImage } = this.post;
      if (headerImage) {
        return postAsset(this.post, headerImage);
      }
      return null;
    },
  },

};
</script>

<style lang="scss" scoped>
a.post-listing {
  text-decoration: none;
  .card-body {
    color: $white;
    background-color: $dark-blue;
  }
}
</style>

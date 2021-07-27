<template>
  <router-link :to="post.location">{{ post.name }}</router-link>
</template>

<script lang="js">
export default {
  props: {
    post: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>
      <router-link
        v-for="category in post.categories"
        :key="category.name"
        :to="category.location"
      >
        {{ category.name }}
      </router-link>
    </p>

    <Markdown :content="post.content" />
  </div>
</template>

<script lang="js">
import Markdown from '@/components/Markdown';

export default {
  props: {
    post: Object,
  },
  components: {
    Markdown,
  },
};
</script>

<style lang="scss" scoped>
</style>

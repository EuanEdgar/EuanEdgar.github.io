<template>
  <p>
    <span
      v-for="(category, index) in categories"
      :key="category.name"
    >
      <router-link :to="category.location">
        <span>{{ category.name }}</span>
      </router-link>
      <span v-if="index < categories.length - 1">, </span>
    </span>
  </p>
</template>

<script lang="js">
export default {
  props: {
    categories: Array,
  },
};
</script>

<style lang="scss" scoped>
</style>

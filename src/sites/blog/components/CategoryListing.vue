<template>
  <router-link :to="category.location">{{ category.name }}</router-link>
</template>

<script lang="js">
export default {
  props: {
    category: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <b-nav-item
    :to="item.location"
    :exact="item.exact !== false"
    :disabled="item.disabled"
  >
    {{ item.name }}
  </b-nav-item>
</template>

<script lang="js">
export default {
  props: {
    item: Object,
  },
};
</script>

<style lang="scss" scoped>
.nav-link {
  color: $white;

  &.router-link-active {
    background-color: $dark-blue-1;
  }

  &:hover {
    text-decoration: underline;
    background-color: $blue;
  }
}
</style>

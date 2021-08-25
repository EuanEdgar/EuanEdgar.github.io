<template>
  <router-link
    :to="location"
    :class="`${className}-listing`"
  >
    <b-card
      :title="name"
      :img-src="headerImage"
    />
  </router-link>
</template>

<script lang="js">
export default {
};
</script>

<style lang="scss">
a[class$="-listing"] {
  height: 100%;

  text-decoration: none;
  .card {
    height: 100%;

    .card-img {
      height: 15vw;
      object-fit: cover;
      object-position: bottom;
    }
    .card-body {
      color: $white;
      background-color: $dark-blue-2;
    }
  }
}
</style>

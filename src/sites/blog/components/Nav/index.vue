<template>
  <div>
    <HeaderImage
      :text="text"
      :image="image"
      :imageOptions="imageOptions"
    >
      <slot name="header" />
    </HeaderImage>
    <b-nav>
      <NavItem
        v-for="item in navItems"
        :key="item.name"
        :item="item"
      />
    </b-nav>
  </div>
</template>

<script lang="js">
import HeaderImage from './HeaderImage';
import NavItem from './NavItem';

export default {
  props: {
    text: String,
    image: String,
    imageOptions: Object,
  },
  data() {
    return {
      navItems: [
        {
          name: 'Latest',
          location: { name: 'Blog-Home' },
        },
        {
          name: 'Categories',
          location: { name: 'Blog-Categories' },
        },
      ],
    };
  },
  components: {
    HeaderImage,
    NavItem,
  },
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: $dark-blue-2;
  margin-bottom: 10px;
}
</style>

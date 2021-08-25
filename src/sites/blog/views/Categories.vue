<template>
  <div>
    <Nav />
    <h2 class="text-center">
      Browse content by category
    </h2>
    <DataLoader path="categories">
      <template v-slot="{data}">
        <CategoriesList :categories="data" />
      </template>
    </DataLoader>
  </div>
</template>

<script lang="js">
import CategoriesList from '@/sites/blog/components/CategoriesList';
import DataLoader from '@/sites/blog/components/DataLoader';
import Nav from '@/sites/blog/components/Nav';

export default {
  components: {
    CategoriesList,
    DataLoader,
    Nav,
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 20px 0 30px 0;
}
</style>

<template>
  <StoreProvider
    v-if="!loading"
    :key="currentRoute.fullPath"
    :moduleName="moduleName"
  >
    <router-view />
  </StoreProvider>
</template>

<script lang="js">
import StoreProvider from './StoreProvider';

export default {
  props: {
    moduleName: String,
    getSiteStore: Function,
  },
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    const {
      getSiteStore,
      moduleName,
      $store,
    } = this;

    if (getSiteStore) {
      if (!$store.hasModule(moduleName)) {
        this.loading = true;

        let storeModule = await getSiteStore();
        if (storeModule.default) {
          storeModule = storeModule.default;
        }

        $store.registerModule(moduleName, {
          ...storeModule,
          namespaced: true,
        });

        this.loading = false;
      }
    }
  },
  computed: {
    currentRoute() {
      const { currentRoute } = this.$router;
      return currentRoute;
    },
  },
  components: {
    StoreProvider,
  },
};
</script>

<style lang="scss" scoped>
</style>

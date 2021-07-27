<template>
  <router-view
    v-if="!loading"
    :key="currentRoute.fullPath"
  />
</template>

<script lang="js">
export default {
  props: {
    moduleName: String,
    getSiteStore: Function,
  },
  provide() {
    const {
      moduleName,
      $store,
    } = this;

    return {
      getOwnStore: () => ({
        state: $store.state[moduleName],
        dispatch: (action, ...args) => (
          $store.dispatch(`${moduleName}/${action}`, ...args)
        ),
        commit: (mutation, ...args) => (
          $store.commit(`${moduleName}/${mutation}`, ...args)
        ),
        getters: Object.entries($store.getters).filter(([key]) => (
          key.startsWith(moduleName)
        )).reduce((getters, [key, getter]) => ({
          ...getters,
          [key]: getter,
        }), {}),
      }),
    };
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
};
</script>

<style lang="scss" scoped>
</style>

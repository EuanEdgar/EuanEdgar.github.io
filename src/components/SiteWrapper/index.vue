<template>
  <StoreProvider
    v-if="!loading"
    :moduleName="moduleName"
  >
    <RenderSiteWrapper :wrapper="wrapper">
      <router-view />
    </RenderSiteWrapper>
  </StoreProvider>
</template>

<script lang="js">
import RenderSiteWrapper from './RenderSiteWrapper';
import StoreProvider from './StoreProvider';

export default {
  props: {
    moduleName: String,
    getSiteStore: Function,
    wrapper: Function,
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
  components: {
    RenderSiteWrapper,
    StoreProvider,
  },
};
</script>

<style lang="scss" scoped>
</style>

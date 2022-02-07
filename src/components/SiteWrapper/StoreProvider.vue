<template>
  <div>
    <slot />
  </div>
</template>

<script lang="js">
export default {
  props: {
    moduleName: String,
  },
  provide() {
    const {
      moduleName,
      $store,
    } = this;

    return {
      $store: {
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
          [key.replace(`${moduleName}/`, '')]: getter,
        }), {}),
      },
      $rootStore: $store,
    };
  },
};
</script>

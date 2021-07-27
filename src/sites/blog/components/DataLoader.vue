<template>
  <div>
    <slot
      name="loading"
      v-if="loading"
    >
      <p>Loading...</p>
    </slot>
    <slot
      name="error"
      v-else-if="error"
      :error="error"
    >
      <pre>{{ JSON.stringify(error, null, 2) }}</pre>
    </slot>
    <slot
      v-else
      :data="data"
    />
  </div>
</template>

<script lang="js">
export default {
  props: {
    path: String,
  },
  data() {
    return {
      data: undefined,
      dataLoaded: undefined,
      error: undefined,
      loading: true,
    };
  },
  mounted() {
    this.loadData();
  },
  updated() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const {
        path,
        dataLoaded,
      } = this;

      if (path && path !== dataLoaded) {
        this.loading = true;
        try {
          const data = await import(`@/sites/blog/data/${path}.json`);
          this.data = data.default;
        } catch (e) {
          this.error = e;
        }
        this.dataLoaded = path;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

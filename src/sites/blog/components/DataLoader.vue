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
  computed: {
    dataPath() {
      let { path } = this;
      if (!path.includes('.')) {
        path = `${path}.json`;
      }

      return path;
    },
  },
  methods: {
    async loadData() {
      const {
        dataPath,
        dataLoaded,
      } = this;

      if (dataPath && dataPath !== dataLoaded) {
        this.loading = true;
        try {
          const response = await fetch(`/blog/${dataPath}`);
          this.data = await response.json();
        } catch (e) {
          this.error = e;
        }
        this.dataLoaded = dataPath;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div
    v-if="html"
    class="markdown-container"
    v-html="html"
  />
</template>

<script lang="js">
import marked from './marked';

export default {
  props: {
    content: String,
    getAsset: Function,
    incrementHeadings: [Boolean, Number],
  },
  data() {
    return {
      html: undefined,
    };
  },
  created() {
    this.computeHtml();
  },
  watch: {
    content() {
      this.computeHtml();
    },
  },
  methods: {
    async computeHtml() {
      const {
        content,
        getAsset,
        incrementHeadings,
      } = this;

      this.html = await marked(content, {
        getAsset,
        incrementHeadings,
      });
    },
  },
};
</script>

<style lang="scss">
.markdown-container {
  pre.hljs {
    max-width: 100%;
    overflow-x: auto;

    padding: 10px;
    border: 1px solid transparent;
    border-radius: 5px;
  }
}
</style>

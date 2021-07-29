<template>
  <div v-html="html" />
</template>

<script lang="js">
import marked from 'marked';

export default {
  props: {
    content: String,
    getAsset: Function,
  },
  computed: {
    html() {
      const {
        content,
        getAsset,
      } = this;

      return marked(content, {
        walkTokens(token) {
          const { type } = token;
          if (type === 'image') {
            if (!/^https?:\/\//.test(token.href)) {
              token.href = getAsset(token.href);
            }
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

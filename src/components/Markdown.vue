<template>
  <vue-markdown
    :source="content"
    v-bind="config"
  />
</template>

<script lang="js">
import VueMarkdown from 'vue-markdown';

const config = {
  anchorAttributes: {
    target: '_blank',
  },
  emoji: false,
  linkify: false,
  typographer: false,
};

export default {
  props: {
    content: String,
  },
  data() {
    return {
      config,
    };
  },
  components: {
    'vue-markdown': VueMarkdown,
  },
};
</script>

<style lang="scss" scoped>
</style>

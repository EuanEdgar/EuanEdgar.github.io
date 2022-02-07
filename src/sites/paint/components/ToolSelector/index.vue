<template>
  <b-button-group>
    <b-button
      v-for="toolName in toolNames"
      :key="toolName"
      :variant="tool === toolName ? 'success' : undefined"
      @click="tool = toolName"
    >
      {{ toolName }}
    </b-button>
  </b-button-group>
</template>

<script lang="js">
import tools from '@/sites/paint/tools';

export default {
  inject: ['$store'],
  computed: {
    toolNames() {
      return Object.keys(tools);
    },
    tool: {
      get() {
        const {
          toolClass,
        } = this.$store.state;

        if (toolClass) {
          const [toolName] = Object.entries(tools).find(([, klass]) => klass === toolClass);

          return toolName;
        }
        return undefined;
      },
      set(toolName) {
        this.$store.dispatch('selectTool', toolName);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

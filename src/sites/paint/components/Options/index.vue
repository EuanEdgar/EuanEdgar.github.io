<template>
  <div>
    <div
      v-for="option in options"
      :key="`${option.name}-${$store.getters['options/namespace'](option.global)}`"
    >
      <Option :option="option" @change="onChange" />
    </div>
  </div>
</template>

<script lang="js">
import Option from './Option';

export default {
  inject: ['$store'],
  computed: {
    options() {
      const {
        toolClass,
      } = this.$store.state;

      if (toolClass) {
        const { options } = toolClass;

        return options.map((option) => {
          const value = this.$store.getters['options/optionValue'](option);

          return {
            ...option,
            value,
          };
        });
      }
      return [];
    },
  },
  methods: {
    onChange(option) {
      this.$store.dispatch('options/setOption', option);
    },
  },
  components: {
    Option,
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <p>{{ option.name }}</p>
    <ColourInput
      v-if="option.type === 'colour'"
      :value="option.value"
      @change="onChange"
    />
    <NumberInput
      v-if="option.type === 'number'"
      :value="option.value"
      @change="onChange"
    />
  </div>
</template>

<script lang="js">
import ColourInput from './ColourInput';
import NumberInput from './NumberInput';

export default {
  props: {
    option: Object,
  },
  methods: {
    onChange(value) {
      this.$emit('change', { ...this.option, value });
    },
  },
  components: {
    ColourInput,
    NumberInput,
  },
};
</script>

<style lang="scss" scoped>
</style>

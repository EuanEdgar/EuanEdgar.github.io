<template>
  <input
    type="number"
    :value="value"
    @change="$emit('change', parseInt($event.target.value, 10))"
  />
</template>

<script lang="js">
export default {
  props: {
    value: Number,
  },
};
</script>

<style lang="scss" scoped>
</style>

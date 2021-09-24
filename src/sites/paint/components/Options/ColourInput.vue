<template>
  <input :value="value" @change="$emit('change', $event.target.value)" />
</template>

<script lang="js">
export default {
  props: {
    value: String,
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <b-container>
    <b-row v-for="(row, index) in rows" :key="index">
      <b-col
        v-for="(item, index) in row"
        :key="index"
        :cols="columnDefs['xs']"
        :sm="columnDefs['sm']"
        :md="columnDefs['md']"
        :lg="columnDefs['lg']"
        :xl="columnDefs['xl']"
      >
        <slot :item="item" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="js">
import groupIn from '@/utils/groupIn';

export default {
  props: {
    items: Array,
    count: Number,
    columnDefs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    rows() {
      const {
        items,
        count,
      } = this;

      return groupIn(items, count);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div v-if="animator">
    <AnimatorHandler :animator="animator" />
  </div>
</template>

<script lang="js">
import AnimatorHandler from '@/sites/animations/components/AnimatorHandler';

export default {
  data() {
    return {
      animator: null,
    };
  },
  computed: {
    animation() {
      const { params } = this.$route;
      return params.animation;
    },
  },
  watch: {
    animation: {
      immediate: true,
      async handler(name) {
        if (name) {
          const animator = await import(`@/sites/animations/animators/${name}`);
          this.animator = animator.default;
        }
      },
    },
  },
  components: {
    AnimatorHandler,
  },
};
</script>

<style lang="scss" scoped>
</style>

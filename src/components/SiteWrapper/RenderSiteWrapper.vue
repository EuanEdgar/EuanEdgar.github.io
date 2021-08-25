<script lang="js">
export default {
  functional: true,
  props: {
    wrapper: Function,
  },
  render(c, context) {
    const {
      props: {
        wrapper,
      },
      slots,
    } = context;

    if (wrapper) {
      return c(wrapper, slots().default);
    }
    return slots().default;
  },
};
</script>

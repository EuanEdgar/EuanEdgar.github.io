<script lang="js">
import ObjectListing from '@/sites/blog/components/ObjectListing';

import categoryAsset from '@/sites/blog/utils/categoryAsset';

export default {
  mixins: [ObjectListing],
  props: {
    category: Object,
  },
  data() {
    return {
      className: 'category',
    };
  },
  computed: {
    headerImage() {
      const { headerImage } = this.category;
      if (headerImage) {
        return categoryAsset(this.category, headerImage.src);
      }
      return null;
    },
    location() {
      const { location } = this.category;
      return location;
    },
    name() {
      const { name } = this.category;
      return name;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

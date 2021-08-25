<script lang="js">
import ObjectListing from '@/sites/blog/components/ObjectListing';

import postAsset from '@/sites/blog/utils/postAsset';

export default {
  mixins: [ObjectListing],
  props: {
    post: Object,
  },
  data() {
    return {
      className: 'post',
    };
  },
  computed: {
    headerImage() {
      const { headerImage } = this.post;
      if (headerImage) {
        return postAsset(this.post, headerImage.src);
      }
      return null;
    },
    location() {
      const { location } = this.post;
      return location;
    },
    name() {
      const { name } = this.post;
      return name;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

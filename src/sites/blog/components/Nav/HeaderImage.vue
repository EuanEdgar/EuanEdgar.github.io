<template>
  <div
    :class="classNames('header-container', image && 'header-image')"
    :style="{
      ...imageStyles,
      backgroundImage: `url(${image})`,
    }"
  >
    <slot>
      <b-container>
        <b-row
          v-if="headerText"
          class="text-center"
          align-v="center"
        >
          <b-col>
            <h1
              :class="classNames(lowContrast && 'high-contrast')"
              :style="{
                ...textStyles,
              }"
            >
              {{ headerText }}
            </h1>
          </b-col>
        </b-row>
      </b-container>
    </slot>
  </div>
</template>

<script lang="js">
import blank from '@/utils/blank';
import classNames from '@/utils/classNames';

export default {
  props: {
    image: String,
    imageOptions: Object,
    text: null,
  },
  computed: {
    headerText() {
      const {
        image,
        text,
        $router,
      } = this;

      if (blank(text) && !image) {
        return `<${location.host}/${$router.resolve({ name: 'Blog-Home' }).href.slice(0, -1)} />`;
      }
      return text;
    },
    location() {
      return location;
    },
    imageStyles() {
      const { imageOptions } = this;

      if (imageOptions) {
        const {
          size,
          repeat,
          'background-color': color,
          position,
        } = imageOptions;

        let repeatValue;
        switch (repeat) {
          case true:
            repeatValue = 'repeat';
            break;
          case 'x':
            repeatValue = 'repeat-x';
            break;
          case 'y':
            repeatValue = 'repeat-y';
            break;
          default:
            repeatValue = 'no-repeat';
        }

        return {
          backgroundSize: size,
          backgroundRepeat: repeatValue,
          backgroundColor: color,
          backgroundPosition: position,
        };
      }
      return undefined;
    },
    textStyles() {
      const { imageOptions } = this;

      if (imageOptions) {
        const {
          color,
        } = imageOptions;

        return {
          color,
        };
      }
      return undefined;
    },
    lowContrast() {
      const {
        image,
        imageOptions,
      } = this;

      if (imageOptions) {
        return imageOptions.lowContrast !== false;
      }
      return !!image;
    },
  },
  methods: {
    classNames,
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  min-height: 200px;

  background-color: darken($blue, 30%);
  color: $white;

  &.header-image {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    > .container > .row {
      h1.high-contrast {
        background-color: rgba(0, 0, 0, 50%);
      }
    }
  }

  > .container {
    &, > .row {
      min-height: inherit;
    }

    > .row {
      h1 {
        display: inline-block;
        padding: 10px;
      }
    }
  }
}
</style>

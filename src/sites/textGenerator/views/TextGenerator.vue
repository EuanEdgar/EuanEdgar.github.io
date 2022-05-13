<template>
  <div>
    <textarea v-model="template" :style="{ resize: 'both' }" cols="50" />
    <p>{{ text || '--' }}</p>
    <p>
      <button @click="generate">
        Generate
      </button>
    </p>
  </div>
</template>

<script lang="js">
import parseTemplate from '@/sites/textGenerator/utils/parseTemplate';

export default {
  data() {
    return {
      text: null,
      template: '{ person1#name } and { possessive gender = !person1.gender } { relation#relation sibling } { name gender = !relation.gender distinct-1 = !person1.value distinct-on-1 = value } went to see their { relation } at { place indefiniteArticle }. { switch value = !person1.gender male = "{ person1#name.value } is a man" female = "{ person1#name.value } is not a man" }{ choice a = " and { switch value = !person1.gender male = "so is" female = "neither is" } { name gender = !person1.gender distinct-1 = !person1.value distinct-on-1 = value }." b = "!" }',
    };
  },
  created() {
    this.generate();
  },
  watch: {
    template() {
      this.generate();
    },
  },
  methods: {
    generate() {
      try {
        this.text = parseTemplate(this.template);
      } catch (e) {
        this.text = `Error: ${e.message}.`;
        console.error(e);
      }
    },
  },
};
</script>

<template>
  <div>
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
import parseToken from '@/sites/textGenerator/utils/parseToken';

export default {
  data() {
    return {
      text: null,
      template: '{ person1#name } and { possessive gender = !person1.gender } { relation#relation sibling } { name gender = !relation.gender distinct-1 = !person1.value distinct-on-1 = value } went to see their { relation } at { place indefiniteArticle }',
    };
  },
  created() {
    this.generate();
  },
  methods: {
    generate() {
      this.text = parseTemplate(this.template, parseToken);
    },
  },
};
</script>

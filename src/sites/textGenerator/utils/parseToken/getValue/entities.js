/*
 * {
 *  type: [
 *    {
 *      value: 'text',
 *      [indefiniteArticle]: 'a' || 'an', // Defaults to a/an based on first character of value field
 *      [plural]: 'texts', // Defaults to `${value}s`
 *      ...filterableAttributes,
 *    },
 *    'text', // equivalent to above with defaults
 *  ]
 * }
 */

const entities = {
  name: [
    {
      value: 'Alice',
      gender: 'female',
    },
    {
      value: 'Bob',
      gender: 'male',
    },
    {
      value: 'Carl',
      gender: 'male',
    },
    {
      value: 'Dan',
      gender: 'male',
    },
    {
      value: 'Erin',
      gender: 'female',
    },
  ],
  possessive: [
    {
      value: 'his',
      gender: 'male',
    },
    {
      value: 'her',
      gender: 'female',
    },
  ],
  relation: [
    {
      value: 'brother',
      gender: 'male',
      sibling: true,
      parent: false,
    },
    {
      value: 'sister',
      gender: 'female',
      sibling: true,
      parent: false,
    },
    {
      value: 'father',
      gender: 'male',
      sibling: false,
      parent: true,
    },
    {
      value: 'mother',
      gender: 'female',
      sibling: false,
      parent: true,
    },
  ],
  place: [
    'park',
    'shop',
    'office',
    'gym',
  ],
};

export default entities;

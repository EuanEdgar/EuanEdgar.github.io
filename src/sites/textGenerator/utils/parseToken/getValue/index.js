import randomItem from '@/utils/random/item';

import entities from './entities';
import filterEntities from './filterEntities';

const getValue = (type, options, data, { parseTemplate }) => {
  switch (type) {
    case 'choice': {
      const values = Object.values(options.settings);
      const template = randomItem(values);
      return parseTemplate(template, data);
    }
    case 'switch': {
      const {
        settings: {
          value,
          ...choices
        },
      } = options;

      return parseTemplate(choices[value] || choices.default, data);
    }
    default: {
      const choices = filterEntities(entities[type], options);
      return randomItem(choices);
    }
  }
};

export default getValue;

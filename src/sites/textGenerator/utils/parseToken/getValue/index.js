import randomItem from '@/utils/random/item';

import entities from './entities';
import filterEntities from './filterEntities';

const getValue = (type, options) => {
  switch (type) {
    case 'choice': {
      const values = Object.values(options);
      return randomItem(values);
    }
    case 'switch': {
      const {
        value,
        ...choices
      } = options;

      return choices[value] || choices.default;
    }
    default: {
      const choices = filterEntities(entities[type], options);
      return randomItem(choices);
    }
  }
};

export default getValue;

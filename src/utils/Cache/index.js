import equal from 'deep-equal';
import clone from 'clone-deep';

import dig from '@/utils/dig';

import List from './List';

const deprecateSyncAsync = () => {
  console.warn(new Error(`Cache no longer has explicit synchronous and asynchronous modes.
    Instead, the getter function should return a promise for asynchronous operation.`));
};

class Cache {
  constructor(options) {
    if (typeof options === 'function') {
      this.getter = options;
    } else {
      this.getter = dig(options, ['getter']);
      if (typeof this.getter !== 'function') {
        throw new TypeError('Cache expects either a function or an object with a "getter" function property.');
      }
    }
    if (dig(options, 'type')) {
      deprecateSyncAsync();
    }
    this.maxLength = dig(options, 'maxLength');
    this.previousArgs = new List({ maxLength: this.maxLength });
    this.previousResults = new List({ maxLength: this.maxLength });
  }

  get(...args) {
    if (this.previousArgs.find((prevArg) => equal(prevArg, args))) {
      const index = this.previousArgs.indexOf(args);

      return clone(this.previousResults.get(index));
    }
    this.previousArgs.push(args);
    const result = this.getter(...args);
    this.previousResults.push(result);

    return result;
  }

  getSync(...args) {
    deprecateSyncAsync();
    return this.get(...args);
  }

  getAsync(...args) {
    deprecateSyncAsync();
    return this.get(...args);
  }
}

export default Cache;

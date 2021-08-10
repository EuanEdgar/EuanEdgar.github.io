import equal from 'deep-equal';
import clone from 'clone-deep';

import blank from '@/utils/blank';

class List {
  constructor(items, options) {
    if (items instanceof Array) {
      this.items = items;
      this.options = options || {};
    } else {
      this.items = options || [];
      this.options = items || {};
    }
    this.updateLength();
  }

  get(index) {
    if (blank(index)) {
      return clone(this.items.slice(-1)[0]);
    }
    return clone(this.items[index]);
  }

  includes(item) {
    return this.indexOf(item) !== -1;
  }

  indexOf(item) {
    return this.items.findIndex((i) => equal(i, item));
  }

  find(func) {
    return clone(this.items.find(func));
  }

  findIndex(func) {
    return this.items.findIndex(func);
  }

  push(item, index) {
    if (!blank(index)) {
      this.items.splice(index, 0, item);
    } else {
      this.items.push(item);
    }
    this.updateLength();
    return this.items.length;
  }

  updateLength() {
    const {
      maxLength,
    } = this.options;

    if (maxLength) {
      if (this.items.length > maxLength) {
        this.items.splice(0, 1);
        return this.updateLength();
      }
    }
    this.length = this.items.length;
    return this.length;
  }
}

export default List;

import blank from '@/utils/blank';

const initialise = (obj, ...properties) => {
  let props = properties;
  if (props[0] instanceof Array) {
    props = props[0];
  }
  return dig(obj, props);
};

const dig = (obj, properties) => {
  let object = obj;

  for (let x = 0; x < properties.length; x++) {
    if ([undefined, null].includes(object) || blank(properties)) {
      return object;
    }

    const property = properties[x];
    object = process(object, property);
  }

  return object;
};

const process = (object, property) => {
  // We're attempting to call a function
  if (typeof property === 'object') {
    const [method, methodArgs] = Object.entries(property)[0];

    // And obj has a function with that name
    if (typeof object[method] === 'function') {
      // Continue to dig through the result of calling the function with provided parameters
      if (methodArgs instanceof Array) {
        return object[method](...methodArgs);
      }
      return object[method](methodArgs);
    }
    // No function found
    return undefined;
  }

  // Standard property check
  return object[property];
};

export default initialise;

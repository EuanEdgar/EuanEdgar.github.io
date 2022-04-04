import extractOptions from './extractOptions';
import formatText from './formatText';
import getField from './getField';
import getValue from './getValue';

const parseToken = (token, data) => {
  const {
    type,
    name,
    field,
    options: opts,
  } = token;

  const options = extractOptions(opts, data);

  let value;
  if (data[name]) {
    value = data[name];
  } else {
    value = getValue(type, options);

    if (name) {
      data[name] = value;
    }
  }

  const fieldValue = getField(value, field);

  return formatText(fieldValue, value, opts);
};

export default parseToken;

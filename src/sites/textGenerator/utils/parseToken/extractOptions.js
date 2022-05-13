import getField from './getField';

const extractOptions = (options, data) => {
  const opts = { ...options };

  applyReferencesToOptions(opts, data);

  return Object.entries(opts).reduce(
    ({
      pluralize,
      indefiniteArticle,
      titleize,
      distinct,
      settings,
    }, [key, value]) => {
      if (key === 'pluralize') {
        // eslint-disable-next-line no-param-reassign
        pluralize = value;
      } else if (key === 'titleize') {
        // eslint-disable-next-line no-param-reassign
        titleize = value;
      } else if (key === 'indefiniteArticle') {
        // eslint-disable-next-line no-param-reassign
        indefiniteArticle = value;
      } else if (/^distinct-\d+$/.test(key)) {
        const id = /(\d+)$/.exec(key)[1];
        const field = options[`distinct-on-${id}`];

        distinct.push({
          field,
          value,
        });
      } else if (/^distinct-on-\d+$/.test(key)) {
        // Do nothing
      } else {
        settings[key] = value;
      }

      return {
        pluralize,
        indefiniteArticle,
        titleize,
        distinct,
        settings,
      };
    },
    {
      pluralize: false,
      indefiniteArticle: false,
      titleize: false,
      distinct: [],
      settings: {},
    },
  );
};

const applyReferencesToOptions = (options, data) => {
  Object.entries(options).forEach(([key, value]) => {
    if (/^!/.test(value)) {
      const match = /^!(?<name>.\w+)(\.(?<field>\w+))?/.exec(value);

      if (match) {
        const {
          groups: {
            name,
            field,
          },
        } = match;

        options[key] = getField(data[name], field);
      }
    }
  });
};

export default extractOptions;

import pluralize from '@/utils/string/pluralize';
import titleize from '@/utils/string/titleize';

const formatText = (
  text,
  value,
  {
    indefiniteArticle,
    pluralize: pluralizeText,
    titleize: titleizeText,
  },
) => {
  let output = text;

  if (pluralizeText) {
    let count;
    switch (typeof pluralizeText) {
      case 'boolean': {
        count = Number(pluralizeText) + 1;
        break;
      }
      case 'string':
      case 'number':
        count = Number(pluralizeText);
        break;
      default:
        count = 1;
    }

    output = pluralize(...[output, value.plural, count].filter((v) => v !== undefined));
  }

  if (indefiniteArticle) {
    let article = value.indefiniteArticle;
    if (!article) {
      article = /^[aeiou]/.test(output)
        ? 'an'
        : 'a';
    }

    output = `${article} ${output}`;
  }

  if (titleizeText) {
    output = titleize(output);
  }

  return output;
};

export default formatText;

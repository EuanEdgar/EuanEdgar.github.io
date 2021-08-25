import marked from 'marked';
import highlight from 'highlight.js/lib/core';

import 'highlight.js/styles/atom-one-dark.css';

import isAbsoluteLink from '@/sites/blog/utils/isAbsoluteLink';

const mark = (content, {
  getAsset,
  getLink,
  incrementHeadings,
}) => {
  marked.use({
    walkTokens(token) {
      const { type } = token;
      if (type === 'image' && getAsset) {
        if (!isAbsoluteLink(token.href)) {
          token.href = getAsset(token.href);
        }
      } else if (type === 'link' && getLink) {
        if (!isAbsoluteLink(token.href)) {
          token.href = getLink(token.href);
        }
      } else if (type === 'heading' && incrementHeadings) {
        const incrementCount = typeof incrementHeadings === 'number'
          ? incrementHeadings : 1;

        if (token.depth <= 6 - incrementCount) {
          token.depth += incrementCount;
        }
      }
    },
    highlight: async (code, language, callback) => {
      let langFileName = language;
      switch (langFileName) {
        case 'html':
          langFileName = 'xml';
          break;
        case 'js':
          langFileName = 'javascript';
          break;
        case 'md':
          langFileName = 'markdown';
          break;
        default:
          // Do nothing
      }

      const lang = await import(`highlight.js/lib/languages/${langFileName}`);
      highlight.registerLanguage(language, lang.default);

      const highlighted = highlight.highlight(code, { language }).value;
      callback(undefined, highlighted);
    },
    renderer: {
      code: (content) => `<pre class="hljs">${content}</pre>`,
    },
  });

  return new Promise((s, f) => {
    marked(content, (error, html) => {
      if (error instanceof Error) {
        f(error);
      }
      s(html);
    });
  });
};

export default mark;

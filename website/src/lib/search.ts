import { Orama } from '@orama/orama';

// Static search index populated at build time by scripts/build-search-index.mjs
const DATABASE: any = null;

export function createSearch() {
  return new Orama({
    // Schema matches what build-search-index.mjs produces
    schema: {
      title: 'string',
      content: 'string',
      url: 'string',
      description: 'string',
    },
  });
}

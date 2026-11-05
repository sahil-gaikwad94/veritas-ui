export const layoutConfig = {
  title: 'Vexx',
  subtitle: 'Verified Mathematical Truth for LLMs',
  description:
    'Pydantic ergonomics on the surface; dependency-free Rust theorem proving underneath. Vexx enforces algebraic equations, temporal logic, and domain invariants directly inside the token-generation loop.',
  github: 'https://github.com/sahil-gaikwad94/veritas',
  githubDocs: 'https://github.com/sahil-gaikwad94/veritas/tree/main/website/content/docs',
  favicon: '/favicon.ico',
  logo: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
  },
  topLinks: [
    { text: 'Docs', url: '/docs/getting-started' },
    { text: 'Playground', url: '/playground' },
    { text: 'Verify', url: '/verify' },
    { text: 'GitHub', url: 'https://github.com/sahil-gaikwad94/veritas', external: true },
  ],
  search: {
    provider: 'orama',
    placeholder: 'Search documentation, cartridges & API…',
  },
  themeToggle: true,
  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },
};

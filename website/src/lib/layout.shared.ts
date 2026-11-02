export function baseOptions() {
  return {
    title: 'Veritas Docs',
    description: 'Veritas documentation portal',
    github: 'https://github.com/sahil-gaikwad94/veritas',
    githubDocs:
      'https://github.com/sahil-gaikwad94/veritas/tree/main/website/content/docs',
    topLinks: [
      { text: 'Home', url: '/' },
      { text: 'Playground', url: '/playground' },
      { text: 'Verify', url: '/verify' },
      { text: 'GitHub', url: 'https://github.com/sahil-gaikwad94/veritas', external: true },
    ],
    search: {
      placeholder: 'Search documentation, cartridges & API…',
    },
    themeToggle: true,
    sidebar: {
      collapsible: true,
      defaultCollapsed: false,
    },
  };
}

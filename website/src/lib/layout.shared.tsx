import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Github } from 'lucide-react';
import { VexxLogo } from '@/components/site/logo';
import { siteConfig } from '@/lib/site';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <VexxLogo compact />,
      url: '/',
      transparentMode: 'none',
    },
    githubUrl: siteConfig.github,
    links: [
      { text: 'Playground', url: '/playground' },
      { text: 'Verify', url: '/verify' },
      { text: 'Benchmarks', url: '/benchmarks' },
      {
        type: 'icon',
        label: 'GitHub',
        text: 'GitHub',
        icon: <Github />,
        url: siteConfig.github,
        external: true,
      },
    ],
  };
}

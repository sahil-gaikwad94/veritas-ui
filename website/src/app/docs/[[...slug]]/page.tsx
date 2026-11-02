import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import type { PageProps } from 'fumadocs-core/source/page';

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs'>): Promise<Metadata> {
  const { params } = props;
  const page = source.getPage(params.slug);
  if (!page) return { title: 'Not Found' };

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page(props: PageProps<'/docs'>) {
  const { params } = props;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { source } from '@/lib/source';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx-components';
import { DocHero } from '@/components/docs/doc-hero';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

function readingMinutes(path: string | undefined): number | null {
  if (!path) return null;
  try {
    const text = readFileSync(path, 'utf8')
      .replace(/^---[\s\S]*?---/, '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[#>*`_|\-]/g, ' ');
    const words = text.split(/\s+/).filter((word) => /[a-z0-9]/i.test(word)).length;
    return Math.max(2, Math.round(words / 210));
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) return { title: 'Not Found' };

  const data = page.data as { title: string; description?: string };
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: page.url },
    openGraph: {
      title: `${data.title} · Vexx docs`,
      description: data.description,
      type: 'article',
      url: page.url,
    },
  };
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body as React.ComponentType<{ components: Record<string, unknown> }>;
  const { toc, full, title, description } = page.data;
  const filePath = `website/content/docs/${slug?.join('/') ?? 'index'}.mdx`;
  const absolutePath = (page.data as { absolutePath?: string }).absolutePath;
  const minutes =
    readingMinutes(absolutePath) ??
    readingMinutes(join(process.cwd(), 'content/docs', `${slug?.join('/') ?? 'index'}.mdx`));
  const editUrl = `${siteConfig.github}/blob/main/${filePath}`;

  return (
    <DocsPage
      toc={toc}
      full={full}
      breadcrumb={{ enabled: false }}
      tableOfContent={{ style: 'clerk' }}
    >
      <DocHero
        title={title}
        description={description}
        slug={slug}
        minutes={minutes}
        editUrl={editUrl}
      />
      <div className="docs-sheet">
        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>
      </div>

      <aside className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-bg-inset/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
            Spotted something off?
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-secondary">
            These pages live in the repo. Open an issue, or fix it in a pull request — both are welcome.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={`${siteConfig.github}/issues/new`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 py-1.5 text-[11.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
          >
            Report a problem
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-primary px-3 py-1.5 text-[11.5px] font-semibold text-bg-canvas transition-opacity hover:opacity-90"
          >
            Contribute
          </a>
        </div>
      </aside>
    </DocsPage>
  );
}

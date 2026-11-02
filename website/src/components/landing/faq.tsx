'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { faqs } from '@/lib/site';
import { SectionHeading } from '@/components/site/section';

export function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section id="faq" className="section-y">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Straight answers"
              title="The questions engineers actually ask."
              description="No benchmarks without caveats, no guarantees we cannot verify. If something is out of scope, the docs say so."
            />
          </div>

          <Accordion.Root type="single" collapsible className="divide-y divide-border-subtle border-y border-border-subtle">
            {faqs.map((item, i) => (
              <Accordion.Item key={item.q} value={`item-${i}`} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:text-cobalt-600 dark:hover:text-cobalt-300">
                    <span className="text-[13.5px] font-semibold leading-snug text-ink-primary group-hover:text-inherit sm:text-sm">
                      {item.q}
                    </span>
                    <Plus className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:text-cobalt-500" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=open]:animate-[accordion-down_240ms_ease-out]">
                  <p className="max-w-2xl pb-4 pr-6 text-[13px] leading-relaxed text-ink-secondary">{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

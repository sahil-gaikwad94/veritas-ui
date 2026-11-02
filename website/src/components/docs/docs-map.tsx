import Link from 'next/link';
import {
  ArrowUpRight,
  Boxes,
  Braces,
  Code2,
  Cpu,
  Plug,
  Rocket,
  Terminal,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type Section = {
  title: string;
  href: string;
  pages: string;
  blurb: string;
  icon: LucideIcon;
  tone: string;
};

const SECTIONS: Section[] = [
  {
    title: 'Getting started',
    href: '/docs/getting-started/installation',
    pages: '5 pages',
    blurb: 'Install, run the 60-second portfolio, and see what each layer actually does.',
    icon: Rocket,
    tone: 'border-cobalt-500/25 bg-cobalt-500/[0.07] text-cobalt-700 dark:text-cobalt-300',
  },
  {
    title: 'Authoring schemas',
    href: '/docs/authoring-schemas/verified-schema-decorator',
    pages: '5 pages',
    blurb: 'The decorator, every verb and primitive, containers, preflight, synthesis.',
    icon: Braces,
    tone: 'border-accent-violet/25 bg-accent-violet/[0.07] text-[#4b36c9] dark:text-[#b3a5ff]',
  },
  {
    title: 'Engine internals',
    href: '/docs/engine-internals/zero-dof-jump-forward',
    pages: '8 pages',
    blurb: 'PDA masks, affine contractors, NanoSolver and Z3, CDCL jumps, CRANE, Rust.',
    icon: Cpu,
    tone: 'border-accent-sky/40 bg-accent-sky/[0.12] text-[#1c4fa8] dark:text-[#9cc0ff]',
  },
  {
    title: 'Domain cartridges',
    href: '/docs/cartridges/overview',
    pages: '9 pages',
    blurb: 'Finance, SQL, security, scheduling, statistics, physics, chemistry, code.',
    icon: Boxes,
    tone: 'border-accent-coral/30 bg-accent-coral/[0.08] text-[#b33516] dark:text-[#ff9d7a]',
  },
  {
    title: 'Proofs, RL & CLI',
    href: '/docs/proofs-rl-and-cli/cli-reference',
    pages: '4 pages',
    blurb: 'Certificates, LTLf policies, preference traces, and the six commands.',
    icon: Terminal,
    tone: 'border-verify-pass/30 bg-verify-pass/[0.08] text-verify-pass',
  },
  {
    title: 'Bridges & integrations',
    href: '/docs/bridges-and-integrations/vllm',
    pages: '7 pages',
    blurb: 'vLLM, SGLang, HF Transformers, llama.cpp, diffusion, OpenAI proxy.',
    icon: Plug,
    tone: 'border-border-strong bg-bg-subtle text-ink-primary',
  },
  {
    title: 'API reference',
    href: '/docs/api-reference/python-public-api',
    pages: '4 pages',
    blurb: 'The 128-symbol Python surface, PyO3 native bindings, WASM, exceptions.',
    icon: Code2,
    tone: 'border-border-strong bg-bg-subtle text-ink-primary',
  },
  {
    title: 'Try it in the browser',
    href: '/playground',
    pages: 'interactive',
    blurb: 'Move the constraints, watch masks and splices react. No install, no GPU.',
    icon: Zap,
    tone: 'border-cobalt-500/30 bg-cobalt-500/[0.08] text-cobalt-700 dark:text-cobalt-300',
  },
];

export function DocsMap() {
  return (
    <div className="not-prose my-7">
      <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-muted">
        Start anywhere · the manual
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-cobalt hover:shadow-[var(--vt-shadow-lift)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border ${section.tone}`}
              >
                <section.icon className="h-4 w-4" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
                {section.pages}
              </span>
            </div>
            <p className="mt-3 flex items-center gap-1 text-[13.5px] font-semibold text-ink-primary">
              {section.title}
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-secondary">{section.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

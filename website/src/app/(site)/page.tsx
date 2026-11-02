import type { Metadata } from 'next';
import { Hero } from '@/components/landing/hero';
import { IntegrationMarquee } from '@/components/landing/integration-marquee';
import { Creed } from '@/components/landing/creed';
import { FlutedContractorVisual } from '@/components/landing/fluted-contractor-visual';
import { StandoutCards } from '@/components/landing/standout-cards';
import { SyntaxMath } from '@/components/landing/syntax-math';
import { TierPipeline } from '@/components/landing/tier-pipeline';
import { ZeroDofTape } from '@/components/landing/zero-dof-tape';
import { Superpowers } from '@/components/landing/superpowers';
import { CartridgesShowcase } from '@/components/landing/cartridges-showcase';
import { CartridgeBadges } from '@/components/landing/cartridge-badges';
import { UseCases } from '@/components/landing/use-cases';
import { BenchmarkSection } from '@/components/landing/benchmarks';
import { ProofSection } from '@/components/landing/proof-section';
import { CliTerminal } from '@/components/landing/cli-terminal';
import { LabNotes } from '@/components/landing/lab-notes';
import { DocsGrid } from '@/components/landing/docs-grid';
import { Faq } from '@/components/landing/faq';
import { FinalCta } from '@/components/landing/final-cta';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Veritas — make the model prove it',
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

export default function LandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Veritas',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Linux, macOS, Windows',
    description: siteConfig.description,
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    codeRepository: siteConfig.github,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    softwareVersion: siteConfig.version,
  };

  return (
    <>
      <Hero />
      <IntegrationMarquee />
      <Creed />
      <FlutedContractorVisual />
      <StandoutCards />
      <SyntaxMath />
      <TierPipeline />
      <ZeroDofTape />
      <Superpowers />
      <CartridgesShowcase />
      <CartridgeBadges />
      <UseCases />
      <BenchmarkSection />
      <ProofSection />
      <CliTerminal />
      <LabNotes />
      <DocsGrid />
      <Faq />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

import { Metadata } from 'next';
import { HeroModeToggle } from '@/components/landing/hero-mode-toggle';
import { FlutedContractorVisual } from '@/components/landing/fluted-contractor-visual';
import { ConcentricTierDome } from '@/components/landing/concentric-tier-dome';
import { CartridgeFloatingGrid } from '@/components/landing/cartridge-floating-grid';
import { SpeedupBenchmarkChart } from '@/components/landing/speedup-benchmark-chart';

export const metadata: Metadata = {
  title: 'Veritas — Verified Mathematical Truth for LLMs',
  description:
    'Pydantic ergonomics on the surface; dependency-free Rust theorem proving underneath. Veritas enforces algebraic equations, temporal logic, and domain invariants directly inside the token-generation loop.',
};

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      <HeroModeToggle />
      <FlutedContractorVisual />
      <ConcentricTierDome />
      <CartridgeFloatingGrid />
      <SpeedupBenchmarkChart />
    </main>
  );
}

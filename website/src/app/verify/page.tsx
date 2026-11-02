import { Metadata } from 'next';
import { SchemaSynthWidget } from '@/components/landing/schema-synth-widget';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ShieldCheck, FileText, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verify — Offline Proof Certificate Verifier',
  description: 'Verify SHA-256 witness digests and SMT-LIB2 proof certificates entirely in the browser — zero backend storage.',
};

export default function VerifyPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#14151A]">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Verify Proof Certificate</h1>
              <p className="text-lg text-[#4A5060]">
                Offline cryptographic verification of Veritas SHA-256 witness digests
                and SMT-LIB2 proof scripts — entirely in the browser.
              </p>
            </div>
            <Badge variant="cobalt" size="lg">Zero Backend</Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Widget */}
            <div className="lg:col-span-2">
              <Card className="p-0 overflow-hidden">
                <CardHeader className="p-6 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cobalt-500" />
                    <h2 className="text-lg font-semibold">Paste Proof JSON</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <SchemaSynthWidget />
                </CardContent>
              </Card>
            </div>

            {/* Info cards */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-sm">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#059669] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold">SHA-256 Witness</h4>
                      <p className="text-xs text-[#4A5060]">
                        Every decoded object ships with a self-contained SHA-256 witness digest.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#1E5EFF] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold">SMT-LIB2 Certificate</h4>
                      <p className="text-xs text-[#4A5060]">
                        Offline-verifiable proof script verifiable with `veritas verify-proof`.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-[#059669] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold">Zero Server Cost</h4>
                      <p className="text-xs text-[#4A5060]">
                        Verification uses Web Crypto API + veritas-wasm in the browser.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border border-border-cobalt bg-[#1E5EFF]/5">
              <CardHeader>
                <CardTitle className="text-sm">Shareable URL</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-[#4A5060] mb-3">
                  Every proof produces a shareable URL: <code className="text-[#1E5EFF] font-mono">/verify#witness=...</code>
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 rounded-lg border border-border-subtle bg-white text-xs font-mono text-[#14151A] focus:ring-2 focus:ring-cobalt-500 outline-none"
                    placeholder="/verify#witness=eyJ..."
                  />
                  <button className="px-3 py-2 rounded-lg bg-cobalt-500 text-white text-xs font-semibold hover:bg-cobalt-600 transition-colors">
                    Open
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

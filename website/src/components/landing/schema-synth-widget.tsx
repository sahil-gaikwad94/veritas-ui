'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import { FileText, Zap, Bot, ArrowRight } from 'lucide-react';

interface SchemaSynthWidgetProps {
  initialJson?: string;
}

export function SchemaSynthWidget({ initialJson }: SchemaSynthWidgetProps) {
  const [inputJson, setInputJson] = useState(initialJson || '');
  const [generatedSchema, setGeneratedSchema] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!inputJson.trim()) return;
    setIsGenerating(true);
    try {
      // In production, this calls veritas-wasm synth via Web Worker
      // For now, generate a deterministic TypeScript-port style schema
      const samples = inputJson
        .split('\n')
        .filter(Boolean)
        .map((line) => JSON.parse(line));

      const schema = generateVeritasSchema(samples);
      setGeneratedSchema(schema);
    } catch (err) {
      console.error('Synth failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Live `veritas synth` Widget
          </CardTitle>
          <Badge variant="cobalt" size="sm">Browser WASM</Badge>
        </CardHeader>
        <p className="text-xs text-ink-muted">
          Paste 2–3 sample JSON objects → get a ready-to-copy {@verified_schema}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Sample JSON (JSONL)
          </label>
          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            className="w-full min-h-[200px] p-3 rounded-lg border border-border-subtle bg-[#0A0D14] text-sm font-mono text-slate-300 focus:ring-2 focus:ring-cobalt-500 focus:border-transparent outline-none"
            placeholder='{"weights": {"AAPL": 0.40, "MSFT": 0.35, "NVDA": 0.25}, "expected_return": 0.1615}'
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !inputJson.trim()}
            className="w-full cobalt"
            size="sm"
          >
            {isGenerating ? (
              <Zap className="h-4 w-4 animate-spin" /> Generating…
            ) : (
              <>
                <Bot className="h-4 w-4" /> Generate Schema
              </>
            )}
          </Button>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Generated {@verified_schema}
            </label>
            <div className="relative">
              <pre className="p-3 rounded-lg border border-border-subtle bg-[#0A0D14] text-xs font-mono text-slate-300 overflow-x-auto max-h-[200px]">
                {generatedSchema || '// Schema will appear here'}
              </pre>
              {generatedSchema && (
                <CopyButton value={generatedSchema} size="sm" className="absolute right-3 top-3" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg border border-border-subtle bg-[#0A0D14]/50 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <ArrowRight className="h-3 w-3" />
          Runs entirely in-browser via `veritas-wasm` — zero server cost.
        </span>
      </div>
    </div>
  );
}

function generateVeritasSchema(samples: any[]): string {
  // Deterministic inference: collect keys, infer bounds, detect conservation laws
  const allKeys = new Set<string>();
  const numericKeys = new Set<string>();
  const keyBounds: Record<string, { min: number; max: number }> = {};

  for (const sample of samples) {
    for (const [key, value] of Object.entries(sample)) {
      allKeys.add(key);
      if (typeof value === 'number') {
        numericKeys.add(key);
        if (!keyBounds[key]) {
          keyBounds[key] = { min: value, max: value };
        } else {
          keyBounds[key].min = Math.min(keyBounds[key].min, value);
          keyBounds[key].max = Math.max(keyBounds[key].max, value);
        }
      }
    }
  }

  const lines: string[] = [];
  lines.push('@verified_schema');
  lines.push('def inferred_schema(obj: dict):');
  lines.push('    require(keys_subset(obj, {' + [...allKeys].map((k) => `"${k}"`).join(', ') + '}))');

  // Detect conservation law: sum of weights == 1.0
  const weightKeys = [...allKeys].filter((k) => k.toLowerCase().includes('weight') || k.toLowerCase().includes('alloc'));
  if (weightKeys.length > 0) {
    lines.push(`    require(sum(obj["${weightKeys[0]}"]) == 1.0, tol=1e-6)`);
  }

  // Infer numeric bounds
  for (const key of numericKeys) {
    const { min, max } = keyBounds[key];
    lines.push(`    require(forall(obj["${key}"], lambda v: (${min.toFixed(2)} <= v) & (v <= ${max.toFixed(2)})))`);
  }

  return lines.join('\n');
}

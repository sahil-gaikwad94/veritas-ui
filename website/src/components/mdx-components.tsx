import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import { Steps, Step } from '@/components/docs/steps';
import { Feature, FeatureGrid, KeyValueTable, Stat, StatGrid } from '@/components/docs/feature-grid';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InteractiveTraceViewer } from '@/components/docs/interactive-trace-viewer';
import { DecodeLab } from '@/components/playground/decode-lab';
import { DocsMap } from '@/components/docs/docs-map';

export function getMDXComponents(components?: Record<string, unknown>) {
  return {
    ...components,
    Callout,
    CodeBlock,
    Steps,
    Step,
    FeatureGrid,
    Feature,
    StatGrid,
    Stat,
    KeyValueTable,
    Badge,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    InteractiveTraceViewer,
    DecodeLab,
  } as Record<string, unknown>;
}

export {
  Callout,
  CodeBlock,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Steps,
  Step,
  Feature,
  FeatureGrid,
  Stat,
  StatGrid,
  KeyValueTable,
  InteractiveTraceViewer,
  DecodeLab,
  DocsMap,
};
export { getMDXComponents as MDXComponents } from './mdx-components';

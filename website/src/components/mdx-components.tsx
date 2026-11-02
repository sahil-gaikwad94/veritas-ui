import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import { Steps } from '@/components/docs/steps';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { SchemaSynthWidget } from '@/components/landing/schema-synth-widget';
import { TokenMaskHoverBox } from '@/components/docs/token-mask-hover-box';
import { InteractiveTraceViewer } from '@/components/docs/interactive-trace-viewer';

export function getMDXComponents(components?: any) {
  return {
    ...components,
    // Custom Veritas components
    Callout,
    CodeBlock,
    Steps,
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
    SchemaSynthWidget,
    TokenMaskHoverBox,
    InteractiveTraceViewer,
  } as any;
}

export { Callout, CodeBlock, Badge, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger };

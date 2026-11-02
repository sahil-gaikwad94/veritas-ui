// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
var { docs, meta } = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
export {
  source_config_default as default,
  docs,
  meta
};

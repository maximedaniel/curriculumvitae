import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import remarkSmartypants from "remark-smartypants";
import { parse } from "yaml";
import remarkQuarto from "./scripts/remark-quarto.ts";

// Import a .yml file as a JavaScript object.
function yaml(): Plugin {
  return {
    name: "yaml",
    transform(code, id) {
      if (!id.endsWith(".yml")) return null;
      return { code: `export default ${JSON.stringify(parse(code))};`, map: null };
    },
  };
}

export default defineConfig({
  build: { assetsDir: "static" },
  plugins: [
    yaml(),
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, [remarkSmartypants, { dashes: "oldschool" }], remarkQuarto],
        rehypePlugins: [rehypeSlug],
      }),
    },
    react({ include: /\.(mdx|tsx|ts|jsx|js)$/ }),
  ],
  css: {
    preprocessorOptions: {
      scss: { quietDeps: true, silenceDeprecations: ["import", "global-builtin", "color-functions", "mixed-decls", "if-function"] },
    },
  },
});

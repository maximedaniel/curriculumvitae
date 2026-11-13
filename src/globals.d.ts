declare module "*.yml" {
  const data: unknown;
  export default data;
}
declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const frontmatter: Record<string, unknown>;
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}
declare module "smartypants" {
  export function smartypantsu(text: string, attr?: number | string): string;
}

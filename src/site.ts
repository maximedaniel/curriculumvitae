// Navbar structure. The labels come from the title of each page.
export interface NavLeaf {
  path: string;
}
export const navLeft: NavLeaf[] = [{ path: "/pages/research/research.html" }];
export const navMisc: { label: string; items: NavLeaf[] } = {
  label: "Misc",
  items: [
    { path: "/pages/teaching/user-scenario.html" },
    { path: "/pages/teaching/design-methods.html" },
    { path: "/pages/teaching/paper-writing.html" },
    { path: "/pages/teaching/presentation-template.html" },
  ],
};
export const SITE_TITLE = "Home";

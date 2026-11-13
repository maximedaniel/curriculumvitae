import { useEffect, useState } from "react";
import { useLocation } from "react-router";

interface Heading {
  id: string;
  text: string;
  level: number;
}

// The table of contents is built in the browser from the headings of the page.
export function Toc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main h1[id], main h2[id]"));
    setHeadings(nodes.map((n) => ({ id: n.id, text: n.textContent ?? "", level: n.tagName === "H1" ? 1 : 2 })));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="toc-col">
      {headings.length > 0 && (
        <nav id="TOC" role="doc-toc">
          <h2>On this page</h2>
          <ul>
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: h.level === 2 ? "0.6rem" : 0 }}>
                <a href={`#${h.id}`} className={h.id === active ? "active" : undefined}>
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Layout } from "./components/layout/Layout";
import { routes } from "./routes";
import { SITE_TITLE } from "./site";

function NotFound() {
  return <h1>Page not found</h1>;
}

export function App() {
  const { pathname } = useLocation();
  const route = routes.find((r) => r.path === pathname);
  useEffect(() => {
    document.title = `${route?.title ?? "Not found"} – ${SITE_TITLE}`;
    window.scrollTo(0, 0);
  }, [route]);
  return (
    <Layout>
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element()} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

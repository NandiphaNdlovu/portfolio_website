import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { homeRoute, projectsRoute } from "./routes.ts";
import { MainLayout } from "../components/layouts/MainLayout.tsx";

// Pages are code-split so the first load only ships the shell + the page being viewed.
const HomePage = lazy(
  () => import("../components/pages/HomePage/HomePage.tsx"),
);
const ProjectsPage = lazy(
  () => import("../components/pages/ProjectsPage/ProjectsPage.tsx"),
);

interface RouteItems {
  path: string;
  element: React.ReactNode;
  breadcrumb?: string;
}

export const portfolioRoutes: RouteItems[] = [
  { path: homeRoute, element: <HomePage /> },
  { path: projectsRoute, element: <ProjectsPage />, breadcrumb: "project" },
];

export function StaticRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {portfolioRoutes.map((route) => (
          <Route
            key={route.path}
            index={route.path === homeRoute}
            path={route.path === homeRoute ? undefined : route.path}
            element={route.element}
          />
        ))}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

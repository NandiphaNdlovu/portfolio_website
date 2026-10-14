import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { gameRoute, homeRoute, projectsRoute } from "./routes.ts";
import { MainLayout } from "../components/layouts/MainLayout.tsx";

const HomePage = lazy(
  () => import("../components/pages/HomePage/HomePage.tsx"),
);
const ProjectsPage = lazy(
  () => import("../components/pages/ProjectsPage/ProjectsPage.tsx"),
);
const GamePage = lazy(
  () => import("../components/pages/GamePage/GamePage.tsx"),
);

interface RouteItems {
  path: string;
  element: React.ReactNode;
  breadcrumb?: string;
}

export const portfolioRoutes: RouteItems[] = [
  { path: homeRoute, element: <HomePage /> },
  { path: projectsRoute, element: <ProjectsPage />, breadcrumb: "project" },
  { path: gameRoute, element: <GamePage />, breadcrumb: "games" },
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

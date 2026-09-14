import { Route, Routes } from "react-router-dom";
import { HomePage } from "../components/pages/HomePage/HomePage.tsx";
import { homeRoute, projectsRoute } from "./routes.ts";
import { MainLayout } from "../components/layouts/MainLayout.tsx";

interface RouteItems {
  path: string;
  element: React.ReactNode;
  breadcrumb?: string;
}

export const portfolioRoutes: RouteItems[] = [
  { path: homeRoute, element: <HomePage /> },
  { path: projectsRoute, element: <>Project</>, breadcrumb: "project" },
];

export function StaticRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {portfolioRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

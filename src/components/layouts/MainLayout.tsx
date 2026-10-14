import { Suspense, useRef } from "react";
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { SideDrawer } from "../organisms/Drawer/DrawerElement.tsx";
import { NavBarElement } from "../organisms/NavigationBar/NavBarElement.tsx";
import { FooterElement } from "../organisms/FooterBar/FooterElement.tsx";

export function MainLayout() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="flex min-h-screen">
      {/* Skip link (a button-style anchor, since a #hash would change the route) */}
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      {/* Side Drawer */}
      <SideDrawer />

      {/* Main application */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-glass-soft backdrop-blur-md">
          <NavBarElement />
        </header>

        {/* Body */}
        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className="flex-1 p-2 outline-none"
        >
          <Suspense
            fallback={
              <div className="flex justify-center p-8">
                <CircularProgress aria-label="Loading page" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="bg-glass-soft backdrop-blur-md">
          <FooterElement />
        </footer>
      </div>
    </div>
  );
}

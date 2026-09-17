import { Outlet } from "react-router-dom";
import { SideDrawer } from "../organisms/Drawer/DrawerElement.tsx";
import { NavBarElement } from "../organisms/NavigationBar/NavBarElement.tsx";
import { FooterElement } from "../organisms/FooterBar/FooterElement.tsx";

export function MainLayout() {
  return (
    <div className="flex max-h-screen">
      {/* Side Drawer */}
      <SideDrawer />

      {/* Main application */}
      <div className="flex min-w-0 flex-1 max-h-screen flex-col">
        {/* Navigation */}
        <header className="sticky top-0 !bg-white/30 z-50 backdrop-blur-md">
          <NavBarElement />
        </header>

        {/* Body */}
        <main className="flex-1 p-2 h-full">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="!bg-white/30 z-50 backdrop-blur-md">
          <FooterElement />
        </footer>
      </div>
    </div>
  );
}

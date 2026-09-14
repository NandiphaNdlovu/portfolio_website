import { Outlet } from "react-router-dom";
import { SideDrawer } from "../organisms/Drawer/DrawerElement.tsx";
import { NavBarElement } from "../organisms/NavigationBar/NavBarElement.tsx";
import { FooterElement } from "../organisms/FooterBar/FooterElement.tsx";

export function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Side Drawer */}
      <SideDrawer />

      {/* Main application */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Navigation */}
        <header className="sticky top-0 !bg-white/10 z-50 !shadow-[0_2px_5px_#420D4B]">
          <NavBarElement />
        </header>

        {/* Body */}
        <main className="flex-1 p-2 ">
          <Outlet />
        </main>

        {/* Footer */}
        <FooterElement />
      </div>
    </div>
  );
}

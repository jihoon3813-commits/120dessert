import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isPortal = pathname.startsWith('/portal');

  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 font-sans">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      {!isPortal && <Footer />}
    </div>
  );
}

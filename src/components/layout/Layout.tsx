import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingActionBar from "./FloatingActionBar";
import { useEffect } from "react";
import { cn } from "../../lib/utils";

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  const isPortalOrAdmin = pathname.startsWith('/portal') || pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 font-sans">
      {!isPortalOrAdmin && <Header />}
      <main className={cn("flex-grow", !isPortalOrAdmin && "pt-16")}>
        <Outlet />
      </main>
      {!isPortalOrAdmin && <FloatingActionBar />}
      {!isPortalOrAdmin && <Footer />}
    </div>
  );
}

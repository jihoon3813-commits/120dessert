import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "브랜드소개", path: "/#brand" },
    { name: "메뉴소개", path: "/#menu" },
    { name: "도입안내", path: "/#adoption" },
    { name: "성공사례", path: "/#success" },
    { name: "가맹점 보기", path: "/stores" },
    { name: "가맹문의", path: "/inquiry" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b border-neutral-200 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-black text-2xl tracking-tight text-neutral-900 hover:text-amber-500 transition-colors">
          <span className="text-amber-500">120pie</span>&coffee
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-bold transition-all",
                  location.pathname === link.path ? "text-amber-500" : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-3 border-l border-neutral-200 pl-6">
            <Link
              to="/portal"
              className="px-4 py-2 text-sm font-bold text-neutral-600 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
            >
              점주전용
            </Link>
            <Link
              to="/inquiry"
              className="px-4 py-2 text-sm font-black text-neutral-900 bg-amber-400 rounded hover:bg-amber-300 transition-colors shadow-sm"
            >
              도입 문의
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 -mr-2 text-neutral-600 hover:text-neutral-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 absolute top-16 left-0 right-0 shadow-2xl">
          <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-4 text-base font-bold text-neutral-600 border-b border-neutral-100 flex justify-between items-center hover:text-amber-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <ChevronRight size={16} className="text-neutral-300" />
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-6 px-3">
              <Link
                to="/portal"
                className="flex items-center justify-center w-full px-4 py-3.5 text-sm font-bold text-neutral-600 bg-neutral-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                점주전용 바로가기
              </Link>
              <Link
                to="/inquiry"
                className="flex items-center justify-center w-full px-4 py-3.5 text-sm font-black text-neutral-900 bg-amber-400 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                도입 문의하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

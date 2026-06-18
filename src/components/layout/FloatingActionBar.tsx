import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Instagram, Youtube, Phone, MessageSquare, FileText } from "lucide-react";
import { cn } from "../../lib/utils";

export default function FloatingActionBar() {
  const materials = useQuery(api.materials.list);

  // Find the proposal PDF material dynamically from Convex database
  const proposalMaterial = materials?.find(
    (m) => m.isVisible && m.format.toUpperCase() === "PDF" && m.title.includes("제안서")
  );

  // Fallback to inquiry form if no PDF is registered
  const handleProposalClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!proposalMaterial?.fileUrl) {
      e.preventDefault();
      // Scroll to inquiry section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = "/inquiry";
      }
    }
  };

  const actionItems = [
    {
      id: "instagram",
      label: "인스타그램",
      icon: <Instagram size={20} className="stroke-[2.25]" />,
      color: "bg-[#E1306C] hover:bg-[#D82B63] text-white hover:shadow-[0_4px_16px_rgba(225,48,108,0.35)]",
      href: "https://www.instagram.com/120pie_official", // Placeholder official account
    },
    {
      id: "naver-blog",
      label: "네이버 블로그",
      icon: <span className="font-extrabold text-[15px] select-none tracking-tight">N</span>,
      color: "bg-[#03C75A] hover:bg-[#02B14F] text-white hover:shadow-[0_4px_16px_rgba(3,199,90,0.35)]",
      href: "https://blog.naver.com/120pie", // Placeholder blog
    },
    {
      id: "youtube",
      label: "유튜브",
      icon: <Youtube size={20} className="stroke-[2.25]" />,
      color: "bg-[#FF0000] hover:bg-[#E60000] text-white hover:shadow-[0_4px_16px_rgba(255,0,0,0.35)]",
      href: "https://www.youtube.com/@120pie", // Placeholder channel
    },
    {
      id: "phone",
      label: "전화 상담",
      icon: <Phone size={19} className="stroke-[2.25] fill-current" />,
      color: "bg-[#007AFF] hover:bg-[#0069D9] text-white hover:shadow-[0_4px_16px_rgba(0,122,255,0.35)]",
      href: "tel:1644-1200",
    },
    {
      id: "kakao",
      label: "카카오톡",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3c-5.52 0-10 3.48-10 7.78 0 2.76 1.83 5.18 4.59 6.51-.19.67-.69 2.44-.79 2.82-.13.48.17.47.36.35.15-.09 2.39-1.62 3.36-2.28.8.22 1.63.34 2.48.34 5.52 0 10-3.48 10-7.78S17.52 3 12 3z" />
        </svg>
      ),
      color: "bg-[#FEE500] hover:bg-[#F2DA00] text-[#3C1E1E] hover:shadow-[0_4px_16px_rgba(254,229,0,0.35)]",
      href: "https://pf.kakao.com/_120pie", // Placeholder channel
    },
    {
      id: "inquiry",
      label: "도입 문의",
      icon: <MessageSquare size={19} className="stroke-[2.25] fill-none" />,
      color: "bg-[#FFCD00] hover:bg-[#E6B800] text-[#111] border border-black/5 hover:shadow-[0_4px_16px_rgba(255,205,0,0.35)]",
      href: "#contact",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          e.preventDefault();
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    {
      id: "proposal",
      label: "제안서 PDF",
      icon: <FileText size={19} className="stroke-[2.25]" />,
      color: "bg-[#FFCD00] hover:bg-[#E6B800] text-[#111] border border-black/5 hover:shadow-[0_4px_16px_rgba(255,205,0,0.35)]",
      href: proposalMaterial?.fileUrl || "#contact",
      onClick: handleProposalClick,
      download: proposalMaterial?.fileUrl ? "120pie_창업제안서.pdf" : undefined,
    },
  ];

  return (
    <div className="fixed right-6 bottom-1/2 translate-y-1/2 z-40 hidden md:block animate-fade-in">
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-neutral-100 p-2.5 flex flex-col gap-3.5">
        {actionItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={item.onClick}
            download={item.download}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative cursor-pointer",
              item.color
            )}
            title={item.label}
          >
            {item.icon}
            {/* Tooltip */}
            <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-200 bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md pointer-events-none origin-right">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

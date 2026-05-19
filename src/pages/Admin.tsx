import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
  Search,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Check,
  X,
  FileText,
  User,
  Phone,
  MapPin,
  Clock3,
  ShieldAlert,
  ArrowUpDown,
  Download,
  LogOut,
  LayoutDashboard,
  Grid3X3,
  ShoppingBag,
  Tag,
  Truck,
  Store
} from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "../lib/utils";
import ProductsSection from "./admin/ProductsSection";
import CategoriesSection from "./admin/CategoriesSection";
import StoresSection from "./admin/StoresSection";
import StoreInquiriesSection from "./admin/StoreInquiriesSection";
import MaterialsSection from "./admin/MaterialsSection";

// Types
type AdminTab = "inquiries" | "products" | "categories" | "deliveries" | "portalMenus" | "stores" | "storeInquiries" | "materials";
type StatusFilter = "all" | "pending" | "contacted" | "completed";
type TypeFilter = "all" | "신규 도입" | "공동간판" | "단독 전환" | "추가 도입";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin_logged_in") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("admin_logged_in", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLoginScreen onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

// 1. Admin Login Screen
function AdminLoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();
    if (cleanUsername === "admin" && cleanPassword === "120pie") {
      onLogin();
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-neutral-800 text-white p-8 rounded-2xl shadow-2xl border border-neutral-700 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300"></div>
        
        <div className="w-16 h-16 bg-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-neutral-600">
          <ShieldAlert className="text-amber-400" size={32} />
        </div>
        
        <h1 className="text-2xl font-black text-center mb-1 text-white tracking-tight">
          120pie 본사 관리자 시스템
        </h1>
        <p className="text-sm text-neutral-400 text-center mb-8">
          Authorized Personnel Only
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-500/30 text-red-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="관리자 계정 아이디"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl outline-none focus:border-amber-400 text-sm text-white transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl outline-none focus:border-amber-400 text-sm text-white transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3.5 bg-amber-400 text-neutral-950 font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10 mt-6"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-xs text-neutral-500 mt-8">
          기본 계정: admin / 120pie
        </p>
      </div>
    </div>
  );
}

// 2. Admin Dashboard Screen
// 2. Admin Dashboard Screen
const SELECTABLE_ICONS = [
  { name: "Package", label: "상자 (Package)" },
  { name: "ClipboardList", label: "클립보드 리스트 (ClipboardList)" },
  { name: "MessageSquare", label: "말풍선 (MessageSquare)" },
  { name: "Megaphone", label: "확성기 (Megaphone)" },
  { name: "FileText", label: "문서 (FileText)" },
  { name: "FolderDown", label: "폴더 다운로드 (FolderDown)" },
  { name: "Settings", label: "톱니바퀴 (Settings)" },
  { name: "HelpCircle", label: "물음표 (HelpCircle)" },
  { name: "Store", label: "상점 (Store)" },
  { name: "TrendingUp", label: "성장 그래프 (TrendingUp)" },
  { name: "Bell", label: "종 (Bell)" },
  { name: "BookOpen", label: "책 (BookOpen)" },
  { name: "ShoppingBag", label: "쇼핑백 (ShoppingBag)" },
  { name: "Truck", label: "트럭 (Truck)" },
];

function PortalIcon({ name, className, size = 16 }: { name: string; className?: string; size?: number }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.HelpCircle className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const inquiries = useQuery(api.inquiries.list);
  const updateStatus = useMutation(api.inquiries.updateStatus);
  const removeInquiry = useMutation(api.inquiries.remove);

  // Portal menus
  const portalMenus = useQuery(api.portalMenus.list);
  const seedPortalMenus = useMutation(api.portalMenus.seedDefault);
  const createPortalMenu = useMutation(api.portalMenus.create);
  const updatePortalMenu = useMutation(api.portalMenus.update);
  const removePortalMenu = useMutation(api.portalMenus.remove);
  const reorderPortalMenus = useMutation(api.portalMenus.reorder);

  // Orders and Deliveries
  const orders = useQuery(api.orders.list);
  const updateOrderStatus = useMutation(api.orders.updateStatus);
  const removeOrder = useMutation(api.orders.remove);

  // Stores (Franchises)
  const stores = useQuery(api.stores.list);

  // States
  const [activeTab, setActiveTab] = useState<AdminTab>("inquiries");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Portal menu form states
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  const [menuFormData, setMenuFormData] = useState({
    label: "",
    action: "",
    iconName: "Package",
    link: "",
    order: 1,
    isVisible: true,
  });

  // Seeding trigger
  React.useEffect(() => {
    if (activeTab === "portalMenus" && portalMenus !== undefined && portalMenus.length === 0) {
      seedPortalMenus();
    }
  }, [activeTab, portalMenus, seedPortalMenus]);

  // Loading state
  if (inquiries === undefined || portalMenus === undefined || orders === undefined || stores === undefined) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-4">
        <RefreshCw className="animate-spin text-neutral-500" size={32} />
        <p className="text-sm font-bold text-neutral-500">데이터를 불러오고 있습니다...</p>
      </div>
    );
  }

  // Statistics
  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter((i) => i.status === "pending" || !i.status).length;
  const contactedCount = inquiries.filter((i) => i.status === "contacted").length;
  const completedCount = inquiries.filter((i) => i.status === "completed").length;

  // Filtered inquiries
  const filteredInquiries = inquiries
    .filter((i) => {
      // Search
      const searchLower = searchTerm.toLowerCase();
      const name = i.name || "";
      const phone = i.phone || "";
      const region = i.region || "";
      const storeName = i.storeName || "";
      const content = i.content || "";

      const matchesSearch =
        name.toLowerCase().includes(searchLower) ||
        phone.includes(searchLower) ||
        region.toLowerCase().includes(searchLower) ||
        (storeName && storeName.toLowerCase().includes(searchLower)) ||
        (content.toLowerCase().includes(searchLower));

      // Status
      const currentStatus = i.status || "pending";
      const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;

      // Type
      const matchesType = typeFilter === "all" || i.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.createdAt - a.createdAt;
      } else {
        return a.createdAt - b.createdAt;
      }
    });

  const selectedInquiry = inquiries.find((i) => i._id === selectedInquiryId);

  // Sorted portal menus
  const sortedMenus = [...portalMenus].sort((a, b) => a.order - b.order);

  // Handlers
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus({ id: id as Id<"inquiries">, status: newStatus });
    } catch (err) {
      alert("상태 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("정말 이 가맹문의 데이터를 삭제하시겠습니까? 복구할 수 없습니다.")) {
      try {
        setIsDeleting(id);
        await removeInquiry({ id: id as Id<"inquiries"> });
        if (selectedInquiryId === id) {
          setSelectedInquiryId(null);
        }
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const exportToCsv = () => {
    if (filteredInquiries.length === 0) return;
    
    const headers = [
      "접수 일시", "신청 유형", "신청자명", "연락처", "지역", "상담희망 시간", 
      "매장유형", "기존 업종", "매장명", "주요 메뉴", "평수", 
      "관심 메뉴", "희망 형태", "문의 상세내용", "처리 상태"
    ];

    const rows = filteredInquiries.map(i => [
      new Date(i.createdAt).toLocaleString("ko-KR"),
      i.type || "",
      i.name || "",
      i.phone || "",
      i.region || "",
      i.consultingTime || "",
      i.hasStore ? "매장 있음" : "매장 없음",
      i.industry || "",
      i.storeName || "",
      i.coreMenu || "",
      i.storeSize || "",
      (i.interestMenus || []).join(", "),
      (i.interestTypes || []).join(", "),
      (i.content || "").replace(/\n/g, " "),
      i.status || "pending"
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `120pie_franchise_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Portal menu handlers
  const handleAddMenuClick = () => {
    setSelectedMenuId(null);
    const nextOrder = sortedMenus.length > 0 ? Math.max(...sortedMenus.map(m => m.order)) + 1 : 1;
    setMenuFormData({
      label: "",
      action: "",
      iconName: "Package",
      link: "",
      order: nextOrder,
      isVisible: true,
    });
    setIsEditingMenu(true);
  };

  const handleEditMenuClick = (menu: any) => {
    setSelectedMenuId(menu._id);
    setMenuFormData({
      label: menu.label,
      action: menu.action,
      iconName: menu.iconName,
      link: menu.link,
      order: menu.order,
      isVisible: menu.isVisible,
    });
    setIsEditingMenu(true);
  };

  const handleDeleteMenu = async (id: string) => {
    if (confirm("정말 이 메뉴 항목을 삭제하시겠습니까? 점주 포털에서 즉시 삭제됩니다.")) {
      try {
        await removePortalMenu({ id: id as Id<"portalMenus"> });
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleToggleMenuVisibility = async (menu: any) => {
    try {
      await updatePortalMenu({
        id: menu._id,
        label: menu.label,
        action: menu.action,
        iconName: menu.iconName,
        link: menu.link,
        order: menu.order,
        isVisible: !menu.isVisible,
      });
    } catch (err) {
      alert("노출 상태 변경 중 오류가 발생했습니다.");
    }
  };

  const handleMoveMenu = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedMenus.length) return;

    const currentItem = sortedMenus[index];
    const targetItem = sortedMenus[targetIndex];

    try {
      await reorderPortalMenus({
        items: [
          { id: currentItem._id, order: targetItem.order },
          { id: targetItem._id, order: currentItem.order },
        ],
      });
    } catch (err) {
      alert("순서 변경 중 오류가 발생했습니다.");
    }
  };

  const handleMenuFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedMenuId) {
        await updatePortalMenu({
          id: selectedMenuId as Id<"portalMenus">,
          label: menuFormData.label,
          action: menuFormData.action,
          iconName: menuFormData.iconName,
          link: menuFormData.link,
          order: menuFormData.order,
          isVisible: menuFormData.isVisible,
        });
      } else {
        await createPortalMenu({
          label: menuFormData.label,
          action: menuFormData.action,
          iconName: menuFormData.iconName,
          link: menuFormData.link,
          order: menuFormData.order,
          isVisible: menuFormData.isVisible,
        });
      }
      setIsEditingMenu(false);
    } catch (err) {
      alert("메뉴 저장 중 오류가 발생했습니다.");
    }
  };

  const sideNav: { id: AdminTab; icon: React.ReactNode; label: string; badge?: number }[] = [
    { id: "inquiries", icon: <LayoutDashboard size={16} />, label: "가맹 도입 문의", badge: inquiries.length },
    { id: "stores", icon: <Store size={16} />, label: "가맹점 관리", badge: stores.length },
    { id: "storeInquiries", icon: <MessageSquare size={16} />, label: "점주 문의 관리" },
    { id: "products", icon: <ShoppingBag size={16} />, label: "제품 관리" },
    { id: "categories", icon: <Tag size={16} />, label: "카테고리 관리" },
    { id: "deliveries", icon: <Truck size={16} />, label: "배송 관리", badge: orders.filter((o) => o.status === "pending").length },
    { id: "materials", icon: <FileText size={16} />, label: "교육/홍보물 관리" },
    { id: "portalMenus", icon: <Grid3X3 size={16} />, label: "점주 포털 메뉴", badge: portalMenus.length },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="fixed top-0 left-0 h-screen w-60 bg-neutral-900 text-white flex flex-col z-40 shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-neutral-800">
          <span className="font-black text-lg tracking-tight">
            <span className="text-amber-400">120pie</span> Admin
          </span>
          <span className="block text-[10px] text-neutral-500 font-mono mt-0.5">HQ Management System</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-2 pb-2">메뉴</p>
          {sideNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all",
                activeTab === item.id
                  ? "bg-amber-400 text-neutral-950"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className={cn(
                  "ml-auto text-[10px] px-1.5 py-0.5 rounded font-black",
                  activeTab === item.id ? "bg-neutral-900/20 text-neutral-950" : "bg-neutral-700 text-neutral-300"
                )}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg text-xs font-bold transition-all"
          >
            <LogOut size={14} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Top header bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-sm">
          <div className="px-8 h-14 flex items-center justify-between">
            <div>
              <h1 className="text-base font-black text-neutral-900 tracking-tight">
                {{ inquiries: "가맹 도입 문의 관리", stores: "가맹점 관리", products: "제품 관리", categories: "카테고리 관리", deliveries: "배송 관리", portalMenus: "점주 포털 메뉴 관리" }[activeTab]}
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">
                {{ inquiries: "홈페이지 도입 문의 폼을 통해 접수된 실시간 데이터", stores: "점주 로그인 계정 및 가맹점 상세 정보를 관리합니다", products: "쇼핑몰 판매 제품을 등록·수정·삭제합니다", categories: "제품 카테고리를 관리합니다", deliveries: "배송 현황을 관리합니다", portalMenus: "점주 전용 포털의 퀵 메뉴를 동적으로 관리" }[activeTab]}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {activeTab === "inquiries" && (
                <button
                  onClick={exportToCsv}
                  className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 bg-white hover:bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200 transition-colors"
                >
                  <Download size={13} />
                  CSV 내보내기
                </button>
              )}
              {activeTab === "portalMenus" && (
                <button
                  onClick={handleAddMenuClick}
                  className="text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
                >
                  + 새 메뉴 추가
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-8 space-y-6">

        {activeTab === "inquiries" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="전체 문의" count={totalCount} color="border-neutral-200 text-neutral-900 bg-white" />
              <StatsCard
                title="대기중"
                count={pendingCount}
                color="border-amber-200 text-amber-600 bg-amber-50/30"
                icon={<Clock size={16} />}
              />
              <StatsCard
                title="연락완료"
                count={contactedCount}
                color="border-blue-200 text-blue-600 bg-blue-50/30"
                icon={<CheckCircle2 size={16} />}
              />
              <StatsCard
                title="상담완료"
                count={completedCount}
                color="border-green-200 text-green-600 bg-green-50/30"
                icon={<Check size={16} />}
              />
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Search */}
                <div className="md:col-span-6 relative">
                  <Search className="absolute left-3.5 top-3.5 text-neutral-400" size={16} />
                  <input
                    type="text"
                    placeholder="이름, 연락처, 매장명, 지역 등으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  />
                </div>
                
                {/* Type Filter */}
                <div className="md:col-span-3">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  >
                    <option value="all">모든 신청 유형</option>
                    <option value="신규 도입">신규 도입</option>
                    <option value="공동간판">공동간판</option>
                    <option value="단독 전환">단독 전환</option>
                    <option value="추가 도입">추가 도입</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div className="md:col-span-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  >
                    <option value="all">모든 처리 상태</option>
                    <option value="pending">대기중 (pending)</option>
                    <option value="contacted">연락 완료 (contacted)</option>
                    <option value="completed">상담 완료 (completed)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                <div>
                  검색 결과: <span className="font-bold text-neutral-900">{filteredInquiries.length}</span>건
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                    className="flex items-center gap-1 hover:text-neutral-950 font-medium"
                  >
                    <ArrowUpDown size={12} />
                    {sortOrder === "newest" ? "최신순" : "오래된순"}
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area: Table & Detail Drawer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Table Container */}
              <div className={cn(
                "bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all",
                selectedInquiryId ? "lg:col-span-7" : "lg:col-span-12"
              )}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-50/50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        <th className="p-4">일시</th>
                        <th className="p-4">유형</th>
                        <th className="p-4">신청자</th>
                        <th className="p-4">지역</th>
                        <th className="p-4">처리상태</th>
                        <th className="p-4 text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 text-sm">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-neutral-400 font-medium">
                            조건에 맞는 가맹 문의 내역이 없습니다.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((i) => {
                          const currentStatus = i.status || "pending";
                          return (
                            <tr
                              key={i._id}
                              onClick={() => setSelectedInquiryId(i._id)}
                              className={cn(
                                "hover:bg-neutral-50/80 cursor-pointer transition-colors",
                                selectedInquiryId === i._id ? "bg-amber-50/40 hover:bg-amber-50/50" : ""
                              )}
                            >
                              <td className="p-4 whitespace-nowrap text-xs text-neutral-500 font-medium">
                                {formatDate(i.createdAt)}
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <span className="inline-block px-2.5 py-1 text-xs font-bold bg-neutral-100 text-neutral-800 rounded">
                                  {i.type}
                                </span>
                              </td>
                              <td className="p-4 whitespace-nowrap font-bold text-neutral-900">
                                {i.name}
                              </td>
                              <td className="p-4 whitespace-nowrap text-neutral-600">
                                {i.region}
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <StatusBadge status={currentStatus} />
                              </td>
                              <td className="p-4 whitespace-nowrap text-center" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => handleDelete(i._id)}
                                  disabled={isDeleting === i._id}
                                  className="text-neutral-400 hover:text-red-600 p-1.5 rounded hover:bg-neutral-100 transition-colors"
                                  title="삭제"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Drawer / Detail view */}
              {selectedInquiry && (
                <div className="lg:col-span-5 bg-white border border-neutral-200 shadow-sm rounded-2xl overflow-hidden sticky top-24">
                  {/* Header */}
                  <div className="p-5 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 bg-neutral-900 text-white rounded">
                          {selectedInquiry.type}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {new Date(selectedInquiry.createdAt).toLocaleString("ko-KR")}
                        </span>
                      </div>
                      <h3 className="font-bold text-neutral-900 text-lg mt-1">
                        {selectedInquiry.name} 님의 문의
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedInquiryId(null)}
                      className="p-1 rounded hover:bg-neutral-200 text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-6 max-h-[60vh] overflow-y-auto">
                    {/* Contact and Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <InfoItem icon={<User size={14} />} label="신청인" value={selectedInquiry.name} />
                      <InfoItem icon={<Phone size={14} />} label="연락처" value={selectedInquiry.phone} />
                      <InfoItem icon={<MapPin size={14} />} label="희망지역" value={selectedInquiry.region} />
                      <InfoItem
                        icon={<Clock3 size={14} />}
                        label="희망상담시간"
                        value={selectedInquiry.consultingTime || "지정 안 함"}
                      />
                    </div>

                    <hr className="border-neutral-100" />

                    {/* Store Status Info */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider">
                        매장 및 기존 정보
                      </h4>
                      <div className="bg-neutral-50 p-4 rounded-xl space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">점포 보유 여부</span>
                          <span className="font-bold text-neutral-900">
                            {selectedInquiry.hasStore ? "보유하고 있음" : "점포 없음 (창업 예정)"}
                          </span>
                        </div>

                        {selectedInquiry.hasStore && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">현재 업종</span>
                              <span className="font-bold text-neutral-900">{selectedInquiry.industry || "-"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">현재 매장명</span>
                              <span className="font-bold text-neutral-900">{selectedInquiry.storeName || "-"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">주요 판매 메뉴</span>
                              <span className="font-bold text-neutral-900">{selectedInquiry.coreMenu || "-"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">매장 평수</span>
                              <span className="font-bold text-neutral-900">{selectedInquiry.storeSize || "-"}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Core Choices */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">
                          도입 희망 디저트
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {(!selectedInquiry.interestMenus || selectedInquiry.interestMenus.length === 0) ? (
                            <span className="text-sm text-neutral-500">없음</span>
                          ) : (
                            selectedInquiry.interestMenus.map((menu, idx) => (
                              <span key={idx} className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                                {menu}
                              </span>
                            ))
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">
                          희망 도입 형태
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {(!selectedInquiry.interestTypes || selectedInquiry.interestTypes.length === 0) ? (
                            <span className="text-sm text-neutral-500">없음</span>
                          ) : (
                            selectedInquiry.interestTypes.map((type, idx) => (
                              <span key={idx} className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                                {type}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <hr className="border-neutral-100" />

                    {/* Content Box */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider">
                        문의 내용 상세
                      </h4>
                      <div className="bg-neutral-50 p-4 rounded-xl text-sm leading-relaxed text-neutral-700 whitespace-pre-line border border-neutral-100">
                        {selectedInquiry.content || "상세 문의 내용이 없습니다."}
                      </div>
                    </div>
                  </div>

                  {/* Footer / Actions */}
                  <div className="p-5 border-t border-neutral-200 bg-neutral-50 flex flex-col gap-3">
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      처리 상태 관리
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <StatusChangeButton
                        active={selectedInquiry.status === "pending" || !selectedInquiry.status}
                        label="대기중"
                        color="hover:bg-amber-100 hover:text-amber-800 border-amber-300 bg-amber-50 text-amber-800"
                        onClick={() => handleStatusChange(selectedInquiry._id, "pending")}
                      />
                      <StatusChangeButton
                        active={selectedInquiry.status === "contacted"}
                        label="연락완료"
                        color="hover:bg-blue-100 hover:text-blue-800 border-blue-300 bg-blue-50 text-blue-800"
                        onClick={() => handleStatusChange(selectedInquiry._id, "contacted")}
                      />
                      <StatusChangeButton
                        active={selectedInquiry.status === "completed"}
                        label="상담완료"
                        color="hover:bg-green-100 hover:text-green-800 border-green-300 bg-green-50 text-green-800"
                        onClick={() => handleStatusChange(selectedInquiry._id, "completed")}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
          {activeTab === "stores" && <StoresSection />}
          {activeTab === "products" && <ProductsSection />}
          {activeTab === "categories" && <CategoriesSection />}
          {activeTab === "storeInquiries" && <StoreInquiriesSection />}
          {activeTab === "materials" && <MaterialsSection />}
          {activeTab === "deliveries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">배송 및 발주 주문 관리</h2>
                <p className="text-xs text-neutral-500 mt-1">각 가맹점(점주)에서 신청한 물품 발주 주문 및 배송 상태를 처리합니다.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                  <Truck size={48} className="mb-4 text-neutral-300 animate-bounce" />
                  <p className="text-sm font-bold">접수된 발주 주문이 없습니다.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-50/50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        <th className="p-4">주문일시</th>
                        <th className="p-4">가맹점</th>
                        <th className="p-4">발주 내역</th>
                        <th className="p-4 text-right">총 주문금액</th>
                        <th className="p-4 text-center">처리 상태</th>
                        <th className="p-4 text-center">배송 상태 변경</th>
                        <th className="p-4 text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 text-sm">
                      {orders.map((o) => {
                        const itemSummary = o.items.length > 0
                          ? `${o.items[0].name} ${o.items.length > 1 ? `외 ${o.items.length - 1}건` : ""}`
                          : "상품 없음";

                        return (
                          <tr key={o._id} className="hover:bg-neutral-50/50 transition-colors">
                            <td className="p-4 text-xs text-neutral-500 font-medium">
                              {new Date(o.createdAt).toLocaleString("ko-KR")}
                            </td>
                            <td className="p-4 font-bold text-neutral-900">{o.storeName}</td>
                            <td className="p-4 text-neutral-600 max-w-xs">
                              <div className="font-medium text-neutral-900">{itemSummary}</div>
                              <div className="text-[10px] text-neutral-400 mt-1 leading-normal break-all">
                                {o.items.map(i => `${i.name}(${i.quantity}개)`).join(", ")}
                              </div>
                            </td>
                            <td className="p-4 text-right font-black text-neutral-950">
                              {o.totalAmount.toLocaleString()}원
                            </td>
                            <td className="p-4 text-center">
                              <span className={cn(
                                "inline-block px-2 py-1 rounded text-xs font-bold border",
                                o.status === "pending" && "bg-amber-50 text-amber-600 border-amber-200",
                                o.status === "shipping" && "bg-blue-50 text-blue-600 border-blue-200",
                                o.status === "completed" && "bg-green-50 text-green-600 border-green-200"
                              )}>
                                {o.status === "pending" ? "접수대기" : o.status === "shipping" ? "배송중" : "배송완료"}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={async () => {
                                    try {
                                      await updateOrderStatus({ id: o._id, status: "pending" });
                                    } catch (err) {
                                      alert("상태 수정 실패: " + err);
                                    }
                                  }}
                                  className={cn(
                                    "px-2 py-1 text-[10px] font-bold rounded transition-colors border",
                                    o.status === "pending"
                                      ? "bg-amber-500 text-white border-amber-600"
                                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200"
                                  )}
                                >
                                  접수대기
                                </button>
                                <button
                                  onClick={async () => {
                                    try {
                                      await updateOrderStatus({ id: o._id, status: "shipping" });
                                    } catch (err) {
                                      alert("상태 수정 실패: " + err);
                                    }
                                  }}
                                  className={cn(
                                    "px-2 py-1 text-[10px] font-bold rounded transition-colors border",
                                    o.status === "shipping"
                                      ? "bg-blue-500 text-white border-blue-600"
                                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200"
                                  )}
                                >
                                  배송중
                                </button>
                                <button
                                  onClick={async () => {
                                    try {
                                      await updateOrderStatus({ id: o._id, status: "completed" });
                                    } catch (err) {
                                      alert("상태 수정 실패: " + err);
                                    }
                                  }}
                                  className={cn(
                                    "px-2 py-1 text-[10px] font-bold rounded transition-colors border",
                                    o.status === "completed"
                                      ? "bg-green-500 text-white border-green-600"
                                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200"
                                  )}
                                >
                                  배송완료
                                </button>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={async () => {
                                  if (confirm("이 주문을 삭제/취소하시겠습니까?")) {
                                    try {
                                      await removeOrder({ id: o._id });
                                    } catch (err) {
                                      alert("삭제 실패: " + err);
                                    }
                                  }
                                }}
                                className="px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                취소/삭제
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          )}
          {activeTab === "portalMenus" && (
          /* Portal Menus Management View */
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50/50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    <th className="p-4 w-20 text-center">순서</th>
                    <th className="p-4 w-24 text-center">아이콘</th>
                    <th className="p-4">메뉴명</th>
                    <th className="p-4">설명 / 동적 텍스트</th>
                    <th className="p-4">연결 경로 (Link)</th>
                    <th className="p-4 w-32 text-center">노출 여부</th>
                    <th className="p-4 w-32 text-center">순서 조정</th>
                    <th className="p-4 w-28 text-center">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-sm">
                  {sortedMenus.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-neutral-400 font-medium">
                        설정된 점주 메뉴가 없습니다. 자동으로 기본 데이터가 곧 추가됩니다...
                      </td>
                    </tr>
                  ) : (
                    sortedMenus.map((menu, index) => (
                      <tr key={menu._id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="p-4 text-center font-bold text-neutral-500">
                          {menu.order}
                        </td>
                        <td className="p-4 text-center">
                          <div className="inline-flex p-2 bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200">
                            <PortalIcon name={menu.iconName} size={18} />
                          </div>
                        </td>
                        <td className="p-4 font-bold text-neutral-900">
                          {menu.label}
                        </td>
                        <td className="p-4 text-neutral-600">
                          {menu.action}
                        </td>
                        <td className="p-4 text-xs font-mono text-neutral-500">
                          {menu.link}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleToggleMenuVisibility(menu)}
                            className={cn(
                              "inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold transition-all",
                              menu.isVisible
                                ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                : "bg-neutral-100 text-neutral-400 border-neutral-200 hover:bg-neutral-200"
                            )}
                          >
                            {menu.isVisible ? "노출 중" : "숨김"}
                          </button>
                        </td>
                        <td className="p-4 text-center">
                          <div className="inline-flex gap-1">
                            <button
                              disabled={index === 0}
                              onClick={() => handleMoveMenu(index, "up")}
                              className="p-1.5 rounded border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-neutral-500 transition-colors"
                              title="위로 이동"
                            >
                              ▲
                            </button>
                            <button
                              disabled={index === sortedMenus.length - 1}
                              onClick={() => handleMoveMenu(index, "down")}
                              className="p-1.5 rounded border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-neutral-500 transition-colors"
                              title="아래로 이동"
                            >
                              ▼
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => handleEditMenuClick(menu)}
                              className="text-neutral-500 hover:text-neutral-900 text-xs font-bold py-1 px-2 rounded border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleDeleteMenu(menu._id)}
                              className="text-red-500 hover:text-red-700 text-xs font-bold py-1 px-2 rounded border border-red-100 bg-red-50/50 hover:bg-red-50 transition-colors"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Add / Edit Menu Modal */}
      {isEditingMenu && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <h3 className="font-bold text-neutral-900 text-lg">
                {selectedMenuId ? "점주 메뉴 수정" : "새 점주 메뉴 추가"}
              </h3>
              <button onClick={() => setIsEditingMenu(false)} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleMenuFormSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">메뉴명 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 주문하기, 공지사항"
                  value={menuFormData.label}
                  onChange={(e) => setMenuFormData({ ...menuFormData, label: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">설명/동작 문구 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 바로 주문하기, 내역 조회"
                  value={menuFormData.action}
                  onChange={(e) => setMenuFormData({ ...menuFormData, action: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">이동 경로 (Link) *</label>
                <input
                  type="text"
                  required
                  placeholder="예: /order, https://..."
                  value={menuFormData.link}
                  onChange={(e) => setMenuFormData({ ...menuFormData, link: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">아이콘 선택</label>
                  <select
                    value={menuFormData.iconName}
                    onChange={(e) => setMenuFormData({ ...menuFormData, iconName: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  >
                    {SELECTABLE_ICONS.map((ico) => (
                      <option key={ico.name} value={ico.name}>
                        {ico.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">정렬 순서</label>
                  <input
                    type="number"
                    value={menuFormData.order}
                    onChange={(e) => setMenuFormData({ ...menuFormData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={menuFormData.isVisible}
                  onChange={(e) => setMenuFormData({ ...menuFormData, isVisible: e.target.checked })}
                  className="accent-neutral-950 w-4 h-4 rounded border-neutral-300"
                />
                <label htmlFor="isVisible" className="text-sm font-medium text-neutral-700 cursor-pointer select-none">
                  점주 포털에 메뉴 노출
                </label>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditingMenu(false)}
                  className="px-4 py-2 border border-neutral-200 text-neutral-700 text-sm font-bold rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponents
function StatsCard({ title, count, color, icon }: { title: string; count: number; color: string; icon?: React.ReactNode }) {
  return (
    <div className={cn("p-5 rounded-2xl border shadow-sm flex items-center justify-between", color)}>
      <div>
        <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">{title}</span>
        <div className="text-2xl font-black mt-1">{count}건</div>
      </div>
      {icon && <div className="p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm">{icon}</div>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let styles = "bg-amber-100 text-amber-800 border-amber-200";
  let label = "대기중";

  if (status === "contacted") {
    styles = "bg-blue-100 text-blue-800 border-blue-200";
    label = "연락완료";
  } else if (status === "completed") {
    styles = "bg-green-100 text-green-800 border-green-200";
    label = "상담완료";
  }

  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold", styles)}>
      {label}
    </span>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
      <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-bold uppercase tracking-wider">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-bold text-neutral-900 truncate">{value}</span>
    </div>
  );
}

function StatusChangeButton({
  active,
  label,
  color,
  onClick
}: {
  active: boolean;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2.5 rounded-xl border text-xs font-bold transition-all text-neutral-600 border-neutral-200 hover:bg-neutral-50",
        active ? color : ""
      )}
    >
      {label}
    </button>
  );
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${m}.${d} ${h}:${min}`;
}

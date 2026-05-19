import React, { useState, useEffect } from "react";
import {
  LogOut,
  Bell,
  Package,
  MessageSquare,
  Megaphone,
  FolderDown,
  FileText,
  ChevronRight,
  HelpCircle,
  Store,
  TrendingUp,
  Plus,
  Minus,
  ShoppingCart,
  ChevronLeft,
  Loader2,
  ImageIcon
} from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "../lib/utils";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { StoreInquiriesView, MaterialsView, NoticesView } from "./owner/StoreInquiriesAndMaterials";

function PortalIcon({ name, className, size = 24 }: { name: string; className?: string; size?: number }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <HelpCircle className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}

export default function OwnerPortal() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedStore, setLoggedStore] = useState<{
    storeId: string;
    storeName: string;
    ownerName: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "order" | "orders" | "inquiries" | "materials" | "notices">("dashboard");
  const [inquiryType, setInquiryType] = useState("1:1 문의");

  const openInquiry = (type: string) => {
    setInquiryType(type);
    setActiveTab("inquiries");
  };
  const portalMenus = useQuery(api.portalMenus.list);
  const seedPortalMenus = useMutation(api.portalMenus.seedDefault);
  const seedStores = useMutation(api.stores.seedDefault);
  const seedNotices = useMutation(api.notices.seedDefault);
  const notices = useQuery(api.notices.list);

  useEffect(() => {
    const saved = localStorage.getItem("owner_store");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLoggedStore(parsed);
        setIsLogged(true);
      } catch (e) {
        localStorage.removeItem("owner_store");
      }
    }
  }, []);

  useEffect(() => {
    seedStores();
  }, [seedStores]);

  useEffect(() => {
    if (portalMenus !== undefined && portalMenus.length === 0) {
      seedPortalMenus();
    }
  }, [portalMenus, seedPortalMenus]);

  useEffect(() => {
    if (notices !== undefined && notices.length === 0) {
      seedNotices();
    }
  }, [notices, seedNotices]);

  const handleLoginSuccess = (store: any) => {
    const storeInfo = {
      storeId: store.storeId,
      storeName: store.storeName,
      ownerName: store.ownerName,
    };
    localStorage.setItem("owner_store", JSON.stringify(storeInfo));
    setLoggedStore(storeInfo);
    setIsLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("owner_store");
    setLoggedStore(null);
    setIsLogged(false);
  };

  if (!isLogged) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-neutral-100 min-h-screen">
      <PortalHeader onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {activeTab === "dashboard" ? (
          <>
            <Greeting
              storeName={loggedStore?.storeName || "가맹점"}
              ownerName={loggedStore?.ownerName || "점주"}
              setActiveTab={setActiveTab}
            />
            <QuickMenus menus={portalMenus || []} setActiveTab={setActiveTab} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 flex flex-col gap-6">
                <OrdersAndInquiries
                  storeName={loggedStore?.storeName || "가맹점"}
                  setActiveTab={setActiveTab}
                />
                <Materials setActiveTab={setActiveTab} />
              </div>
              <div className="lg:col-span-1 flex flex-col gap-6">
                <Notices setActiveTab={setActiveTab} />
                <UpsellBanner openInquiry={openInquiry} />
                <SupportBanner openInquiry={openInquiry} />
              </div>
            </div>
          </>
        ) : activeTab === "order" ? (
          <OrderView
            storeName={loggedStore?.storeName || "가맹점"}
            onOrderSuccess={() => setActiveTab("orders")}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === "orders" ? (
          <OrdersView
            storeName={loggedStore?.storeName || "가맹점"}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === "inquiries" ? (
          <StoreInquiriesView storeName={loggedStore?.storeName || "가맹점"} setActiveTab={setActiveTab} initialType={inquiryType} />
        ) : activeTab === "materials" ? (
          <MaterialsView setActiveTab={setActiveTab} />
        ) : (
          <NoticesView setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}

function LoginScreen({ onLoginSuccess }: { onLoginSuccess: (store: any) => void }) {
  const [storeId, setStoreId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginStore = useMutation(api.stores.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const store = await loginStore({ storeId, password });
      onLoginSuccess(store);
    } catch (err: any) {
      setErrorMsg(err.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 w-full max-w-sm text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Store className="text-amber-400" size={32} />
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mb-2">점주 전용 시스템</h1>
        <p className="text-sm text-neutral-500 mb-6">발급받은 계정으로 로그인해주세요.</p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold text-left">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              required
              placeholder="아이디"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
            />
            <input
              type="password"
              required
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800 transition-colors mt-2 disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  로그인 중...
                </>
              ) : (
                "로그인"
              )}
            </button>
          </div>
        </form>
        <p className="text-xs text-neutral-400 mt-6">계정 발급 문의: 1588-0000</p>
      </div>
    </div>
  );
}

function PortalHeader({
  onLogout,
  activeTab,
  setActiveTab,
}: {
  onLogout: () => void;
  activeTab: "dashboard" | "order" | "orders" | "inquiries" | "materials" | "notices";
  setActiveTab: (t: any) => void;
}) {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-neutral-900 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            점주 전용 포털
          </span>
          <nav className="hidden md:flex gap-4">
            {[
              { id: "dashboard", label: "대시보드" },
              { id: "notices", label: "공지사항" },
              { id: "order", label: "주문하기" },
              { id: "orders", label: "주문내역" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "text-sm font-bold transition-colors",
                  activeTab === item.id ? "text-amber-500" : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab("order")}
            className="hidden sm:inline-flex px-3 py-1.5 bg-amber-400 text-neutral-900 text-sm font-bold rounded hover:bg-amber-500 transition-colors"
          >
            주문하기
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className="hidden sm:inline-flex px-3 py-1.5 bg-neutral-100 text-neutral-900 text-sm font-bold rounded hover:bg-neutral-200 transition-colors"
          >
            주문내역
          </button>
          <button onClick={onLogout} className="text-neutral-400 hover:text-neutral-600">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Greeting({
  storeName,
  ownerName,
  setActiveTab,
}: {
  storeName: string;
  ownerName: string;
  setActiveTab: (t: any) => void;
}) {
  const orders = useQuery(api.orders.list) || [];
  const myOrders = orders.filter((o) => o.storeName === storeName);
  const shippingCount = myOrders.filter((o) => o.status === "shipping").length;

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-1">안녕하세요, {storeName} ({ownerName} 점주님)</h2>
        <p className="text-sm text-neutral-500">오늘 필요한 운영 정보를 한 번에 확인하세요</p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
        <StatusBadge icon={<Bell size={14} />} text="신규 공지 1건" color="bg-red-50 text-red-600 border-red-200" />
        <div onClick={() => setActiveTab("orders")} className="cursor-pointer">
          <StatusBadge
            icon={<Package size={14} />}
            text={`배송중 ${shippingCount}건`}
            color="bg-blue-50 text-blue-600 border-blue-200"
          />
        </div>
        <StatusBadge icon={<MessageSquare size={14} />} text="답변 완료 1건" color="bg-green-50 text-green-600 border-green-200" />
      </div>
    </div>
  );
}

function StatusBadge({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return (
    <div className={cn("shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5", color)}>
      {icon}
      {text}
    </div>
  );
}

function QuickMenus({ menus, setActiveTab }: { menus: any[]; setActiveTab: (t: any) => void }) {
  const visibleMenus = menus.filter((m) => m.isVisible).sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {visibleMenus.map((m) => (
        <button
          key={m._id}
          onClick={() => {
            if (m.link === "/order") {
              setActiveTab("order");
            } else if (m.link === "/orders") {
              setActiveTab("orders");
            } else if (m.link === "/inquiries") {
              setActiveTab("inquiries");
            } else if (m.link === "/suggestions") {
              setActiveTab("inquiries");
            } else if (m.link === "/education" || m.link === "/promotions") {
              setActiveTab("materials");
            } else if (m.link === "/notices" || m.link === "/notice") {
              setActiveTab("notices");
            } else if (m.link) {
              if (m.link.startsWith("http")) {
                window.open(m.link, "_blank");
              } else if (m.link.startsWith("/")) {
                window.location.hash = m.link;
              }
            }
          }}
          className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 border border-neutral-200 hover:border-neutral-900 transition-colors shadow-sm group w-full"
        >
          <div className="text-neutral-400 group-hover:text-neutral-900 transition-colors">
            <PortalIcon name={m.iconName} size={24} />
          </div>
          <div className="font-bold text-sm text-neutral-900">{m.label}</div>
          <div className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-1 rounded font-medium">{m.action}</div>
        </button>
      ))}
    </div>
  );
}

function OrdersAndInquiries({
  storeName,
  setActiveTab,
}: {
  storeName: string;
  setActiveTab: (t: any) => void;
}) {
  const orders = useQuery(api.orders.list) || [];
  const myOrders = orders.filter((o) => o.storeName === storeName);
  const recentOrders = myOrders.slice(0, 2);

  const storeInquiries = useQuery(api.storeInquiries.list) || [];
  const myInquiries = storeInquiries.filter(i => i.storeName === storeName).slice(0, 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <h3 className="font-bold text-neutral-900">최근 주문</h3>
          <button onClick={() => setActiveTab("orders")} className="text-xs font-medium text-neutral-500 hover:text-neutral-900">
            더보기
          </button>
        </div>
        <div className="divide-y divide-neutral-100 flex-1">
          {recentOrders.length === 0 ? (
            <div className="p-6 text-center text-xs text-neutral-400">최근 주문 내역이 없습니다.</div>
          ) : (
            recentOrders.map((o) => {
              const itemSummary =
                o.items.length > 0
                  ? `${o.items[0].name} ${o.items.length > 1 ? `외 ${o.items.length - 1}건` : ""}`
                  : "상품 없음";

              return (
                <div
                  key={o._id}
                  onClick={() => setActiveTab("orders")}
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-neutral-50 transition-colors"
                >
                  <div>
                    <div className="text-sm font-bold text-neutral-900">{itemSummary}</div>
                    <div className="text-xs text-neutral-500 mt-1">{new Date(o.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div
                    className={cn(
                      "text-xs font-bold",
                      o.status === "pending" && "text-amber-600",
                      o.status === "shipping" && "text-blue-600",
                      o.status === "completed" && "text-green-600"
                    )}
                  >
                    {o.status === "pending" ? "접수대기" : o.status === "shipping" ? "배송중" : "배송완료"}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <h3 className="font-bold text-neutral-900">최근 문의</h3>
          <button onClick={() => setActiveTab("inquiries")} className="text-xs font-medium text-neutral-500 hover:text-neutral-900">더보기</button>
        </div>
        <div className="divide-y divide-neutral-100 flex-1">
          {myInquiries.length === 0 ? (
            <div className="p-6 text-center text-xs text-neutral-400">최근 문의 내역이 없습니다.</div>
          ) : (
            myInquiries.map((o) => (
              <div key={o._id} onClick={() => setActiveTab("inquiries")} className="p-4 flex justify-between items-center cursor-pointer hover:bg-neutral-50 transition-colors">
                <div>
                  <div className="text-sm font-bold text-neutral-900 line-clamp-1">{o.title}</div>
                  <div className="text-xs text-neutral-500 mt-1">{new Date(o.createdAt).toLocaleDateString()}</div>
                </div>
                <div className={cn("text-xs font-bold shrink-0", o.status === "답변완료" ? "text-green-600" : "text-amber-600")}>{o.status}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Materials({ setActiveTab }: { setActiveTab: (t: any) => void }) {
  const materials = useQuery(api.materials.list) || [];
  const visibleMaterials = materials.filter(m => m.isVisible).slice(0, 2);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
        <h3 className="font-bold text-neutral-900">교육자료 & 홍보물</h3>
        <button onClick={() => setActiveTab("materials")} className="text-xs font-medium text-neutral-500 hover:text-neutral-900">전체보기</button>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleMaterials.length === 0 ? (
          <div className="col-span-2 text-center text-xs text-neutral-400 py-4">최근 등록된 자료가 없습니다.</div>
        ) : (
          visibleMaterials.map((m, i) => (
            <div key={i} onClick={() => m.fileUrl && window.open(m.fileUrl, "_blank")} className="flex gap-4 items-center p-3 rounded-lg border border-neutral-100 hover:border-neutral-300 transition-colors cursor-pointer group">
              <div className={cn("w-10 h-10 rounded flex items-center justify-center shrink-0 transition-colors", m.type === "교육자료" ? "bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white" : "bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white")}>
                {m.type === "교육자료" ? <FileText size={20} /> : <FolderDown size={20} />}
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-900 line-clamp-1">{m.title}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{m.type} · {m.format}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Notices({ setActiveTab }: { setActiveTab: (t: any) => void }) {
  const notices = useQuery(api.notices.list) || [];
  const visibleNotices = notices.filter(n => n.isVisible).slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
        <h3 className="font-bold text-neutral-900">최근 공지사항</h3>
        <button onClick={() => setActiveTab("notices")} className="text-xs font-medium text-neutral-500 hover:text-neutral-900">전체보기</button>
      </div>
      <div className="divide-y divide-neutral-100">
        {visibleNotices.length === 0 ? (
          <div className="p-6 text-center text-xs text-neutral-400">등록된 공지사항이 없습니다.</div>
        ) : (
          visibleNotices.map((n) => (
            <div key={n._id} onClick={() => setActiveTab("notices")} className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors flex gap-3">
              <div>
                <div className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  {n.title}
                  {Date.now() - n.createdAt < 3600000 * 24 * 3 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                  )}
                </div>
                <div className="text-xs text-neutral-500 mt-1">{new Date(n.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function UpsellBanner({ openInquiry }: { openInquiry: (t: string) => void }) {
  return (
    <div onClick={() => openInquiry("추가 메뉴")} className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl p-6 text-neutral-900 relative overflow-hidden group cursor-pointer shadow-sm">
      <div className="absolute -right-4 -bottom-4 opacity-20 transform group-hover:scale-110 transition-transform">
        <TrendingUp size={100} />
      </div>
      <div className="relative z-10">
        <span className="inline-block px-2 py-1 bg-neutral-900/10 rounded text-xs font-bold mb-3">추가 도입 추천</span>
        <h3 className="text-lg font-bold mb-2 leading-snug">
          추가 메뉴입 상담을
          <br />
          받아보세요
        </h3>
        <p className="text-sm font-medium mb-4 opacity-90">
          비주얼 강점이 큰 성장형 메뉴로
          <br />
          매장 구성을 넓혀보세요.
        </p>
        <div className="inline-flex items-center text-sm font-bold bg-neutral-900 text-white px-4 py-2 rounded">
          상담 신청하기 <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </div>
  );
}

function SupportBanner({ openInquiry }: { openInquiry: (t: string) => void }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm flex flex-col justify-center items-center text-center">
      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 mb-4">
        <HelpCircle size={24} />
      </div>
      <h3 className="font-bold text-neutral-900 mb-2">도움이 필요하신가요?</h3>
      <p className="text-sm text-neutral-500 mb-4">
        운영 중 궁금한 점이나 건의사항을
        <br />
        빠르게 남겨주세요.
      </p>
      <div className="flex gap-2 w-full">
        <button onClick={() => openInquiry("1:1 문의")} className="flex-1 py-2 bg-neutral-900 text-white text-sm font-bold rounded">1:1 문의</button>
        <button onClick={() => openInquiry("건의하기")} className="flex-1 py-2 bg-neutral-100 text-neutral-900 text-sm font-bold rounded">건의하기</button>
      </div>
    </div>
  );
}

function OrderView({
  storeName,
  onOrderSuccess,
  setActiveTab,
}: {
  storeName: string;
  onOrderSuccess: () => void;
  setActiveTab: (t: any) => void;
}) {
  const categories = useQuery(api.categories.list) || [];
  const products = useQuery(api.products.list) || [];
  const createOrder = useMutation(api.orders.create);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const savedStore = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("owner_store") || "{}") : {};
  const storeDetails = useQuery(
    api.stores.getByStoreId,
    savedStore?.storeId ? { storeId: savedStore.storeId } : "skip" as any
  );

  // Show all categories and active products registered in the head office admin
  const allowedCategories = categories;

  const activeProducts = products.filter((p) => p.isActive);

  const filteredProducts =
    selectedCategoryId === "all"
      ? activeProducts
      : activeProducts.filter((p) => p.categoryId === selectedCategoryId);

  const handleQtyChange = (productId: string, val: number) => {
    const p = products.find((prod) => prod._id === productId);
    if (!p) return;

    // limit to stock quantity
    const finalVal = Math.max(0, Math.min(p.quantity, val));

    setCart((prev) => {
      const copy = { ...prev };
      if (finalVal === 0) {
        delete copy[productId];
      } else {
        copy[productId] = finalVal;
      }
      return copy;
    });
  };

  // Cart calculations
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((prod) => prod._id === id);
      if (!p) return null;
      const price = p.salePrice - (p.discountAmount || 0);
      const numQty = qty as number;
      return {
        productId: p._id,
        name: p.name,
        quantity: numQty,
        supplyPrice: price,
        totalPrice: price * numQty,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createOrder({
        storeName,
        items: cartItems,
        totalAmount,
      });
      alert("발주가 성공적으로 접수되었습니다.");
      setCart({});
      onOrderSuccess();
    } catch (err) {
      alert("주문 중 오류가 발생했습니다: " + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="p-2 bg-white rounded-lg border border-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">본사 물품 발주하기</h2>
          <p className="text-xs text-neutral-500 mt-0.5">본사에서 등록한 디저트 제품을 발주합니다.</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategoryId("all")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border",
            selectedCategoryId === "all"
              ? "bg-neutral-900 text-white border-neutral-900"
              : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
          )}
        >
          전체 ({activeProducts.length})
        </button>
        {allowedCategories.map((cat) => {
          const count = activeProducts.filter((p) => p.categoryId === cat._id).length;
          return (
            <button
              key={cat._id}
              onClick={() => setSelectedCategoryId(cat._id)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border",
                selectedCategoryId === cat._id
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
              )}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Grid: Products vs Cart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Products Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full bg-white p-12 text-center rounded-xl border border-neutral-200 text-neutral-400">
              이 카테고리에 판매 중인 상품이 없습니다.
            </div>
          ) : (
            filteredProducts.map((p) => {
              const currentQty = cart[p._id] || 0;
              const hasDiscount = p.discountAmount && p.discountAmount > 0;
              const finalPrice = p.salePrice - (p.discountAmount || 0);

              return (
                <div
                  key={p._id}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow transition-shadow flex flex-col justify-between"
                >
                  <div className="p-4 flex gap-4">
                    {/* Image */}
                    {p.thumbnailUrl ? (
                      <img
                        src={p.thumbnailUrl}
                        alt={p.name}
                        className="w-20 h-20 rounded-lg object-cover border border-neutral-100 shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400 border border-neutral-100 shrink-0">
                        <ImageIcon size={24} />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-neutral-400 font-medium mb-0.5">{p.modelName || "-"}</div>
                      <h3 className="font-bold text-neutral-900 text-sm truncate">{p.name}</h3>
                      <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                        <span>단위: {p.unit || "박스"}</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                        <span className={cn(p.quantity === 0 ? "text-red-500 font-bold" : "text-neutral-500")}>
                          재고: {p.quantity > 0 ? `${p.quantity.toLocaleString()}개` : "품절"}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-sm font-black text-neutral-900">{finalPrice.toLocaleString()}원</span>
                        {hasDiscount && (
                          <span className="text-[10px] text-neutral-400 line-through">
                            {p.salePrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Control Panel */}
                  <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-bold">주문 수량</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQtyChange(p._id, currentQty - 1)}
                        disabled={currentQty === 0}
                        className="w-7 h-7 bg-white border border-neutral-200 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <input
                        type="number"
                        min="0"
                        max={p.quantity}
                        value={currentQty === 0 ? "" : currentQty}
                        onChange={(e) => handleQtyChange(p._id, parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="w-12 h-7 bg-white border border-neutral-200 rounded-lg text-center text-xs font-bold outline-none focus:border-neutral-950"
                      />
                      <button
                        onClick={() => handleQtyChange(p._id, currentQty + 1)}
                        disabled={p.quantity <= currentQty}
                        className="w-7 h-7 bg-white border border-neutral-200 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-xl shadow-sm p-4 space-y-4 sticky top-24">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <ShoppingCart className="text-amber-500" size={18} />
            <h3 className="font-bold text-neutral-900 text-sm">발주 장바구니</h3>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              선택된 제품이 없습니다.
              <br />
              주문할 제품 수량을 늘려주세요.
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-neutral-100 pr-1">
              {cartItems.map((item, idx) => (
                <div key={item.productId} className={cn("pt-3 flex justify-between gap-4", idx === 0 ? "pt-0" : "")}>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-neutral-900 truncate">{item.name}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      {item.supplyPrice.toLocaleString()}원 × {item.quantity}개
                    </div>
                  </div>
                  <div className="text-xs font-black text-neutral-900 shrink-0">{item.totalPrice.toLocaleString()}원</div>
                </div>
              ))}
            </div>
          )}

          <hr className="border-neutral-100" />

          {/* Pricing Details */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-neutral-500">
              <span>총 품목 수</span>
              <span className="font-bold text-neutral-900">{cartItems.length}종</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>총 발주 수량</span>
              <span className="font-bold text-neutral-900">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}개
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-neutral-100">
              <span className="font-bold text-neutral-900">최종 결제 금액</span>
              <span className="font-black text-amber-600">{totalAmount.toLocaleString()}원</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0 || isSubmitting}
            className="w-full py-3 bg-neutral-900 text-white font-bold text-sm rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                발주 접수 중...
              </>
            ) : (
              "발주 신청 완료"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersView({
  storeName,
  setActiveTab,
}: {
  storeName: string;
  setActiveTab: (t: any) => void;
}) {
  const orders = useQuery(api.orders.list) || [];
  const myOrders = orders.filter((o) => o.storeName === storeName);

  return (
    <div className="space-y-6">
      {/* Header and Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="p-2 bg-white rounded-lg border border-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">발주 신청 내역</h2>
          <p className="text-xs text-neutral-500 mt-0.5">점포에서 신청한 최근 발주 내역을 조회합니다.</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        {myOrders.length === 0 ? (
          <div className="p-12 text-center text-neutral-400">신청된 발주 내역이 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="p-4">주문일시</th>
                  <th className="p-4">가맹점</th>
                  <th className="p-4">주문 내역</th>
                  <th className="p-4 text-right">총 주문금액</th>
                  <th className="p-4 text-center">처리 상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {myOrders.map((o) => {
                  const itemSummary =
                    o.items.length > 0
                      ? `${o.items[0].name} ${o.items.length > 1 ? `외 ${o.items.length - 1}건` : ""}`
                      : "상품 없음";

                  return (
                    <tr key={o._id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 text-xs text-neutral-500 font-medium">
                        {new Date(o.createdAt).toLocaleString("ko-KR")}
                      </td>
                      <td className="p-4 font-bold text-neutral-900">{o.storeName}</td>
                      <td className="p-4 text-neutral-600">
                        <div className="font-medium text-neutral-900">{itemSummary}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">
                          {o.items.map((i) => `${i.name}(${i.quantity}개)`).join(", ")}
                        </div>
                      </td>
                      <td className="p-4 text-right font-black text-neutral-950">{o.totalAmount.toLocaleString()}원</td>
                      <td className="p-4 text-center">
                        <span
                          className={cn(
                            "inline-block px-2 py-1 rounded text-xs font-bold border",
                            o.status === "pending" && "bg-amber-50 text-amber-600 border-amber-200",
                            o.status === "shipping" && "bg-blue-50 text-blue-600 border-blue-200",
                            o.status === "completed" && "bg-green-50 text-green-600 border-green-200"
                          )}
                        >
                          {o.status === "pending" ? "접수대기" : o.status === "shipping" ? "배송중" : "배송완료"}
                        </span>
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
  );
}

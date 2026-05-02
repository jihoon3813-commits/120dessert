import React, { useState } from "react";
import { LogOut, Bell, Package, MessageSquare, Megaphone, FolderDown, FileText, ChevronRight, HelpCircle, Store, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export default function OwnerPortal() {
  const [isLogged, setIsLogged] = useState(false);

  if (!isLogged) {
    return <LoginScreen onLogin={() => setIsLogged(true)} />;
  }

  return (
    <div className="bg-neutral-100 min-h-screen">
      <PortalHeader onLogout={() => setIsLogged(false)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
         <Greeting />
         <QuickMenus />
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
               <OrdersAndInquiries />
               <Materials />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
               <Notices />
               <UpsellBanner />
               <SupportBanner />
            </div>
         </div>
      </div>
    </div>
  )
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 w-full max-w-sm text-center">
         <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Store className="text-amber-400" size={32} />
         </div>
         <h1 className="text-xl font-bold text-neutral-900 mb-2">점주 전용 시스템</h1>
         <p className="text-sm text-neutral-500 mb-8">발급받은 계정으로 로그인해주세요.</p>
         <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-4">
              <input type="text" placeholder="아이디" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm" />
              <input type="password" placeholder="비밀번호" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm" />
              <button type="submit" className="w-full py-3 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800 transition-colors mt-2">
                 로그인
              </button>
            </div>
         </form>
         <p className="text-xs text-neutral-400 mt-6">계정 발급 문의: 1588-0000</p>
      </div>
    </div>
  )
}

function PortalHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-16 z-40">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <span className="font-bold text-neutral-900">점주 전용 포털</span>
             <nav className="hidden md:flex gap-4">
                {["대시보드", "주문하기", "문의하기", "자료실", "추가도입상담"].map(item => (
                  <button key={item} className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                    {item}
                  </button>
                ))}
             </nav>
          </div>
          <div className="flex items-center gap-4">
             <button className="hidden sm:inline-flex px-3 py-1.5 bg-amber-400 text-neutral-900 text-sm font-bold rounded hover:bg-amber-500 transition-colors">주문하기</button>
             <button className="hidden sm:inline-flex px-3 py-1.5 bg-neutral-100 text-neutral-900 text-sm font-bold rounded hover:bg-neutral-200 transition-colors">1:1 문의</button>
             <button onClick={onLogout} className="text-neutral-400 hover:text-neutral-600">
               <LogOut size={18} />
             </button>
          </div>
       </div>
    </header>
  )
}

function Greeting() {
  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
       <div>
         <h2 className="text-xl font-bold text-neutral-900 mb-1">안녕하세요, 강남역점 점주님</h2>
         <p className="text-sm text-neutral-500">오늘 필요한 운영 정보를 한 번에 확인하세요</p>
       </div>
       <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <StatusBadge icon={<Bell size={14}/>} text="신규 공지 1건" color="bg-red-50 text-red-600 border-red-200" />
          <StatusBadge icon={<Package size={14}/>} text="주문 배송중" color="bg-blue-50 text-blue-600 border-blue-200" />
          <StatusBadge icon={<MessageSquare size={14}/>} text="답변 완료 1건" color="bg-green-50 text-green-600 border-green-200" />
       </div>
    </div>
  )
}

function StatusBadge({ icon, text, color }: { icon: React.ReactNode, text: string, color: string }) {
  return (
    <div className={cn("shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5", color)}>
       {icon}
       {text}
    </div>
  )
}

function QuickMenus() {
  const menus = [
    { icon: <Package/>, label: "주문하기", action: "바로 주문하기" },
    { icon: <Package/>, label: "주문내역", action: "내역 조회" },
    { icon: <MessageSquare/>, label: "1:1 문의", action: "문의 남기기" },
    { icon: <Megaphone/>, label: "건의하기", action: "의견 접수" },
    { icon: <FileText/>, label: "교육자료", action: "자료 보기" },
    { icon: <FolderDown/>, label: "홍보물", action: "다운로드" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {menus.map((m, i) => (
        <button key={i} className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 border border-neutral-200 hover:border-neutral-900 transition-colors shadow-sm group">
           <div className="text-neutral-400 group-hover:text-neutral-900 transition-colors">{m.icon}</div>
           <div className="font-bold text-sm text-neutral-900">{m.label}</div>
           <div className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-1 rounded font-medium">{m.action}</div>
        </button>
      ))}
    </div>
  )
}

function OrdersAndInquiries() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
             <h3 className="font-bold text-neutral-900">최근 주문</h3>
             <button className="text-xs font-medium text-neutral-500 hover:text-neutral-900">더보기</button>
          </div>
          <div className="divide-y divide-neutral-100 flex-1">
             {[
               { id: "ORD-12345", date: "2023.10.25", status: "배송중", color: "text-blue-600" },
               { id: "ORD-12344", date: "2023.10.18", status: "배송완료", color: "text-green-600" },
             ].map((o, i) => (
               <div key={i} className="p-4 flex justify-between items-center">
                 <div>
                    <div className="text-sm font-bold text-neutral-900">{o.id}</div>
                    <div className="text-xs text-neutral-500 mt-1">{o.date}</div>
                 </div>
                 <div className={cn("text-xs font-bold", o.color)}>{o.status}</div>
               </div>
             ))}
          </div>
       </div>

       <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
             <h3 className="font-bold text-neutral-900">최근 문의</h3>
             <button className="text-xs font-medium text-neutral-500 hover:text-neutral-900">더보기</button>
          </div>
          <div className="divide-y divide-neutral-100 flex-1">
             {[
               { title: "파이 생지 보관방법 문의", date: "2023.10.24", status: "답변완료", color: "text-green-600" },
               { title: "추가 발주 일정 안내 요청", date: "2023.10.26", status: "접수됨", color: "text-amber-600" },
             ].map((o, i) => (
               <div key={i} className="p-4 flex justify-between items-center">
                 <div>
                    <div className="text-sm font-bold text-neutral-900">{o.title}</div>
                    <div className="text-xs text-neutral-500 mt-1">{o.date}</div>
                 </div>
                 <div className={cn("text-xs font-bold", o.color)}>{o.status}</div>
               </div>
             ))}
          </div>
       </div>
    </div>
  )
}

function Materials() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <h3 className="font-bold text-neutral-900">교육자료 & 홍보물</h3>
          <button className="text-xs font-medium text-neutral-500 hover:text-neutral-900">전체보기</button>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="flex gap-4 items-center p-3 rounded-lg border border-neutral-100 hover:border-neutral-300 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <FileText size={20} />
            </div>
            <div>
               <div className="text-sm font-bold text-neutral-900">120겹파이 운영 매뉴얼 V2.1</div>
               <div className="text-xs text-neutral-500 mt-0.5">교육자료 · PDF</div>
            </div>
         </div>
         <div className="flex gap-4 items-center p-3 rounded-lg border border-neutral-100 hover:border-neutral-300 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <FolderDown size={20} />
            </div>
            <div>
               <div className="text-sm font-bold text-neutral-900">할로윈 시즌 데블스파이 POP</div>
               <div className="text-xs text-neutral-500 mt-0.5">홍보물 · JPG / AI</div>
            </div>
         </div>
      </div>
    </div>
  )
}

function Notices() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <h3 className="font-bold text-neutral-900">최근 공지사항</h3>
          <button className="text-xs font-medium text-neutral-500 hover:text-neutral-900">전체보기</button>
      </div>
      <div className="divide-y divide-neutral-100">
         {[
           { title: "동절기 배송 일정 단축 안내", date: "2023.10.27", isNew: true },
           { title: "에그120 신규 홍보물 업로드 안내", date: "2023.10.20", isNew: false },
           { title: "10월 시스템 점검 안내 (완료)", date: "2023.10.15", isNew: false },
         ].map((n, i) => (
            <div key={i} className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors flex gap-3">
               <div>
                 <div className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                   {n.title}
                   {n.isNew && <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>}
                 </div>
                 <div className="text-xs text-neutral-500 mt-1">{n.date}</div>
               </div>
            </div>
         ))}
      </div>
    </div>
  )
}

function UpsellBanner() {
  return (
    <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl p-6 text-neutral-900 relative overflow-hidden group cursor-pointer shadow-sm">
       <div className="absolute -right-4 -bottom-4 opacity-20 transform group-hover:scale-110 transition-transform">
         <TrendingUp size={100} />
       </div>
       <div className="relative z-10">
         <span className="inline-block px-2 py-1 bg-neutral-900/10 rounded text-xs font-bold mb-3">추가 도입 추천</span>
         <h3 className="text-lg font-bold mb-2 leading-snug">에그120 추가 도입 상담을<br/>받아보세요</h3>
         <p className="text-sm font-medium mb-4 opacity-90">비주얼 강점이 큰 성장형 메뉴로<br/>매장 구성을 넓혀보세요.</p>
         <div className="inline-flex items-center text-sm font-bold bg-neutral-900 text-white px-4 py-2 rounded">
            상담 신청하기 <ChevronRight size={16} className="ml-1" />
         </div>
       </div>
    </div>
  )
}

function SupportBanner() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm flex flex-col justify-center items-center text-center">
       <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 mb-4">
         <HelpCircle size={24} />
       </div>
       <h3 className="font-bold text-neutral-900 mb-2">도움이 필요하신가요?</h3>
       <p className="text-sm text-neutral-500 mb-4">운영 중 궁금한 점이나 건의사항을<br/>빠르게 남겨주세요.</p>
       <div className="flex gap-2 w-full">
         <button className="flex-1 py-2 bg-neutral-900 text-white text-sm font-bold rounded">1:1 문의</button>
         <button className="flex-1 py-2 bg-neutral-100 text-neutral-900 text-sm font-bold rounded">긴급 연락</button>
       </div>
    </div>
  )
}

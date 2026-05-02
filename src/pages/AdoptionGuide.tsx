import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, Monitor, Package, HeadphonesIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function AdoptionGuide() {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeroSection />
      <WhyAdoptionSection />
      <StoreTypeSection />
      <AdoptionStepsSection />
      <MenuRecommendationSection />
      <SupportStructureSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-neutral-900 py-24 md:py-32 text-center px-4 sm:px-6 lg:px-8">
      <span className="text-amber-400 font-bold tracking-widest text-sm mb-4 block uppercase">도입안내</span>
      <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
        우리 매장에 맞는 방식으로<br/>120디저트를 시작할 수 있습니다
      </h1>
      <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
        샵인샵부터 공동간판, 단독 전환까지.<br className="hidden md:block" />
        처음부터 크게 바꾸지 않아도 되는 단계형 도입 모델
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
         <Link to="/inquiry" className="px-8 py-4 bg-amber-400 text-neutral-900 font-bold rounded hover:bg-amber-500 shadow-xl shadow-amber-400/20">가맹문의 하기</Link>
         <Link to="/inquiry" className="px-8 py-4 bg-white/10 text-white font-bold rounded backdrop-blur-sm border border-white/20 hover:bg-white/20">공동간판 상담받기</Link>
      </div>
    </section>
  )
}

function WhyAdoptionSection() {
  const cards = [
    { title: "차별화된 대표 메뉴", desc: "120겹파이를 중심으로 한 독립적인 메뉴 경쟁력 확보" },
    { title: "즉석조리형 퍼포먼스", desc: "보는 재미와 먹는 만족이 함께 있는 메뉴 구조" },
    { title: "작은 공간 도입 가능", desc: "기존 매장 안에서도 부담 없이 시작 가능한 구조" },
    { title: "브랜드 확장 가능성", desc: "단순 메뉴 도입에서 간판 전환까지 단계적 성장 가능" }
  ];
  return (
    <section className="py-24 bg-neutral-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">왜 120디저트 도입인가</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {cards.map((card, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm transition-all hover:shadow-md hover:border-amber-300">
                 <div className="text-base font-bold text-neutral-900 mb-3">{card.title}</div>
                 <div className="text-sm text-neutral-600 leading-relaxed">{card.desc}</div>
              </div>
            ))}
         </div>
         <div className="text-center">
            <a href="#models" className="inline-flex px-6 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800">도입 모델 보기</a>
         </div>
      </div>
    </section>
  )
}

function StoreTypeSection() {
  const types = [
    "카페형 매장", "분식/휴게형 매장", "배달형 매장", "간식 메뉴 강화가 필요한 매장", "브랜드 노출을 강화하고 싶은 매장"
  ];
  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
         <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-8">적용 가능 매장 유형</h2>
         <div className="flex flex-wrap justify-center gap-3 mb-10">
            {types.map((type, i) => (
               <span key={i} className="px-5 py-3 bg-neutral-100 font-medium text-neutral-800 rounded-lg whitespace-nowrap">
                  {type}
               </span>
            ))}
         </div>
         <p className="text-neutral-500 font-medium mb-8">매장 유형에 따라 추천 메뉴와 도입 방식이 달라집니다.</p>
         <Link to="/inquiry" className="inline-flex px-8 py-3 bg-amber-400 text-neutral-900 font-bold border border-amber-500 rounded hover:bg-amber-500">내 매장에 맞는 상담받기</Link>
      </div>
    </section>
  )
}

function AdoptionStepsSection() {
  const steps = [
    { name: "메뉴 도입형 샵인샵", desc: "기존 매장 안에 120디저트 메뉴를 추가 도입하는 가장 가벼운 방식", detail: "핵심 제품 1~2종만으로 추가 매출 창출" },
    { name: "브랜드 표기형", desc: "메뉴판, POP, 내부 홍보물을 통해 120디저트 브랜드를 함께 알리는 방식", detail: "브랜드 신뢰도 공유" },
    { name: "공동간판형", desc: "기존 매장명은 유지하면서 'OO카페 & 120디저트'처럼 함께 노출하는 방식", detail: "외부 시인성 극대화 및 시너지", highlight: true },
    { name: "단독 전환형", desc: "운영 성과와 브랜드 반응이 충분히 검증된 이후 단독 브랜드로 전환하는 방식", detail: "전문 디저트 매장으로 리브랜딩" }
  ];

  return (
    <section id="models" className="py-24 bg-neutral-900 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">도입 모델 4단계</h2>
            <p className="text-neutral-400 text-lg">가장 가벼운 샵인샵부터 브랜드 단독 전환까지</p>
         </div>

         <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
               <div key={i} className={cn("p-8 rounded-2xl border transition-all md:flex items-center gap-8", 
                  step.highlight ? "bg-amber-400 border-amber-500 text-neutral-900 shadow-[0_0_40px_rgba(251,191,36,0.15)] transform md:scale-[1.02]" : "bg-neutral-800 border-neutral-700")}>
                  <div className="shrink-0 mb-4 md:mb-0">
                     <span className={cn("inline-block px-3 py-1 rounded font-bold text-sm", step.highlight ? "bg-neutral-900 text-amber-400" : "bg-neutral-700 text-white")}>
                       {i + 1}단계
                     </span>
                  </div>
                  <div className="flex-1">
                     <h3 className={cn("text-xl font-bold mb-2", step.highlight ? "text-neutral-900" : "text-white")}>{step.name}</h3>
                     <p className={cn("text-sm sm:text-base leading-relaxed mb-3", step.highlight ? "text-neutral-800 font-medium" : "text-neutral-400")}>{step.desc}</p>
                     <p className={cn("text-sm flex items-center font-bold", step.highlight ? "text-neutral-900" : "text-neutral-300")}>
                       <CheckCircle2 size={16} className={cn("mr-2", step.highlight ? "text-neutral-900" : "text-amber-400")} /> {step.detail}
                     </p>
                  </div>
               </div>
            ))}
         </div>

         <div className="max-w-4xl mx-auto mt-8 text-center text-amber-400 font-bold border border-amber-400/30 bg-amber-400/5 py-4 rounded-xl">
           ✓ 공동간판형은 120디저트의 핵심 성장 전략입니다.
         </div>

         <div className="mt-12 text-center flex justify-center gap-4 flex-wrap">
            <Link to="/inquiry" className="px-8 py-3 bg-amber-400 text-neutral-900 font-bold rounded hover:bg-amber-500">공동간판 상담받기</Link>
            <Link to="/inquiry" className="px-8 py-3 bg-neutral-800 text-white font-medium border border-neutral-700 rounded hover:bg-neutral-700">가맹문의 하기</Link>
         </div>
      </div>
    </section>
  )
}

function MenuRecommendationSection() {
  const menus = [
    { title: "120겹파이", role: "대표 메뉴 / 첫 도입 추천 / 브랜드 얼굴", desc: "가장 기본이 되는 핵심 상품으로 디저트 경쟁력을 즉각적으로 높여줍니다." },
    { title: "에그120", role: "성장형 메뉴 / 비주얼 강점 / 추가도입 추천", desc: "독특한 계란빵 비주얼로 인증 자발성을 높이고 매출을 견인합니다." },
    { title: "츄러스/핫도그/떡볶이", role: "보완형 메뉴 / 복합운영 / 시간대 보완", desc: "식사 대용이나 남녀노소 누구나 즐기는 스낵 라인업으로 객단가를 높입니다." }
  ];
  return (
     <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">메뉴별 추천 도입 방식</h2>
           </div>
           <div className="space-y-6">
              {menus.map((menu, i) => (
                 <div key={i} className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-neutral-50 rounded-2xl border border-neutral-200 items-start">
                    <h3 className="w-48 shrink-0 text-xl font-bold text-neutral-900 m-0">{menu.title}</h3>
                    <div>
                       <div className="text-amber-600 font-bold text-sm mb-2">{menu.role}</div>
                       <p className="text-neutral-600">{menu.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
           <div className="mt-12 text-center">
              <Link to="/#menu" className="inline-flex items-center text-neutral-900 font-bold border-b border-neutral-900 pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors">
                메뉴 상세 보기 <ArrowRight size={16} className="ml-2" />
              </Link>
           </div>
        </div>
     </section>
  )
}

function SupportStructureSection() {
  const supports = [
     { icon: <Package size={24} />, name: "주문 시스템", desc: "식자재 및 부자재 원클릭 간편 주문" },
     { icon: <HeadphonesIcon size={24} />, name: "1:1 문의", desc: "현장 이슈 발생 시 본사 빠른 소통" },
     { icon: <Monitor size={24} />, name: "운영 자료실", desc: "온라인 매뉴얼, 공지, 홍보물 다운로드" },
  ];
  return (
    <section className="py-24 bg-neutral-50 px-4 sm:px-6 lg:px-8">
       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
               도입만 쉬운 것이 아니라,<br/>운영도 쉽게 설계해야 합니다
             </h2>
             <p className="text-lg text-neutral-600 mb-10">
               120디저트는 점주님들이 메뉴 조리와 손님 응대에만 집중하실 수 있도록 온라인 점주 전용 포털을 통해 전 방위적인 운영을 지원합니다.
             </p>
             <div className="space-y-6">
                {supports.map((s, i) => (
                  <div key={i} className="flex items-start gap-4">
                     <div className="bg-white p-3 rounded-lg shadow-sm text-neutral-900 shrink-0">{s.icon}</div>
                     <div>
                        <h4 className="font-bold text-neutral-900 mb-1">{s.name}</h4>
                        <p className="text-sm text-neutral-600">{s.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
             <div className="mt-10">
                <Link to="/portal" className="px-6 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800">점주포털 보기</Link>
             </div>
          </div>
          <div className="w-full lg:w-1/2">
             <div className="bg-neutral-200 rounded-2xl aspect-[4/3] flex items-center justify-center border border-neutral-300 p-8 relative overflow-hidden">
                {/* Abstract visualization of a portal dashboard */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200 to-neutral-100"></div>
                <div className="w-full h-full bg-white rounded-xl shadow-2xl border border-neutral-200 relative z-10 flex flex-col overflow-hidden">
                   <div className="h-12 border-b border-neutral-100 flex items-center px-4 bg-neutral-50 gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex-1 p-6 flex flex-col gap-4">
                      <div className="w-1/3 h-6 bg-neutral-200 rounded animate-pulse"></div>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="h-20 bg-amber-50 rounded-lg border border-amber-100"></div>
                         <div className="h-20 bg-blue-50 rounded-lg border border-blue-100"></div>
                         <div className="h-20 bg-green-50 rounded-lg border border-green-100"></div>
                      </div>
                      <div className="w-full flex-1 bg-neutral-50 rounded-lg border border-neutral-100 mt-4"></div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    { q: "기존 카페에도 도입 가능한가요?", a: "네, 기존 카페의 한 켠, 혹은 주방의 작은 공간만 있어도 샵인샵 도입이 가능합니다." },
    { q: "120겹파이만 먼저 시작할 수 있나요?", a: "기본이자 핵심 모델인 120겹파이만 단독 도입하여 검증 후 확장하실 수 있습니다." },
    { q: "공동간판은 필수인가요?", a: "필수는 아니지만 가장 추천드리는 도입 형태입니다." },
    { q: "조리는 어려운 편인가요?", a: "초보자도 1시간 교육 후 바로 판매 가능한 수준으로 본사에서 시스템화했습니다." },
    { q: "기존 매장명과 함께 사용할 수 있나요?", a: "배달 앱이나 외부 간판 등에 병기하여 운영 가능합니다." },
    { q: "단독 전환은 어떤 경우 가능한가요?", a: "120디저트의 경쟁력이 기존 브랜드보다 확고하다고 점주님 스스로 판단하셨을 때, 리모델링 및 간판 교체를 통한 단독 전환을 돕습니다." },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center tracking-tight text-neutral-900 mb-12">자주 묻는 질문</h2>
        <div className="space-y-4">
           {faqs.map((faq, i) => (
             <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden transition-all duration-200">
               <button 
                 onClick={() => setOpenIdx(openIdx === i ? null : i)}
                 className="w-full px-6 py-5 text-left font-bold text-neutral-900 flex justify-between items-center hover:bg-neutral-100"
               >
                 {faq.q}
                 <ChevronDown size={20} className={cn("text-neutral-400 transition-transform duration-200", openIdx === i ? "rotate-180" : "")} />
               </button>
               <div className={cn("px-6 overflow-hidden transition-all duration-200 text-neutral-600 bg-white", openIdx === i ? "max-h-48 py-5 border-t border-neutral-100" : "max-h-0")}>
                 {faq.a}
               </div>
             </div>
           ))}
        </div>
        <div className="mt-12 text-center">
           <Link to="/inquiry" className="inline-flex px-8 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800">바로 가맹문의 하기</Link>
        </div>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="py-24 bg-amber-400 text-neutral-900 text-center px-4 sm:px-6 lg:px-8">
       <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">처음부터 큰 결정을 하지 않아도 됩니다.</h2>
       <p className="text-lg md:text-xl font-medium mb-10 opacity-90">우리 매장에 맞는 방식부터 상담받아보세요</p>
       <div className="flex flex-wrap justify-center gap-4">
         <Link to="/inquiry" className="px-8 py-4 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800 shadow-xl shadow-neutral-900/10">도입 문의하기</Link>
         <Link to="/inquiry" className="px-8 py-4 bg-white text-neutral-900 font-bold rounded-lg hover:bg-neutral-50 shadow-xl shadow-amber-500/10 border border-white/50">공동간판 상담받기</Link>
         <a href="tel:1588-0000" className="px-8 py-4 bg-transparent text-neutral-900 font-bold rounded-lg hover:bg-amber-500 transition-colors border border-neutral-900">전화 상담하기</a>
       </div>
    </section>
  )
}

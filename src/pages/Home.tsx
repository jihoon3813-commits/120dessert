import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp, Store, Zap, ChevronDown, Package, LayoutTemplate, Box, ArrowUpRight, X, MapPin, HelpCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { motion, useInView, AnimatePresence } from "motion/react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white text-neutral-900">
      <HeroSection />
      <WhySection />
      <PositioningSection />
      <MenuSection />
      <AdoptionSection />
      <SuperSuccessCaseSection />
      <StoresPreviewSection />
      <OwnerSystemSection />
      <GallerySection />
      <TrustSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 1500;
      const step = Math.ceil(value / 30) || 1;
      const stepTime = Math.abs(Math.floor(duration / (value / step)));
      
      const timer = setInterval(() => {
        start += step;
        if (start > value) start = value;
        setCount(start);
        if (start === value) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function HeroSection() {
  return (
    <section className="relative bg-black overflow-hidden py-24 lg:py-32 border-b border-neutral-900">
      <div className="absolute inset-0 bg-neutral-950/60 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=2070&auto=format&fit=crop" 
        alt="Delicious pastries" 
        className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center text-center mt-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="inline-flex items-center rounded-full border border-amber-400 bg-amber-400/10 px-4 py-1.5 text-sm font-bold text-amber-400 mb-8 backdrop-blur-sm">
            <Store size={16} className="mr-2" /> 샵인샵부터 리브랜딩까지 · 맞춤형 도입
          </div>
        </motion.div>
        
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight text-white">
          갓 구워 더 폭발적인,<br/>
          <span className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">120디저트</span>
        </motion.h1>
        
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl font-medium leading-relaxed">
          120겹파이, 에그120, 츄러스, 핫도그, 떡볶이까지.<br className="hidden md:block" />
          우리 매장에 가장 강력한 무기를 추가할 시간입니다.
        </motion.p>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center items-center gap-4">
          <Link to="/inquiry" className="px-8 py-4 bg-amber-400 text-neutral-950 font-black rounded hover:bg-amber-300 transition-colors flex items-center shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            도입 방식 상담받기 <ArrowRight size={18} className="ml-2" />
          </Link>
          <Link to="/brand" className="px-8 py-4 bg-neutral-900 border border-neutral-700 text-white font-bold rounded hover:bg-neutral-800 transition-colors">
            브랜드철학 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function WhySection() {
  const cards = [
    { title: "압도적 메뉴", desc: "120겹파이 시그니처", icon: <Store /> },
    { title: "즉석 퍼포먼스", desc: "갓 구워내는 시각적 재미", icon: <Zap /> },
    { title: "작은 공간", desc: "기존 매장 내 샵인샵", icon: <LayoutTemplate /> },
    { title: "폭발적 확장", desc: "단계별 브랜드 리뉴얼", icon: <TrendingUp /> },
    { title: "쉬운 운영", desc: "반제품 시스템의 편의성", icon: <Box /> },
  ];

  return (
    <section className="py-24 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">왜 120디저트인가</h2>
          <p className="text-lg text-amber-500 font-bold">새로운 창업을 할 필요 없습니다. 기존 매장에 무기를 다세요.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-amber-400 hover:-translate-y-1 transition-all group shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(251,191,36,0.15)]">
              <div className="w-14 h-14 bg-neutral-50 border border-neutral-200 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-neutral-900 rounded-xl flex items-center justify-center mb-6 text-amber-500 transition-colors">
                {React.cloneElement(card.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="font-black text-xl text-neutral-900 mb-2">{card.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-medium">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PositioningSection() {
  const badges = ["즉석성", "대중성", "차별성", "확장성", "운영편의성"];
  return (
    <section className="py-24 bg-amber-400 text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-tight drop-shadow-sm">
          단순한 디저트가 아닙니다.<br/>
          즉석조리형 마스터브랜드입니다.
        </h2>
        <p className="text-lg md:text-xl font-bold mb-10 opacity-80">
          가장 익숙한 간식을 가장 특별하게.<br/>
          메뉴 납품을 넘어 파트너의 브랜드 확장을 돕습니다.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {badges.map(b => (
            <span key={b} className="px-5 py-2.5 bg-neutral-900 text-amber-400 text-sm font-black rounded-full shadow-md">
              #{b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuModal({ menuId, onClose }: { menuId: string | null, onClose: () => void }) {
  if (!menuId) return null;

  const details: Record<string, { title: string, desc: string, items: {name: string, desc: string, img: string}[] }> = {
    "120겹파이": {
       title: "120겹파이 상세",
       desc: "60겹 + 60겹 사이 꽉 찬 속재료, 120디저트의 간판 아이템",
       items: [
         { name: "수제 고기파이", desc: "육즙 폭발 든든한 파이", img: "https://images.unsplash.com/photo-1601000676057-dd23e800c149?q=80&w=600&auto=format&fit=crop" },
         { name: "달콤 애플파이", desc: "시나몬과 사과 과육의 조화", img: "https://images.unsplash.com/photo-1621236378699-8597faf6a176?q=80&w=600&auto=format&fit=crop" },
         { name: "크림치즈파이", desc: "꾸덕한 크림치즈의 매력", img: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=600&auto=format&fit=crop" }
       ]
    },
    "에그120": {
       title: "에그120 상세",
       desc: "계란 하나가 통째로! 비주얼 끝판왕 추가 라인업",
       items: [
         { name: "오리지널 에그", desc: "계란 본연의 고소함", img: "https://images.unsplash.com/photo-1525351484163-f529e419b48c?q=80&w=600&auto=format&fit=crop" },
         { name: "베이컨치즈 에그", desc: "단짠단짠 베이컨 치즈", img: "https://images.unsplash.com/photo-1606850246029-dd00e5d4cbce?q=80&w=600&auto=format&fit=crop" },
       ]
    },
    "기타": {
       title: "스낵 라인업 상세",
       desc: "츄러스, 핫도그, 떡볶이 등 매장 객단가를 높여줄 추가 스낵",
       items: [
         { name: "오리지널 츄러스", desc: "계피향 가득 바삭한 츄러스", img: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?q=80&w=600&auto=format&fit=crop" },
         { name: "크리스피 핫도그", desc: "바삭한 튀김옷과 육즙 소시지", img: "https://images.unsplash.com/photo-1596796336368-80983da39601?q=80&w=600&auto=format&fit=crop" },
         { name: "국물 떡볶이", desc: "120파이를 찍어먹는 매콤함", img: "https://images.unsplash.com/photo-1588147814407-160bf60ad15c?q=80&w=600&auto=format&fit=crop" }
       ]
    }
  };

  const data = details[menuId];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
         <motion.div 
           initial={{ scale: 0.95, opacity: 0, y: 20 }} 
           animate={{ scale: 1, opacity: 1, y: 0 }} 
           onClick={e => e.stopPropagation()}
           className="bg-white border border-neutral-200 rounded-2xl w-full max-w-4xl overflow-hidden relative shadow-2xl"
         >
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 bg-neutral-100 rounded-full p-2 z-10"><X size={20}/></button>
            <div className="p-8 border-b border-neutral-100 text-center">
               <h3 className="text-2xl font-black text-amber-500 mb-2">{data.title}</h3>
               <p className="text-neutral-500 font-bold">{data.desc}</p>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-50">
               {data.items.map((item, i) => (
                 <div key={i} className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
                    <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-5 text-center">
                       <h4 className="font-bold text-neutral-900 mb-2">{item.name}</h4>
                       <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
            <div className="p-6 bg-white text-center border-t border-neutral-100">
               <Link to="/inquiry" className="inline-block px-8 py-3 bg-amber-400 font-bold text-neutral-900 rounded hover:bg-amber-500 transition-colors shadow-sm">도입 단가 문의하기</Link>
            </div>
         </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MenuSection() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  return (
    <section id="menu" className="py-24 bg-neutral-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">압도적 대표 아이템</h2>
          <p className="text-lg text-amber-500 font-bold">확실한 경쟁력을 갖춘 메뉴 라인업을 클릭해 확인하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Hero Card */}
          <div onClick={() => setSelectedMenu("120겹파이")} className="md:col-span-8 bg-white rounded-2xl overflow-hidden border border-neutral-200 group shadow-md hover:shadow-xl hover:border-amber-400 transition-all cursor-pointer">
            <div className="h-64 sm:h-80 overflow-hidden relative bg-neutral-100">
              <img src="https://images.unsplash.com/photo-1601000676057-dd23e800c149?q=80&w=2070&auto=format&fit=crop" alt="120겹파이" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-all duration-700" />
              <div className="absolute top-4 left-4 bg-amber-400 text-neutral-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Hero Product</div>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-black mb-3 text-neutral-900">120겹파이 <span className="text-sm font-bold text-amber-500 ml-2">메뉴 보기 &rarr;</span></h3>
              <p className="text-neutral-500 mb-6 text-lg font-medium">60겹 페스츄리 생지 두 장 사이에 속재료를 넣고 전용 기계에서 구워내는 압도적 시그니처</p>
            </div>
          </div>

          {/* Medium Card */}
          <div onClick={() => setSelectedMenu("에그120")} className="md:col-span-4 bg-white rounded-2xl overflow-hidden border border-neutral-200 group shadow-md hover:shadow-xl hover:border-amber-400 transition-all cursor-pointer">
            <div className="h-48 sm:h-64 overflow-hidden relative bg-neutral-100">
              <img src="https://images.unsplash.com/photo-1525351484163-f529e419b48c?q=80&w=2070&auto=format&fit=crop" alt="에그120" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-all duration-700" />
              <div className="absolute top-4 left-4 bg-neutral-900 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Growth Menu</div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-black mb-2 text-neutral-900">에그120 <span className="text-sm font-bold text-amber-500 ml-2">메뉴 보기 &rarr;</span></h3>
              <p className="text-neutral-500 text-sm font-medium">실제 계란을 톡 깨서 굽는 비주얼 최강 아이템</p>
            </div>
          </div>

          {/* Small Card Aggregation */}
          <div onClick={() => setSelectedMenu("기타")} className="md:col-span-12 bg-white rounded-xl overflow-hidden border border-neutral-200 flex flex-col md:flex-row items-center gap-6 group hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer p-6 relative shadow-md">
             <div className="absolute top-4 right-4 bg-neutral-100 text-neutral-500 text-xs font-black px-4 py-1 rounded-full uppercase">Snacks</div>
             <div className="flex gap-4">
                <img src="https://images.unsplash.com/photo-1624371414361-e670edf4898d?q=80&w=200&h=200&auto=format&fit=crop" className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-all shadow-sm" />
                <img src="https://images.unsplash.com/photo-1596796336368-80983da39601?q=80&w=200&h=200&auto=format&fit=crop" className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-all hidden sm:block shadow-sm" />
                <img src="https://images.unsplash.com/photo-1588147814407-160bf60ad15c?q=80&w=200&h=200&auto=format&fit=crop" className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-all hidden md:block shadow-sm" />
             </div>
             <div>
               <h4 className="font-black text-2xl text-neutral-900">츄러스 / 핫도그 / 떡볶이 <span className="text-sm font-bold text-amber-500 ml-2">메뉴 보기 &rarr;</span></h4>
               <p className="text-sm text-neutral-500 mt-2 font-medium">시간대와 객단가를 보완하는 확실한 스낵 어벤저스 라인업</p>
             </div>
          </div>
        </div>
      </div>
      
      {selectedMenu && <MenuModal menuId={selectedMenu} onClose={() => setSelectedMenu(null)} />}
    </section>
  );
}

function AdoptionModal({ exampleId, onClose }: { exampleId: string | null, onClose: () => void }) {
  if (!exampleId) return null;
  const examples: Record<string, { title: string, desc: string, img: string }> = {
    "01": { title: "01. 샵인샵 예시", desc: "기존 베이커리 쇼케이스 한 켠에 120디저트 전용 워머와 POP를 배치하여 적은 비용으로 아이템을 추가한 사례입니다.", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" },
    "02": { title: "02. 브랜드 표기 예시", desc: "매장 외부 윈도우 스티커와 내부 메뉴판에 120디저트 로고를 병기하여 샵인샵이지만 뚜렷한 브랜딩을 보여주는 사례입니다.", img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop" },
    "03": { title: "03. 공동간판 예시", desc: "간판 우측 하단에 'with 120디저트'를 통일감 있게 부착하여 시너지를 폭발시키는 가장 추천하는 협업 방식입니다.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" },
    "04": { title: "04. 단독 전환 예시", desc: "매장 전면을 블랙&옐로우 톤으로 리브랜딩하여 120디저트 전문점으로 완벽히 재탄생한 사례입니다.", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" },
  };
  const data = examples[exampleId];

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm" onClick={onClose}>
         <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} className="bg-white border border-neutral-200 rounded-3xl w-full max-w-3xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row">
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 bg-neutral-100 hover:bg-neutral-200 rounded-full p-2 z-10 hidden md:block"><X size={20}/></button>
            <div className="w-full md:w-1/2 h-64 md:h-auto">
               <img src={data.img} className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white relative">
               <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 md:hidden"><X size={24}/></button>
               <h3 className="text-2xl font-black text-amber-500 mb-4">{data.title}</h3>
               <p className="text-neutral-600 font-bold leading-relaxed">{data.desc}</p>
            </div>
         </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function AdoptionSection() {
  const [exampleId, setExampleId] = useState<string | null>(null);
  const steps = [
    { num: "01", title: "가장 가벼운 샵인샵", desc: "기존 매장 안에 메뉴만 슬쩍 추가합니다." },
    { num: "02", title: "확실한 브랜드 표기", desc: "매장 내부에 브랜드를 노출해 호기심을 유발합니다." },
    { num: "03", title: "시너지 극대화 공동간판", desc: "간판을 공유해 브랜드 파워를 극대화합니다.", highlight: true },
    { num: "04", title: "독보적인 단독 전환", desc: "확신이 들 때, 간판 전체를 120디저트로 바꿉니다." }
  ];

  return (
    <section className="py-24 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">우리 매장에 맞는 방식으로</h2>
            <p className="text-lg font-bold text-amber-500">처음부터 큰 돈을 들일 필요는 없습니다. 작게 시작해 크게 전환하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
             <div key={step.num} className={cn("p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 flex flex-col h-full shadow-sm", 
                step.highlight ? "bg-amber-400 text-neutral-900 scale-105 shadow-[0_10px_30px_rgba(251,191,36,0.3)] border border-amber-400" : "bg-neutral-50 text-neutral-900 border border-neutral-200 hover:border-amber-400/50 hover:shadow-md")}>
               <div className={cn("text-6xl font-black mb-6 transition-colors", step.highlight ? "text-neutral-900/20" : "text-neutral-200 group-hover:text-amber-400/30")}>{step.num}</div>
               <h3 className="text-xl font-black mb-3">{step.title}</h3>
               <p className={cn("text-sm leading-relaxed mb-8 flex-grow font-bold", step.highlight ? "text-neutral-800" : "text-neutral-500")}>{step.desc}</p>
               
               <button onClick={() => setExampleId(step.num)} className={cn("w-full py-3 rounded-lg font-bold transition-colors text-sm", 
                 step.highlight ? "bg-neutral-900 text-amber-400 hover:bg-black" : "bg-neutral-200 text-neutral-700 hover:bg-amber-400 hover:text-neutral-900")}>
                 이 방식의 예시 보기
               </button>
             </div>
          ))}
        </div>
      </div>
      <AdoptionModal exampleId={exampleId} onClose={() => setExampleId(null)} />
    </section>
  );
}

function SuperSuccessCaseSection() {
  return (
    <section id="success" className="py-32 bg-amber-400 text-neutral-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover grayscale mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
         <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">운영 방식이 다른 매장에서도<br/>성공은 증명되었습니다</h2>
         <p className="text-xl font-bold mb-16 opacity-80">전국 가맹점에서 쏟아지는 경이로운 매출의 변화</p>
         
         <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-16">
            <div className="bg-neutral-950 text-white p-10 rounded-3xl w-full max-w-sm shadow-2xl relative border-t-4 border-amber-400">
               <div className="text-amber-400 font-bold mb-2">월 매출 증대율</div>
               <div className="text-6xl font-black mb-4"><AnimatedNumber value={300} suffix="%" /></div>
               <p className="text-neutral-400 font-medium">"버려진 공간이 효자 매대로 바뀌었어요"</p>
               <div className="mt-4 text-xs font-bold text-neutral-600">- OOO카페 샵인샵 점주</div>
            </div>
            
            <div className="bg-white text-neutral-950 p-10 rounded-3xl w-full max-w-sm shadow-2xl relative lg:scale-110 z-10 border-t-8 border-neutral-950">
               <div className="text-neutral-500 font-bold mb-2">단독매장 일 최고매출</div>
               <div className="text-7xl font-black mb-4"><AnimatedNumber value={350} suffix="만" /></div>
               <p className="text-neutral-600 font-bold">"리브랜딩 후 줄 서는 매장이 되었습니다"</p>
               <div className="mt-4 text-xs font-bold text-neutral-400">- 강남 OO점 점주</div>
            </div>

            <div className="bg-neutral-950 text-white p-10 rounded-3xl w-full max-w-sm shadow-2xl relative border-t-4 border-amber-400">
               <div className="text-amber-400 font-bold mb-2">도입 비용 회수기간</div>
               <div className="text-6xl font-black mb-4"><AnimatedNumber value={2} suffix="개월" /></div>
               <p className="text-neutral-400 font-medium">"기존 장비로도 충분히 돌아가는 기적"</p>
               <div className="mt-4 text-xs font-bold text-neutral-600">- 배달전문 OO점 점주</div>
            </div>
         </div>
      </div>
    </section>
  )
}

function StoresPreviewSection() {
  return (
    <section className="py-24 bg-white border-b border-neutral-100 relative overflow-hidden">
       {/* Background Map Graphic Placeholder */}
       <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden lg:block">
         <svg width="800" height="800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
       </div>
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">전국 매장 현황</h2>
                <p className="text-amber-500 font-bold text-lg">우리 동네와 가장 가까운 성공 사장님을 만나보세요</p>
             </div>
             <Link to="/stores" className="px-6 py-3 border-2 border-amber-400 text-amber-500 font-bold rounded-lg hover:bg-amber-400 hover:text-neutral-900 transition-colors shadow-sm">
               전체 가맹점 보기 &rarr;
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               { name: "서울 강남본점", type: "단독매장", region: "서울 강남구" },
               { name: "부산 해운대점", type: "공동간판", region: "부산 해운대구" },
               { name: "홍대 입구점", type: "샵인샵", region: "서울 마포구" },
             ].map((store, i) => (
                <div key={i} className="bg-neutral-50 border border-neutral-200 p-6 rounded-2xl box-border hover:border-amber-400 hover:shadow-md transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <div className="font-black text-xl text-neutral-900 group-hover:text-amber-600 transition-colors">{store.name}</div>
                      <span className="text-xs font-bold text-neutral-900 bg-amber-400 px-2 py-1 rounded shadow-sm">{store.type}</span>
                   </div>
                   <div className="text-neutral-500 font-bold flex items-center gap-2">
                     <MapPin size={16} className="text-neutral-400 group-hover:text-amber-500 transition-colors" />
                     {store.region}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function OwnerSystemSection() {
  return (
    <section className="py-24 bg-white border-t border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 rounded-[3rem] p-8 lg:p-16 border border-neutral-200 flex flex-col lg:flex-row items-center gap-16 relative">
          <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-amber-400/5 to-transparent pointer-events-none rounded-[3rem]"></div>
          
          <div className="w-full lg:w-1/2 relative z-10">
             <span className="text-amber-500 font-black tracking-widest text-sm mb-4 block uppercase flex items-center gap-2">
               <ArrowUpRight size={16} /> Partner Support
             </span>
             <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-neutral-900 leading-tight">가맹점주는 장사에만<br/>집중할 수 있도록</h2>
             <p className="text-lg text-neutral-500 mb-10 font-bold">발주, CS, 홍보물 요청까지. 본사와 다이렉트로 연결되는 점주 전용 모바일 앱 생태계를 제공합니다.</p>
             <div className="flex gap-4">
                <Link to="/portal" className="px-8 py-4 bg-neutral-900 text-white font-black rounded-lg flex items-center hover:bg-black transition-colors shadow-sm">
                  점주 전용 포털 &rarr;
                </Link>
             </div>
          </div>
          <div className="w-full lg:w-1/2 relative z-10">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="점주앱" className="rounded-2xl border border-neutral-200 shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
   const [filter, setFilter] = useState("전체");
   const tabs = ["전체", "메뉴", "매장", "박람회", "기타"];
   
   const images = [
     { id: 1, cat: "메뉴", url: "https://images.unsplash.com/photo-1601000676057-dd23e800c149?q=80&w=400&h=400&fit=crop" },
     { id: 2, cat: "매장", url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&h=400&fit=crop" },
     { id: 3, cat: "메뉴", url: "https://images.unsplash.com/photo-1525351484163-f529e419b48c?q=80&w=400&h=400&fit=crop" },
     { id: 4, cat: "박람회", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&h=400&fit=crop" },
     { id: 5, cat: "기타", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&h=400&fit=crop" },
     { id: 6, cat: "매장", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&h=400&fit=crop" }
   ];

   const filteredImages = filter === "전체" ? images : images.filter(img => img.cat === filter);

   return (
     <section className="py-24 bg-white border-t border-neutral-100">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">현장 갤러리</h2>
            <p className="text-lg text-neutral-500 font-bold">뜨거웠던 현장의 생생한 모습을 확인하세요</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
             {tabs.map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={cn("px-6 py-2.5 rounded-full font-bold text-sm transition-all", filter === t ? "bg-amber-400 text-neutral-900 shadow-sm" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900")}
                >
                  {t}
                </button>
             ))}
          </div>

           <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
             <AnimatePresence>
               {filteredImages.map(img => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.8 }} 
                    key={img.id} 
                    className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden group border border-neutral-200 shadow-sm"
                  >
                     <img src={img.url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                  </motion.div>
               ))}
             </AnimatePresence>
           </motion.div>
       </div>
     </section>
   )
}

function TrustSection() {
  return (
    <section className="py-20 bg-amber-400 text-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-950/20">
           <div className="pt-4 md:pt-0 pb-4 md:pb-0 px-4">
              <div className="text-5xl font-black mb-2"><AnimatedNumber value={8} /><span className="text-3xl font-bold ml-1">종</span></div>
              <div className="text-sm font-bold opacity-80">대표 아이템 운영</div>
           </div>
           <div className="pt-4 md:pt-0 pb-4 md:pb-0 px-4">
              <div className="text-5xl font-black mb-2"><AnimatedNumber value={120} /><span className="text-3xl font-bold ml-1">겹</span></div>
              <div className="text-sm font-bold opacity-80">압도적 파이 기술력</div>
           </div>
           <div className="pt-4 md:pt-0 pb-4 md:pb-0 px-4">
              <div className="text-5xl font-black mb-2"><AnimatedNumber value={4} /><span className="text-3xl font-bold ml-1">단계</span></div>
              <div className="text-sm font-bold opacity-80">브랜드 확장 시스템</div>
           </div>
           <div className="pt-4 md:pt-0 pb-4 md:pb-0 px-4">
              <div className="text-5xl font-black mb-2"><AnimatedNumber value={300} /><span className="text-3xl font-bold ml-1">%</span></div>
              <div className="text-sm font-bold opacity-80">최고 매출 증대율</div>
           </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    { q: "기존 카페에도 바로 도입할 수 있나요?", a: "네, 최소한의 쇼케이스 공간만 있다면 샵인샵 형태로 120디저트의 주요 메뉴를 쉽게 추가할 수 있습니다." },
    { q: "조리 과정이 복잡하지 않나요?", a: "초보 아르바이트생도 1시간 교육이면 바로 구워낼 수 있는 완벽한 반제품 형태로 제공됩니다. 전용 오븐기의 타이머만 맞추면 됩니다." },
    { q: "초기 자본이 많이 들까요?", a: "기존 냉동고를 활용하고 최소한의 핵심 장비만 추가하면 되기 때문에 수백만 원 대의 가벼운 비용으로 시작할 수 있습니다." },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-neutral-50 border-t border-neutral-200">
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">가장 많이 묻는 질문</h2>
          </div>
          <div className="space-y-4">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                 <button 
                   onClick={() => setOpenIdx(openIdx === i ? null : i)}
                   className="w-full px-8 py-6 text-left font-bold text-neutral-900 flex justify-between items-center hover:bg-neutral-50 transition-colors"
                 >
                   <span className="text-lg">{faq.q}</span>
                   <ChevronDown size={24} className={cn("text-amber-500 transition-transform duration-300", openIdx === i ? "rotate-180" : "")} />
                 </button>
                 <AnimatePresence>
                    {openIdx === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-8 py-6 pt-0 text-neutral-600 font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
               </div>
             ))}
          </div>
          <div className="mt-12 text-center">
             <Link to="/inquiry" className="inline-flex py-4 px-8 items-center bg-neutral-900 text-white font-black rounded-lg hover:scale-105 hover:bg-black transition-all shadow-md hover:shadow-lg">더 궁금한 점 문의하기 <ArrowRight size={18} className="ml-2" /></Link>
          </div>
       </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="py-32 bg-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-neutral-950 tracking-tight mb-6 leading-tight">
               메뉴 하나만 바꿔도<br/>간판을 바꿀 힘이 생깁니다
            </h2>
            <p className="text-xl md:text-2xl text-neutral-950 font-bold opacity-80">
               지금 바로 우리 매장에 딱 맞는 방식을 확인하세요.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-neutral-950 rounded-3xl p-10 shadow-2xl text-center flex flex-col items-center group cursor-pointer hover:border-amber-900 border border-neutral-900 transition-all">
               <h3 className="text-3xl font-black text-amber-400 mb-4">도입 문의하기</h3>
               <p className="text-neutral-400 mb-10 font-medium">샵인샵, 메뉴 추가 등 비용 없이 가볍게 상담</p>
               <Link to="/inquiry" className="w-full py-5 bg-amber-400 text-neutral-950 font-black text-lg rounded-xl flex items-center justify-center">상담 신청 <ArrowRight className="ml-2" size={20} /></Link>
            </div>
            
            <div className="bg-white rounded-3xl p-10 shadow-2xl text-center flex flex-col items-center group cursor-pointer border border-neutral-200 hover:border-neutral-400 transition-all">
               <h3 className="text-3xl font-black text-neutral-950 mb-4">공동간판/리브랜딩</h3>
               <p className="text-neutral-600 mb-10 font-bold">폭발적인 성장을 원한다면 120디저트를 메인으로</p>
               <Link to="/inquiry" className="w-full py-5 bg-neutral-950 text-white font-black text-lg rounded-xl flex items-center justify-center">상담 신청 <ArrowRight className="ml-2" size={20} /></Link>
            </div>
         </div>
      </div>
    </section>
  )
}

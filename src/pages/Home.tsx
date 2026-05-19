import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp, Store, Zap, ChevronDown, Package, LayoutTemplate, Box, ArrowUpRight, X, MapPin, Headphones, Monitor, Heart, Sparkles, Trophy, Lightbulb } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { motion, useInView, AnimatePresence } from "motion/react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white text-neutral-900 scroll-smooth overflow-x-hidden">
      <HeroSection />
      <DefinitionSection />
      <BackgroundSection />
      <WhySection />
      <PositioningSection />
      <StructureSection />
      <MenuSection />
      <StoreTypeSection />
      <AdoptionSection />
      <StoreChangeSection />
      <SuperSuccessCaseSection />
      <ViralBrandingSection />
      <RoadmapSection />
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
    <section className="relative bg-neutral-950 overflow-hidden py-16 md:py-28 lg:py-36 border-b border-neutral-900">
      {/* Abstract Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-400 mb-6 backdrop-blur-sm">
                <Store size={14} className="mr-2 shrink-0" /> 소상공인 카페 회생을 위한 하이브리드 리모델링
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight text-white"
            >
              소상공인 카페 회생,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 drop-shadow-[0_0_30px_rgba(251,191,36,0.25)]">120pie&coffee</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }} 
              className="text-base sm:text-lg md:text-xl text-neutral-300 mb-10 max-w-xl font-medium leading-relaxed"
            >
              철거 공사비 제로, 기존 간판 위에 트렌디한 브랜딩과 검증된 120파이 패밀리 콘텐츠를 가볍게 얹어 동네 카페의 한계를 뛰어넘습니다.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.4 }} 
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 w-full sm:w-auto"
            >
              <Link 
                to="/inquiry" 
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 text-neutral-950 font-black rounded hover:bg-amber-300 transition-all flex items-center justify-center shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:scale-[1.02]"
              >
                리모델링 상담받기 <ArrowRight size={18} className="ml-2" />
              </Link>
              <a 
                href="#brand" 
                className="w-full sm:w-auto px-8 py-4 bg-neutral-900 border border-neutral-800 text-white font-bold rounded hover:bg-neutral-800 transition-colors text-center"
              >
                하이브리드 전략 보기
              </a>
            </motion.div>
          </div>

          {/* Right Product Grid Collage (Stunning Food Showcase) */}
          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
            {/* Top-Right Overlapping Image */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute w-[60%] aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-2xl z-20 left-[5%] top-[5%] hover:z-40 hover:border-amber-400 transition-all duration-300 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop" 
                alt="120겹파이 시그니처" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-amber-400 text-[10px] font-black uppercase tracking-wider">Signature Core</span>
                <h3 className="text-white font-bold text-sm sm:text-base">120겹 페이스트리 파이</h3>
              </div>
            </motion.div>

            {/* Bottom-Right Overlapping Image */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, x: 30 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute w-[50%] aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-2xl z-30 right-[5%] bottom-[10%] hover:z-40 hover:border-amber-400 transition-all duration-300 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop" 
                alt="에그120 계란빵" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-green-400 text-[10px] font-black uppercase tracking-wider">Premium Soft</span>
                <h3 className="text-white font-bold text-sm sm:text-base">에그120 쌀계란빵</h3>
              </div>
            </motion.div>

            {/* Behind Decor Grid Item */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.7 }}
              className="absolute w-[45%] aspect-square rounded-2xl overflow-hidden border border-neutral-800 shadow-xl z-10 right-[15%] top-[10%] bg-neutral-900"
            >
              <img 
                src="https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=600&auto=format&fit=crop" 
                alt="츄러스" 
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function DefinitionSection() {
  const badges = ["즉석성", "대중성", "차별성", "확장성", "운영편의성"];
  const foods = [
    { title: "120파이", desc: "시그니처 페이스트리 기반의 검증된 맛", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&fit=crop" },
    { title: "에그120 계란빵", desc: "100% 쌀반죽으로 만든 프리미엄 계란빵", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&fit=crop" },
    { title: "에어프라이 츄러스", desc: "기름 없이 굽는 겉바속촉 츄러스", img: "https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=400&fit=crop" },
    { title: "직화 불고기 핫도그", desc: "불고기 버거 패티 풍미 소시지 장착", img: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=400&fit=crop" },
    { title: "프리미엄 브런치 수프", desc: "매장 객단가와 브런치 격을 올리는 비기", img: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=400&fit=crop" }
  ];

  return (
    <section id="brand" className="py-20 md:py-28 bg-white border-b border-neutral-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Text - Redesigned for premium readability and modern layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-between mb-16"
        >
          <div className="max-w-xl">
            <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-3 block uppercase">Brand Story</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
              익숙한 국민 간식을<br />
              <span className="text-amber-500">새롭게 정의</span>합니다.
            </h2>
          </div>
          <div className="max-w-xl flex flex-col gap-6">
            <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
              120pie&coffee는 갓 구워낸 즐거움과 1인 운영에 최적화된 시스템을 제공합니다. 
              120겹파이를 중심으로 에그120, 츄러스, 핫도그, 수프까지 매장 입지와 상황에 맞춰 조합하는 똑똑한 모듈러 비즈니스입니다.
            </p>
            <div className="flex flex-wrap gap-2">
              {badges.map(b => (
                <span key={b} className="px-4 py-2 bg-amber-50 text-amber-700 text-xs sm:text-sm font-bold rounded-full border border-amber-200/50 shadow-sm">
                  #{b}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Visual Showcase (Horizontal Swipe on Mobile, 5-col Grid on Desktop) */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-6 gap-6 md:grid md:grid-cols-5 md:overflow-x-visible md:pb-0 scrollbar-thin scrollbar-thumb-amber-300">
            {foods.map((food, i) => (
              <div 
                key={i} 
                className="shrink-0 w-[240px] sm:w-[280px] md:w-auto bg-neutral-50 border border-neutral-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-amber-400 transition-all duration-300 group"
              >
                <div className="h-44 sm:h-52 overflow-hidden relative">
                  <img 
                    src={food.img} 
                    alt={food.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-lg text-neutral-900 mb-1">{food.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 font-bold leading-relaxed">{food.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-xs text-neutral-400 font-bold block md:hidden">
            &larr; 좌우로 스와이프하여 메뉴를 확인해 보세요 &rarr;
          </div>
        </div>

      </div>
    </section>
  );
}

function BackgroundSection() {
  const steps = [
    { title: "120겹파이 운영 확대", desc: "시그니처 메뉴 시장성 검증 완료", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=150&fit=crop" },
    { title: "에그120 출시", desc: "새로운 비주얼의 성장 동력 확보", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=150&fit=crop" },
    { title: "직영 운영 메뉴 확대", desc: "츄러스, 핫도그, 수프 라인업 완비", img: "https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=150&fit=crop" },
    { title: "120pie&coffee 브랜드 런칭", desc: "마스터브랜드 전환 및 본격 궤도 진입", isCurrent: true, img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=150&fit=crop" },
  ];

  return (
    <section className="py-20 md:py-28 bg-neutral-50 px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Left Intro column */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
           <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 leading-tight">
             이미 검증된 메뉴 자산 위에<br className="hidden sm:inline" />
             120pie&coffee 마스터 브랜드가 시작됩니다
           </h2>
           <p className="text-base sm:text-lg text-neutral-500 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium mb-8">
             120겹파이와 에그120의 성공적인 개별 브랜드 운영 경험은 동네 상권에서 충분히 검증되었습니다. 이제는 하나의 마스터 브랜드 자산으로 더 거대하고 강력한 매출 시너지를 발휘합니다.
           </p>
           <a 
             href="#structure" 
             className="inline-flex items-center text-neutral-900 font-bold border-b-2 border-neutral-900 pb-1 hover:text-amber-500 hover:border-amber-500 transition-colors"
           >
              브랜드 포트폴리오 구조 보기 <ArrowRight size={16} className="ml-2" />
           </a>
        </div>

        {/* Right Timeline with Image Thumbnails */}
        <div className="w-full lg:w-1/2">
           <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm relative">
              <div className="absolute top-0 bottom-0 left-[35px] sm:left-[39px] w-0.5 bg-neutral-100 z-0"></div>
              
              <div className="space-y-8 relative z-10">
                 {steps.map((step, i) => (
                    <div key={i} className="flex gap-4 sm:gap-6 items-center">
                      {/* Timeline dot */}
                      <div className={cn("shrink-0 w-4 h-4 rounded-full mt-0.5 ring-4", step.isCurrent ? "bg-amber-400 ring-amber-100" : "bg-neutral-300 ring-white")}></div>
                      
                      {/* Thumbnail Image */}
                      <div className="shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
                        <img src={step.img} alt="" className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h4 className={cn("font-black text-sm sm:text-base mb-0.5", step.isCurrent ? "text-amber-500" : "text-neutral-900")}>{step.title}</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 font-bold">{step.desc}</p>
                      </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}

function WhySection() {
  const cards = [
    { title: "소프트웨어 이식", desc: "기존 가맹점 자산을 지키는 1,000만원대 리모델링 전환", icon: <Zap />, img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=300&fit=crop" },
    { title: "엘리트 패밀리", desc: "120파이와 에그120 등 킬러 콘텐츠의 매장 장착", icon: <Store />, img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=300&fit=crop" },
    { title: "No Royalty", desc: "고정 비용 거품 면제, 원재료 상생 물류로 동반 성장", icon: <Box />, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=300&fit=crop" },
    { title: "모듈러 시스템", desc: "입지와 고객층에 어울리는 구성을 퍼즐처럼 조립", icon: <LayoutTemplate />, img: "https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=300&fit=crop" },
    { title: "지역 공유 플랫폼", desc: "레시피 공유 네트워크를 갖춘 상생형 협동 생태계", icon: <TrendingUp />, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=300&fit=crop" },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">왜 하이브리드 리모델링인가</h2>
          <p className="text-base sm:text-lg text-amber-500 font-bold">인테리어 마진을 남기던 가맹 거품을 걷어내고, 오직 핵심적인 콘텐츠 수수료로 승부합니다.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 group shadow-sm hover:shadow-xl"
            >
              {/* Feature Top Image */}
              <div className="h-32 w-full overflow-hidden relative">
                <img src={card.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-neutral-900/10"></div>
                <div className="absolute bottom-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-amber-500 border border-neutral-200">
                  {React.cloneElement(card.icon as React.ReactElement, { size: 18 })}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-lg text-neutral-900 mb-2">{card.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-bold">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PositioningSection() {
  const badges = ["소프트웨어이식", "저비용고효율", "모듈러시스템", "상생형수익구조", "기술공유플랫폼"];
  return (
    <section className="py-20 md:py-24 bg-amber-400 text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
          단순한 샵인샵 메뉴 추가가 아닙니다.<br className="hidden sm:inline" />
          가장 세련된 소프트웨어 브랜딩을 카페에 완전히 이식합니다.
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-bold mb-10 opacity-90 max-w-2xl mx-auto">
          개인 카페의 개성은 유지한 채 본사의 강력한 브랜딩과 시그니처 굿즈를 이식하여 레드오션 상권에서 생존율을 극대화합니다.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {badges.map(b => (
            <span key={b} className="px-5 py-2.5 bg-neutral-900 text-amber-400 text-xs sm:text-sm font-black rounded-full shadow-md">
              #{b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StructureSection() {
  return (
    <section id="structure" className="py-20 md:py-28 bg-neutral-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
         <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">브랜드는 하나로, 역할은 분명하게</h2>
         <p className="text-base sm:text-lg text-neutral-400 mb-16 max-w-xl mx-auto font-medium">
            120pie&coffee는 120겹파이를 시그니처 핵심 축으로, 에그120을 비주얼 성장의 엔진으로 삼아 브랜드를 확장합니다.
         </p>

         <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
            <div className="bg-amber-400 text-neutral-900 font-black text-xl sm:text-2xl py-3.5 px-8 rounded-xl inline-block mb-12 shadow-[0_0_30px_rgba(251,191,36,0.25)]">
               120pie&coffee <span className="font-bold text-base ml-2 opacity-80">(Master Brand)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Fake connecting lines hidden on mobile */}
              <div className="hidden md:block absolute top-[-48px] left-[16.66%] right-[16.66%] h-12 border-t-2 border-l-2 border-r-2 border-neutral-800 rounded-t-xl z-0"></div>
              <div className="hidden md:block absolute top-[-48px] left-1/2 w-0.5 h-12 bg-neutral-800 z-0"></div>

              {/* Core card with image */}
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 relative z-10 flex flex-col items-center overflow-hidden hover:border-amber-400/50 transition-colors">
                <div className="h-28 w-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=300&fit=crop" alt="" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="p-5 flex flex-col items-center">
                  <div className="text-[10px] font-bold text-amber-400 mb-1 tracking-widest uppercase">Hero Core</div>
                  <div className="text-lg font-bold mb-1">120겹파이</div>
                  <div className="text-xs text-neutral-400 text-center">가장 확실한 시그니처 롤</div>
                </div>
              </div>

              {/* Growth card with image */}
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 relative z-10 flex flex-col items-center overflow-hidden hover:border-amber-400/50 transition-colors">
                <div className="h-28 w-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=300&fit=crop" alt="" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="p-5 flex flex-col items-center">
                  <div className="text-[10px] font-bold text-green-400 mb-1 tracking-widest uppercase">Growth Engine</div>
                  <div className="text-lg font-bold mb-1">에그120 계란빵</div>
                  <div className="text-xs text-neutral-400 text-center">비주얼 및 바이럴 성장 엔진</div>
                </div>
              </div>

              {/* Expansion card with image */}
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 relative z-10 flex flex-col items-center overflow-hidden hover:border-amber-400/50 transition-colors">
                <div className="h-28 w-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=300&fit=crop" alt="" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="p-5 flex flex-col items-center">
                  <div className="text-[10px] font-bold text-blue-400 mb-1 tracking-widest uppercase">Expansion Module</div>
                  <div className="text-lg font-bold mb-1">츄러스 · 핫도그 · 수프</div>
                  <div className="text-xs text-neutral-400 text-center">상권 성격 맞춤형 확장 상품</div>
                </div>
              </div>
            </div>
         </div>
         <div className="mt-12">
            <a href="#menu" className="inline-flex items-center text-amber-400 font-bold hover:text-amber-300">메뉴 실물 및 패키징 보기 <ArrowRight size={16} className="ml-2" /></a>
         </div>
      </div>
    </section>
  );
}

function MenuModal({ menuId, onClose }: { menuId: string | null, onClose: () => void }) {
  if (!menuId) return null;

  const details: Record<string, { title: string, desc: string, items: {name: string, desc: string, img: string}[] }> = {
    "120겹파이": {
       title: "핵심 엔진: 120파이",
       desc: "페이스트리 기반의 검증된 맛과 전문성으로 디저트부터 식사 대용까지 아우르는 강력한 범용성",
       items: [
         { name: "수제 고기파이", desc: "육즙이 폭발하여 든든한 한 끼 식사가 되는 시그니처 파이", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop" },
         { name: "달콤 애플파이", desc: "시나몬 and 사과 과육의 환상적인 하모니", img: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600&auto=format&fit=crop" },
         { name: "식사/피자 파이류", desc: "강력한 범용성으로 점심/저녁 식사 수요까지 흡수", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop" }
       ]
    },
    "에그120": {
       title: "확장 엔진: 에그120 (계란빵)",
       desc: "레트로 감성을 현대적으로 재해석하고 쌀반죽을 사용하여 건강함과 퀄리티를 완성한 프리미엄 아이템",
       items: [
         { name: "쌀반죽 에그빵", desc: "일반 밀가루가 아닌 100% 쌀반죽을 사용하여 겉바속촉함 극대화", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop" },
         { name: "베이컨치즈 에그", desc: "단짠단짠 베이컨 치즈와 통계란의 풍미", img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=600&auto=format&fit=crop" },
       ]
    },
    "기타": {
       title: "확장 패밀리 라인업",
       desc: "에어프라이어 조리 츄러스, 직화 불고기 패티 핫도그, 프리미엄 수프까지 완벽한 콘텐츠",
       items: [
         { name: "고품질 츄러스", desc: "튀기는 번거로움 없이 에어프라이어 조리만으로 전문점의 식감을 내는 냉동 생지", img: "https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=600&auto=format&fit=crop" },
         { name: "직화 불고기 핫도그", desc: "시중 저가 소시지 대신 직화 불고기 버거 패티의 깊은 풍미를 소시지 형태로 구현", img: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=600&auto=format&fit=crop" },
         { name: "프리미엄 수프", desc: "빵과 최상의 궁합을 자랑하는 특제 레시피 완제품 수프, 카페를 브런치 매장으로 격상", img: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop" }
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
            className="bg-white border border-neutral-200 rounded-3xl w-full max-w-4xl overflow-hidden relative shadow-2xl"
         >
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 bg-neutral-100 rounded-full p-2 z-10"><X size={20}/></button>
            <div className="p-8 border-b border-neutral-100 text-center">
               <h3 className="text-2xl font-black text-amber-500 mb-2">{data.title}</h3>
               <p className="text-neutral-500 font-bold">{data.desc}</p>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-50 max-h-[60vh] overflow-y-auto">
               {data.items.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all">
                     <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                     <div className="p-5 text-center">
                        <h4 className="font-bold text-neutral-900 mb-2">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 font-bold">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
            <div className="p-6 bg-white text-center border-t border-neutral-100">
               <Link to="/inquiry" className="inline-block px-8 py-3.5 bg-amber-400 font-bold text-neutral-900 rounded hover:bg-amber-500 transition-colors shadow-sm text-sm">도입 단가 문의하기</Link>
            </div>
         </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MenuSection() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  return (
    <section id="menu" className="py-20 md:py-28 bg-neutral-50 overflow-hidden relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="mb-16 text-center lg:text-left">
          <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Product Catalog</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">모듈형 제품 포트폴리오</h2>
          <p className="text-base sm:text-lg text-amber-500 font-bold">각 아이템이 독보적인 경쟁력을 지닌 패밀리 콘텐츠를 입지에 맞춰 장착해보세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Hero Card */}
          <div 
            onClick={() => setSelectedMenu("120겹파이")} 
            className="md:col-span-8 bg-white rounded-3xl overflow-hidden border border-neutral-200 group shadow-md hover:shadow-xl hover:border-amber-400 transition-all cursor-pointer"
          >
            <div className="h-64 sm:h-80 overflow-hidden relative bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2070&auto=format&fit=crop" 
                alt="120겹파이" 
                className="w-full h-full object-cover group-hover:scale-102 transition-all duration-700" 
              />
              <div className="absolute top-4 left-4 bg-amber-400 text-neutral-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Core Engine</div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 text-neutral-900 flex justify-between items-center">
                120파이 
                <span className="text-xs sm:text-sm font-bold text-amber-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">상세 제품 보기 &rarr;</span>
              </h3>
              <p className="text-neutral-500 text-sm sm:text-base font-medium">페이스트리 기반의 검증된 맛과 전문성을 바탕으로 디저트부터 식사용 피자류, 라이스류까지 아우르는 브랜드의 중심 엔진</p>
            </div>
          </div>

          {/* Medium Card */}
          <div 
            onClick={() => setSelectedMenu("에그120")} 
            className="md:col-span-4 bg-white rounded-3xl overflow-hidden border border-neutral-200 group shadow-md hover:shadow-xl hover:border-amber-400 transition-all cursor-pointer"
          >
            <div className="h-64 sm:h-80 md:h-64 overflow-hidden relative bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1500&auto=format&fit=crop" 
                alt="에그120" 
                className="w-full h-full object-cover group-hover:scale-102 transition-all duration-700" 
              />
              <div className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Family Engine</div>
            </div>
            <div className="p-6 sm:p-8 md:p-6">
              <h3 className="text-xl sm:text-2xl font-black mb-2 text-neutral-900 flex justify-between items-center">
                에그120 계란빵 
                <span className="text-xs sm:text-sm font-bold text-amber-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">상세 보기 &rarr;</span>
              </h3>
              <p className="text-neutral-500 text-xs sm:text-sm font-medium">쌀반죽을 사용하여 건강함과 쫄깃함을 극대화하고 프리미엄 굿즈 퀄리티를 지향하는 레트로의 현대화</p>
            </div>
          </div>

          {/* Small Card Aggregation */}
          <div 
            onClick={() => setSelectedMenu("기타")} 
            className="md:col-span-12 bg-white rounded-3xl overflow-hidden border border-neutral-200 flex flex-col md:flex-row items-center gap-6 group hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer p-6 relative shadow-md"
          >
             <div className="absolute top-4 right-4 bg-neutral-100 text-neutral-500 text-[10px] font-black px-4 py-1 rounded-full uppercase">Snacks & Soups</div>
             <div className="flex gap-3 w-full md:w-auto shrink-0 justify-center">
                <img src="https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=200&h=200&auto=format&fit=crop" className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" alt="" />
                <img src="https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=200&h=200&auto=format&fit=crop" className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" alt="" />
                <img src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=200&h=200&auto=format&fit=crop" className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" alt="" />
             </div>
             <div className="text-center md:text-left flex-grow">
                <h4 className="font-black text-xl sm:text-2xl text-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between">
                   츄러스 · 직화 불고기 핫도그 · 프리미엄 수프 
                   <span className="text-xs sm:text-sm font-bold text-amber-500 mt-2 sm:mt-0 flex items-center justify-center gap-1 group-hover:translate-x-1 transition-transform">패밀리 상세 보기 &rarr;</span>
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-medium">에어프라이어로 구워낸 바삭한 츄러스, 불고기 패티의 핫도그, 카페를 브런치 식사 공간으로 끌어올리는 특제 수프 패밀리</p>
             </div>
          </div>
        </div>

        {/* Strategic Menu Packaging (Modular System) */}
        <div className="mt-16 bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-neutral-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <span className="text-amber-400 font-bold tracking-widest text-xs mb-3 block uppercase">
              Strategic Packaging
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-4">전략적 메뉴 패키징 (모듈형 시스템)</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-10 max-w-2xl font-medium">
              입지와 타겟에 맞춰 퍼즐 맞추기식으로 아이템을 조합하여 장착할 수 있습니다. 
              시너지를 내는 최상의 조합으로 객단가와 SNS 바이럴을 극대화합니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-800/60 border border-neutral-700/60 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-400/50 transition-all">
                <div>
                  <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-4">
                    모닝/브런치 팩
                  </span>
                  <h4 className="text-lg font-bold mb-2">수프 + 120파이</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-bold">
                    오피스 상권 최적화. 직장인 아침 식사 수요를 흡수하여 오전 매출과 평균 객단가를 급격히 상승시킵니다.
                  </p>
                </div>
                <div className="text-xs font-bold text-amber-400/80">추천 입지: 오피스 상권</div>
              </div>

              <div className="bg-neutral-800/60 border border-neutral-700/60 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-400/50 transition-all">
                <div>
                  <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-4">
                    SNS 바이럴 팩
                  </span>
                  <h4 className="text-lg font-bold mb-2">에그120 + 시그니처 음료</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-bold">
                    MZ세대 저격. 쌀반죽의 건강함과 선글라스를 낀 위트 있는 계란 캐릭터의 독보적인 비주얼로 인스타그램 홍보를 극대화합니다.
                  </p>
                </div>
                <div className="text-xs font-bold text-amber-400/80">추천 입지: 대학가 / 핫플레이스</div>
              </div>

              <div className="bg-neutral-800/60 border border-neutral-700/60 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-400/50 transition-all">
                <div>
                  <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-4">
                    스테디 셀러 팩
                  </span>
                  <h4 className="text-lg font-bold mb-2">추러스 + 핫도그 + 파이</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-bold">
                    가족 단위 & 배달 최적화. 전 연령대의 간식 수요와 늦은 밤 야식 배달 매출까지 확실히 흡수하는 안정적 구조입니다.
                  </p>
                </div>
                <div className="text-xs font-bold text-amber-400/80">추천 입지: 주거 밀집 지역</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedMenu && <MenuModal menuId={selectedMenu} onClose={() => setSelectedMenu(null)} />}
    </section>
  );
}

function StoreTypeSection() {
  const storeTypes = [
    { title: "기존 개인 카페", desc: "에스프레소 머신만 있고 대표 디저트 메뉴가 없어 고객 유인 요소와 객단가가 정체된 매장", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&fit=crop" },
    { title: "소형 테이크아웃 / 분식", desc: "1인 운영에 최적화된 빠른 조리와 높은 회전율을 가진 간편 스트리트 스낵 중심 매장", img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=400&fit=crop" },
    { title: "배달 전문점 / 샵인샵", desc: "배달의민족, 쿠팡이츠 등 배달 앱 리뷰를 폭발시키고 매출 구조를 견인할 시그니처가 필요한 매장", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&fit=crop" },
    { title: "신규 창업 및 단독 전환", desc: "120pie&coffee의 옐로우&블랙 비주얼 아이덴티티와 마스터 캐릭터를 전면 적용한 신규 가맹 매장", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&fit=crop" },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Target Store Types</span>
           <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
              어떤 매장이든 120pie&coffee로<br className="hidden sm:inline" />새로운 활력을 얻을 수 있습니다
           </h2>
           <p className="text-sm sm:text-base text-neutral-500 mt-4 font-medium">현재 매장 상황과 상권의 종류에 따라 가장 합리적이고 마진율이 높은 구성을 추천합니다.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeTypes.map((type, i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-400 transition-all duration-300 flex flex-col group">
                <div className="h-44 overflow-hidden relative">
                  <img src={type.img} alt={type.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-neutral-900/10"></div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-lg text-neutral-900 mb-2">{type.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-500 font-bold leading-relaxed">{type.desc}</p>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
}

function AdoptionModal({ exampleId, onClose }: { exampleId: string | null, onClose: () => void }) {
  if (!exampleId) return null;
  const examples: Record<string, { title: string, desc: string, img: string }> = {
    "01": { title: "01. 샵인샵 예시", desc: "기존 베이커리 쇼케이스 한 켠에 120pie&coffee 전용 워머와 POP를 배치하여 적은 비용으로 아이템을 추가한 사례입니다.", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" },
    "02": { title: "02. 브랜드 표기 예시", desc: "매장 외부 윈도우 스티커와 내부 메뉴판에 120pie&coffee 로고를 병기하여 샵인샵이지만 뚜렷한 브랜딩을 보여주는 사례입니다.", img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop" },
    "03": { title: "03. 공동간판 예시", desc: "간판 우측 하단에 'with 120pie&coffee'를 통일감 있게 부착하여 시너지를 폭발시키는 가장 추천하는 협업 방식입니다.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" },
    "04": { title: "04. 단독 전환 예시", desc: "매장 전면을 블랙&옐로우 톤으로 리브랜딩하여 120pie&coffee 전문점으로 완벽히 재탄생한 사례입니다.", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" },
  };
  const data = examples[exampleId];

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm" onClick={onClose}>
         <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} className="bg-white border border-neutral-200 rounded-3xl w-full max-w-3xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row">
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 bg-neutral-100 hover:bg-neutral-200 rounded-full p-2 z-10 hidden md:block"><X size={20}/></button>
            <div className="w-full md:w-1/2 h-64 md:h-auto">
               <img src={data.img} className="w-full h-full object-cover opacity-90 mix-blend-multiply" alt="" />
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
    { num: "01", title: "가장 가벼운 샵인샵", desc: "기존 매장 안에 메뉴만 슬쩍 추가합니다.", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=200&fit=crop" },
    { num: "02", title: "확실한 브랜드 표기", desc: "매장 내부에 브랜드를 노출해 호기심을 유발합니다.", img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=200&fit=crop" },
    { num: "03", title: "시너지 극대화 공동간판", desc: "간판을 공유해 브랜드 파워를 극대화합니다.", highlight: true, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=200&fit=crop" },
    { num: "04", title: "독보적인 단독 전환", desc: "확신이 들 때, 간판 전체를 120pie&coffee로 바꿉니다.", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=200&fit=crop" }
  ];

  return (
    <section id="adoption" className="py-20 md:py-28 bg-neutral-50 border-y border-neutral-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-16 text-center">
            <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Adoption Guide</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">우리 매장에 맞는 방식으로</h2>
            <p className="text-sm sm:text-lg font-bold text-amber-500">처음부터 큰 돈을 들일 필요는 없습니다. 작게 시작해 크게 전환하세요.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
             <div 
               key={step.num} 
               className={cn("rounded-3xl overflow-hidden relative transition-all duration-300 flex flex-col h-full border shadow-sm group", 
                 step.highlight ? "bg-amber-400 border-amber-400 scale-[1.02] sm:scale-105 shadow-[0_10px_30px_rgba(251,191,36,0.25)] text-neutral-900" : "bg-white border-neutral-200 hover:border-amber-400/50 hover:shadow-md text-neutral-900")}
             >
               {/* Tiny illustrative photo */}
               <div className="h-28 overflow-hidden relative">
                 <img src={step.img} alt="" className="w-full h-full object-cover opacity-80" />
                 <div className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-black px-2 py-0.5 rounded">
                   STEP {step.num}
                 </div>
               </div>
               <div className="p-6 flex-grow flex flex-col justify-between">
                 <div>
                   <h3 className="text-lg font-black mb-2">{step.title}</h3>
                   <p className={cn("text-xs sm:text-sm leading-relaxed mb-6 font-bold", step.highlight ? "text-neutral-800" : "text-neutral-500")}>{step.desc}</p>
                 </div>
                 <button 
                   onClick={() => setExampleId(step.num)} 
                   className={cn("w-full py-3 rounded-xl font-bold transition-all text-xs", 
                     step.highlight ? "bg-neutral-900 text-amber-400 hover:bg-black" : "bg-neutral-100 text-neutral-700 hover:bg-amber-400 hover:text-neutral-900")}
                 >
                   이 방식의 사진 예시 보기
                 </button>
               </div>
             </div>
          ))}
        </div>
      </div>
      <AdoptionModal exampleId={exampleId} onClose={() => setExampleId(null)} />
    </section>
  );
}

function StoreChangeSection() {
  return (
    <section className="py-20 md:py-28 bg-white px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-5xl mx-auto">
         <div className="text-center mb-16">
            <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Visual Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 mb-4 leading-snug">
               매장 형태는 그대로 유지하되,<br className="hidden sm:inline" />
               브랜드 인지도와 활력만 극적으로 올립니다
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before Card */}
            <div className="bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-200 shadow-sm flex flex-col">
               <div className="h-48 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-60" alt="" />
                  <div className="absolute inset-0 bg-neutral-900/40 flex items-center justify-center">
                    <span className="bg-neutral-900 text-white font-black px-6 py-2 rounded-full border border-neutral-700 text-sm">BEFORE (기존 노후 카페)</span>
                  </div>
               </div>
               <div className="p-6 sm:p-8 flex-grow">
                  <ul className="space-y-4">
                     <li className="flex items-start text-neutral-500 font-bold text-sm"><CheckCircle2 className="mr-3 shrink-0 text-neutral-300 mt-0.5" /> 시그니처 디저트가 없어 커피만 판매 (낮은 객단가)</li>
                     <li className="flex items-start text-neutral-500 font-bold text-sm"><CheckCircle2 className="mr-3 shrink-0 text-neutral-300 mt-0.5" /> 개인 매장으로서의 상권 경쟁력 및 독자 브랜드 한계</li>
                     <li className="flex items-start text-neutral-500 font-bold text-sm"><CheckCircle2 className="mr-3 shrink-0 text-neutral-300 mt-0.5" /> 배달 앱 매력도가 떨어져 포장/배달 매출 정체</li>
                  </ul>
               </div>
            </div>

            {/* After Card */}
            <div className="bg-amber-50/50 rounded-3xl overflow-hidden border border-amber-200/80 shadow-md flex flex-col">
               <div className="h-48 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-neutral-950/30 flex items-center justify-center">
                    <span className="bg-amber-400 text-neutral-950 font-black px-6 py-2 rounded-full shadow-md text-sm">AFTER (with 120pie&coffee)</span>
                  </div>
               </div>
               <div className="p-6 sm:p-8 flex-grow">
                  <ul className="space-y-4">
                     <li className="flex items-start font-bold text-neutral-900 text-sm"><CheckCircle2 className="mr-3 shrink-0 text-amber-500 mt-0.5" /> 120겹 시그니처 파이 탑재로 아침/식사/디저트 완벽 흡수</li>
                     <li className="flex items-start font-bold text-neutral-900 text-sm"><CheckCircle2 className="mr-3 shrink-0 text-amber-500 mt-0.5" /> 120겹 로고, 고품질 패밀리 패키징, 홍보물로 세련된 분위기 전환</li>
                     <li className="flex items-start font-bold text-neutral-900 text-sm"><CheckCircle2 className="mr-3 shrink-0 text-amber-500 mt-0.5" /> 공동간판 및 배달 시그니처 획득으로 온/오프라인 매출 극대화</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}

function SuperSuccessCaseSection() {
  return (
    <section id="success" className="py-24 md:py-32 bg-amber-400 text-neutral-950 overflow-hidden relative scroll-mt-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover grayscale mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
         <span className="text-neutral-900 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Success Records</span>
         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-neutral-900 leading-tight">
            가벼운 도입 후 일어난<br />놀라운 성공을 통계로 증명합니다
         </h2>
         <p className="text-base sm:text-xl font-bold mb-16 opacity-80 max-w-xl mx-auto">기존 개인 매장의 정체된 매출 구조가 120pie&coffee의 모듈러 이식 후 급격히 개선되었습니다.</p>
         
         <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="bg-neutral-950 text-white p-8 sm:p-10 rounded-3xl w-full max-w-sm shadow-2xl relative border-t-4 border-amber-400">
               <div className="text-amber-400 font-bold mb-2 text-sm">월 매출 증대율</div>
               <div className="text-5xl sm:text-6xl font-black mb-4"><AnimatedNumber value={300} suffix="%" /></div>
               <p className="text-neutral-400 font-bold text-xs sm:text-sm">"기존 메뉴에 더해져 비수기 걱정이 없어졌어요"</p>
               <div className="mt-4 text-[10px] sm:text-xs font-bold text-neutral-600">- OOO카페 샵인샵 점주</div>
            </div>
            
            <div className="bg-white text-neutral-950 p-8 sm:p-10 rounded-3xl w-full max-w-sm shadow-2xl relative md:scale-105 z-10 border-t-8 border-neutral-950">
               <div className="text-neutral-500 font-bold mb-2 text-sm">단독매장 일 최고매출</div>
               <div className="text-6xl sm:text-7xl font-black mb-4"><AnimatedNumber value={350} suffix="만" /></div>
               <p className="text-neutral-600 font-bold text-xs sm:text-sm">"리브랜딩 간판 전환 후 연일 줄 서는 카페로 바꿨습니다"</p>
               <div className="mt-4 text-[10px] sm:text-xs font-bold text-neutral-400">- 강남 OO점 점주</div>
            </div>

            <div className="bg-neutral-950 text-white p-8 sm:p-10 rounded-3xl w-full max-w-sm shadow-2xl relative border-t-4 border-amber-400">
               <div className="text-amber-400 font-bold mb-2 text-sm">도입 비용 회수기간</div>
               <div className="text-5xl sm:text-6xl font-black mb-4"><AnimatedNumber value={2} suffix="개월" /></div>
               <p className="text-neutral-400 font-bold text-xs sm:text-sm">"철거 공사 없이 집기만 세팅해 바로 투자금 회수"</p>
               <div className="mt-4 text-[10px] sm:text-xs font-bold text-neutral-600">- 배달전문 OO점 점주</div>
            </div>
         </div>
      </div>
    </section>
  )
}

function ViralBrandingSection() {
  const brandingAssets = [
    { title: "위트 있는 계란 캐릭터", desc: "선글라스를 낀 귀여운 계란 캐릭터 '에그군' 그래픽을 포장 패키지, 컵 홀더, 에이프런 등에 전면 배치하여 MZ세대들의 인스타그래머블한 자발적 공유를 유도합니다.", icon: <Sparkles className="text-amber-400" />, img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&fit=crop" },
    { title: "오픈 초기 인지도 보장", desc: "매장 오픈 후 첫 한 달 동안 지역 주민들의 시선을 사로잡는 대형 선글라스 계란 풍선 광고물과 본사 마스코트 코스튬(인형탈) 무상 대여 서비스를 통해 지역구 압도적 화제성을 선점합니다.", icon: <Heart className="text-red-400" />, img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&fit=crop" },
    { title: "선물하고 싶은 굿즈 패키지", desc: "에그120과 120파이를 고급 옐로우 굿즈 기프트 박스에 포장하는 프리미엄 포장 디자인 솔루션. 주변 지인이나 단체 행사용 답례품, 선물 세트로서의 2차 판매 경로를 개척합니다.", icon: <Package className="text-blue-400" />, img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=400&fit=crop" }
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Visual & Viral Identity</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
            동네 골목 카페가<br className="hidden sm:inline" />대기업 프랜차이즈의 비주얼을 입는 법
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-4 font-bold">확실한 캐릭터 마케팅과 굿즈 세련미를 이식해 고객이 스스로 인증 사진을 찍게 만듭니다.</p>
        </div>

        {/* 3-Col Gallery of Branding Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandingAssets.map((asset, i) => (
            <div key={i} className="bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-200/60 shadow-sm flex flex-col group hover:border-amber-400 transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img src={asset.img} alt={asset.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                <div className="absolute inset-0 bg-neutral-950/20"></div>
                <div className="absolute top-4 left-4 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm border border-neutral-150">
                  {asset.icon}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-lg sm:text-xl text-neutral-900 mb-3">{asset.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-bold">{asset.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function RoadmapSection() {
  const phases = [
    { step: "Phase 1", title: "Market Seizing (선점)", desc: "소액 하이브리드 리모델링 및 샵인샵 확장 모델을 이용해 전국의 개인 매장을 120pie&coffee 간판으로 전면 전환하여 시장의 총 매장 수와 인지도를 빠르게 점유합니다.", icon: <Trophy className="text-amber-500" /> },
    { step: "Phase 2", title: "Standardization (표준화)", desc: "늘어난 가맹점 인프라를 바탕으로 본사 생지 대량 구매 물류 효율화를 거쳐 원자재 가격을 하향 안정화하고, 데이터 분석으로 가맹 브랜드 밸류를 동반 업그레이드합니다.", icon: <Sparkles className="text-green-500" /> },
    { phase: "Phase 3", title: "Exit & Database Investment", desc: "전국에 구축된 촘촘한 매장 인프라와 배달/유통 데이터베이스를 바탕으로 기관 투자 유치 및 브랜드 엑시트(Exit)를 추진하여 점주님들과 상생 성과를 공유합니다.", icon: <Lightbulb className="text-blue-500" /> }
  ];

  return (
    <section className="py-20 md:py-28 bg-neutral-50 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Future Roadmap</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
            지속 가능한 동반 성장 시스템
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-4 font-bold">120pie&coffee는 단순 샵인샵 가맹본부를 넘어 기술과 물류를 결합하는 상생 플랫폼을 지향합니다.</p>
        </div>

        {/* 3 Step Process Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((p, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/60 shadow-sm relative group hover:border-amber-400 transition-colors duration-300">
              <div className="w-12 h-12 bg-neutral-50 border border-neutral-200/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-neutral-900 transition-colors">
                {React.cloneElement(p.icon, { size: 22 })}
              </div>
              <span className="text-xs font-black text-amber-500 tracking-wider block mb-2">{p.step || "Phase 3"}</span>
              <h3 className="font-black text-lg sm:text-xl text-neutral-900 mb-3">{p.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-bold">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function StoresPreviewSection() {
  const previewStores = [
    { name: "서울 강남본점", type: "단독매장", region: "서울 강남구 역삼동", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&fit=crop" },
    { name: "부산 해운대점", type: "공동간판", region: "부산 해운대구 중동", img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=400&fit=crop" },
    { name: "홍대 입구점", type: "샵인샵", region: "서울 마포구 서교동", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&fit=crop" },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-neutral-100 relative overflow-hidden">
       {/* Background Map Graphic Placeholder */}
       <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none hidden lg:block">
         <svg width="800" height="800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
       </div>
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center lg:items-end mb-16 gap-6 text-center md:text-left">
             <div>
                <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Active Franchise</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">전국 가맹 매장 현황</h2>
                <p className="text-amber-500 font-bold text-base sm:text-lg">성공 노하우를 공유하며 함께 궤도에 오른 점주분들을 확인해 보세요</p>
             </div>
             <Link to="/stores" className="px-6 py-3.5 border-2 border-amber-400 text-amber-500 font-bold rounded-lg hover:bg-amber-400 hover:text-neutral-900 transition-colors shadow-sm text-sm shrink-0">
                전체 가맹점 상세 보기 &rarr;
              </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {previewStores.map((store, i) => (
                <div key={i} className="bg-neutral-50 border border-neutral-200/60 rounded-3xl overflow-hidden hover:border-amber-400 hover:shadow-md transition-all group flex flex-col">
                   <div className="h-44 overflow-hidden relative">
                     <img src={store.img} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute top-4 right-4 bg-amber-400 text-neutral-900 text-[10px] font-black px-3 py-1 rounded shadow-sm">{store.type}</div>
                   </div>
                   <div className="p-6">
                      <div className="font-black text-xl text-neutral-900 group-hover:text-amber-600 transition-colors mb-2">{store.name}</div>
                      <div className="text-neutral-500 font-bold text-xs sm:text-sm flex items-center gap-2">
                        <MapPin size={16} className="text-neutral-400" />
                        {store.region}
                      </div>
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
    <section className="py-20 md:py-28 bg-white border-t border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 rounded-[3rem] p-6 sm:p-10 lg:p-16 border border-neutral-200 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative">
          <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-amber-400/5 to-transparent pointer-events-none rounded-[3rem]"></div>
          
          <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
             <span className="text-amber-500 font-black tracking-widest text-xs sm:text-sm mb-4 block uppercase flex items-center justify-center lg:justify-start gap-2">
               <ArrowUpRight size={16} /> Partner Support
             </span>
             <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-neutral-900 leading-tight">가맹점주는 장사에만<br/>집중할 수 있도록</h2>
             <p className="text-sm sm:text-base md:text-lg text-neutral-500 mb-6 font-bold leading-relaxed">발주, CS, 캐릭터 홍보물 요청까지. 점주가 오직 매장 관리에만 전념할 수 있도록 다이렉트 모바일 통합 가맹점 관리 솔루션을 무상 지원합니다.</p>
             
             {/* Integrated 3 Support Items */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 mt-8">
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col items-center lg:items-start gap-2">
                   <div className="bg-amber-100 text-amber-600 p-2.5 rounded-xl w-fit"><Package size={20} /></div>
                   <h4 className="font-bold text-neutral-900 text-sm">주문 시스템</h4>
                   <p className="text-[11px] text-neutral-500 leading-relaxed font-bold">본사 원클릭 물류 발주</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col items-center lg:items-start gap-2">
                   <div className="bg-amber-100 text-amber-600 p-2.5 rounded-xl w-fit"><Headphones size={20} /></div>
                   <h4 className="font-bold text-neutral-900 text-sm">1:1 메신저</h4>
                   <p className="text-[11px] text-neutral-500 leading-relaxed font-bold">실시간 물류·매장 케어</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col items-center lg:items-start gap-2">
                   <div className="bg-amber-100 text-amber-600 p-2.5 rounded-xl w-fit"><Monitor size={20} /></div>
                   <h4 className="font-bold text-neutral-900 text-sm">자료 및 마케팅</h4>
                   <p className="text-[11px] text-neutral-500 leading-relaxed font-bold">캐릭터 POP/디자인 매뉴얼</p>
                </div>
             </div>

             <div className="flex justify-center lg:justify-start">
                <Link to="/portal" className="px-8 py-4 bg-neutral-900 text-white font-black rounded-lg flex items-center hover:bg-black transition-colors shadow-sm text-sm">
                   점주 전용 포털 바로가기 &rarr;
                </Link>
             </div>
          </div>
          <div className="w-full lg:w-1/2 relative z-10">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="점주관리대시보드" className="rounded-3xl border border-neutral-200 shadow-xl w-full" />
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
     { id: 1, cat: "메뉴", url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&h=400&fit=crop", title: "120파이 초콜릿/고기 토핑" },
     { id: 2, cat: "매장", url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&h=400&fit=crop", title: "120pie&coffee 강남본점 전면" },
     { id: 3, cat: "메뉴", url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&h=400&fit=crop", title: "에그120 계란빵 쌀반죽 단면" },
     { id: 4, cat: "박람회", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&h=400&fit=crop", title: "프랜차이즈 창업 박람회 성황" },
     { id: 5, cat: "기타", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&h=400&fit=crop", title: "본사 상생 협동조합 사무실" },
     { id: 6, cat: "매장", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&h=400&fit=crop", title: "기존 샵인샵 도입 완료 윈도우" }
   ];

   const filteredImages = filter === "전체" ? images : images.filter(img => img.cat === filter);

   return (
     <section className="py-20 md:py-28 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <span className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm mb-4 block uppercase">Visual Gallery</span>
             <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">120pie&coffee 현장 갤러리</h2>
             <p className="text-sm sm:text-lg text-neutral-500 font-bold">오프라인 매장, 갓 구워낸 맛있는 푸드, 활발한 창업 박람회 현장을 실물로 확인하세요</p>
           </div>

           <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-12">
              {tabs.map(t => (
                 <button 
                   key={t}
                   onClick={() => setFilter(t)}
                   className={cn("px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all", filter === t ? "bg-amber-400 text-neutral-900 shadow-sm" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900")}
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
                     initial={{ opacity: 0, scale: 0.9 }} 
                     animate={{ opacity: 1, scale: 1 }} 
                     exit={{ opacity: 0, scale: 0.9 }} 
                     key={img.id} 
                     className="aspect-square bg-neutral-100 rounded-3xl overflow-hidden group border border-neutral-200 shadow-sm relative"
                   >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 flex flex-col justify-end">
                         <span className="text-amber-400 text-[10px] font-black uppercase tracking-wider mb-1">{img.cat}</span>
                         <h4 className="text-white font-bold text-xs sm:text-sm">{img.title}</h4>
                      </div>
                   </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
        </div>
     </section>
   )
}

function FAQSection() {
  const faqs = [
    { q: "기존 카페에도 바로 도입할 수 있나요?", a: "네, 최소한의 쇼케이스 공간과 주방 공간만 있다면 샵인샵 형태로 120pie&coffee의 주요 메뉴를 쉽게 추가할 수 있습니다." },
    { q: "조리 과정이 복잡하지 않나요?", a: "초보 아르바이트생도 1시간 교육이면 바로 구워낼 수 있는 완벽한 반제품 형태로 제공됩니다. 전용 오븐기의 타이머만 맞추면 됩니다." },
    { q: "초기 도입 자본이 많이 들까요?", a: "기존 냉동고를 활용하고 최소한의 핵심 장비만 추가하면 되기 때문에 수백만 원 대의 가벼운 비용으로 시작할 수 있습니다." },
    { q: "120겹파이만 먼저 단독으로 도입할 수 있나요?", a: "네, 기본이자 핵심 모델인 120겹파이만 먼저 단독 도입하여 시장성을 검증한 후, 에그120 등 다른 라인업으로 확장하실 수 있습니다." },
    { q: "공동간판은 필수인가요? 그리고 기존 매장명을 유지할 수 있나요?", a: "공동간판은 필수가 아니지만 본사가 가장 추천하는 협업 방식입니다. 기존 매장명은 그대로 유지하면서 'OO카페 & 120pie&coffee' 형태로 간판을 공유해 브랜드 파워를 극대화할 수 있습니다." },
    { q: "단독 매장 전환은 어떤 경우에 가능한가요?", a: "샵인샵이나 공동간판 도입 후 매출 성과와 브랜드 반응이 충분히 검증되어 120pie&coffee 단독 매장으로 완전히 전환하고 싶으실 때, 본사의 리모델링 지원을 통해 리브랜딩 전환을 돕습니다." },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-neutral-50 border-t border-neutral-200 scroll-mt-16">
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900">자주 묻는 질문</h2>
          </div>
          <div className="space-y-4">
             {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <button 
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left font-bold text-neutral-900 flex justify-between items-center hover:bg-neutral-50 transition-colors"
                  >
                    <span className="text-base sm:text-lg pr-4">{faq.q}</span>
                    <ChevronDown size={22} className={cn("text-amber-500 transition-transform duration-300 shrink-0", openIdx === i ? "rotate-180" : "")} />
                  </button>
                  <AnimatePresence>
                     {openIdx === i && (
                       <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                         <div className="px-6 sm:px-8 py-5 sm:py-6 pt-0 text-neutral-600 font-bold leading-relaxed text-xs sm:text-sm border-t border-neutral-50">
                           {faq.a}
                         </div>
                       </motion.div>
                     )}
                  </AnimatePresence>
                </div>
             ))}
          </div>
          <div className="mt-12 text-center">
             <Link to="/inquiry" className="inline-flex py-4 px-8 items-center bg-neutral-900 text-white font-black rounded-lg hover:scale-103 hover:bg-black transition-all shadow-md text-sm">더 궁금한 점 메신저 문의 <ArrowRight size={16} className="ml-2" /></Link>
          </div>
       </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="py-16 bg-amber-400 text-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y-0 divide-x-0 md:divide-x divide-neutral-950/20">
           <div className="py-4 md:py-0 px-4">
              <div className="text-4xl sm:text-5xl font-black mb-1.5"><AnimatedNumber value={8} /><span className="text-2xl font-bold ml-1">종</span></div>
              <div className="text-xs sm:text-sm font-bold opacity-80">모듈형 대표 아이템</div>
           </div>
           <div className="py-4 md:py-0 px-4">
              <div className="text-4xl sm:text-5xl font-black mb-1.5"><AnimatedNumber value={120} /><span className="text-2xl font-bold ml-1">겹</span></div>
              <div className="text-xs sm:text-sm font-bold opacity-80">압도적 파이 기술력</div>
           </div>
           <div className="py-4 md:py-0 px-4">
              <div className="text-4xl sm:text-5xl font-black mb-1.5"><AnimatedNumber value={4} /><span className="text-2xl font-bold ml-1">단계</span></div>
              <div className="text-xs sm:text-sm font-bold opacity-80">브랜드 확장 시스템</div>
           </div>
           <div className="py-4 md:py-0 px-4">
              <div className="text-4xl sm:text-5xl font-black mb-1.5"><AnimatedNumber value={300} /><span className="text-2xl font-bold ml-1">%</span></div>
              <div className="text-xs sm:text-sm font-bold opacity-80">최고 매출 증대율</div>
           </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 bg-amber-400 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-neutral-950/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-neutral-950 tracking-tight mb-6 leading-tight">
               메뉴 하나만 바꿨을 뿐인데,<br />가맹점 전체의 간판이 바뀝니다
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-neutral-950 font-bold opacity-85">
               지금 바로 우리 매장에 최적화된 도입 견적과 솔루션을 받아보세요.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-neutral-950 rounded-[2rem] p-8 sm:p-10 shadow-2xl text-center flex flex-col justify-between items-center group cursor-pointer border border-neutral-950 hover:scale-[1.01] transition-transform">
               <div>
                 <h3 className="text-2xl sm:text-3xl font-black text-amber-400 mb-3">도입 간편 문의</h3>
                 <p className="text-neutral-400 mb-8 text-xs sm:text-sm font-bold leading-relaxed">기존 매장 집기 그대로, 메뉴만 추가하는 실속형 샵인샵 도입 견적</p>
               </div>
               <Link to="/inquiry" className="w-full py-4.5 bg-amber-400 text-neutral-950 font-black text-base rounded-xl flex items-center justify-center shadow-md hover:bg-amber-300">
                  실시간 상담 신청 <ArrowRight className="ml-2" size={18} />
               </Link>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl text-center flex flex-col justify-between items-center group cursor-pointer border border-neutral-200 hover:scale-[1.01] transition-transform">
               <div>
                 <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 mb-3">공동간판 / 리브랜딩</h3>
                 <p className="text-neutral-600 mb-8 text-xs sm:text-sm font-bold leading-relaxed">매장 브랜드 리디자인 및 마스터 브랜드 제휴 컨설팅 견적</p>
               </div>
               <Link to="/inquiry" className="w-full py-4.5 bg-neutral-950 text-white font-black text-base rounded-xl flex items-center justify-center shadow-md hover:bg-black">
                  실시간 상담 신청 <ArrowRight className="ml-2" size={18} />
               </Link>
            </div>
         </div>
      </div>
    </section>
  )
}

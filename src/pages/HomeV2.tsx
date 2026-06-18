import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  TrendingUp, 
  Store, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  HelpCircle, 
  Award, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import "./HomeV2.css"; // Kept empty for build integrity

export default function HomeV2() {
  // 수익성 시뮬레이션 상태 변수
  const [quantity, setQuantity] = useState<number>(20);
  const [price, setPrice] = useState<number>(4500);
  const [days, setDays] = useState<number>(26);

  // 실시간 계산 결과
  const monthlySales = quantity * price * days;
  const monthlyQuantity = quantity * days;

  // 모션 페이드인 애니메이션 프리셋 (B&W 에디토리얼에 걸맞은 차분한 디렉티브)
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55 }
  };

  return (
    <div className="flex flex-col w-full bg-white text-neutral-900 scroll-smooth overflow-x-hidden font-sans antialiased">
      
      {/* HEADER (Sticky Minimal Tri-Tone) */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/95 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[78px] gap-4">
          <Link className="flex items-center gap-3 font-black text-xl tracking-tight text-white group" to="/v2" aria-label="120pie 홈으로 이동">
            <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-400 text-neutral-950 font-black text-base shadow-[0_4px_12px_rgba(251,191,36,0.3)] group-hover:scale-105 transition-transform">
              120
            </span>
            <span className="font-extrabold tracking-tight">120pie &amp; coffee</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-neutral-400">
            <a href="#why" className="hover:text-amber-400 transition-colors">도입 가치</a>
            <a href="#simulator" className="hover:text-amber-400 transition-colors">수익 계산</a>
            <a href="#proof" className="hover:text-amber-400 transition-colors">검증 근거</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <a className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs sm:text-sm font-bold text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors" href="#simulator">
              수익 계산하기
            </a>
            <Link className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-amber-400 text-neutral-950 text-xs sm:text-sm font-black hover:bg-amber-300 hover:scale-[1.02] transition-all shadow-[0_4px_16px_rgba(251,191,36,0.2)]" to="/inquiry">
              무료 도입 상담 <ArrowRight size={14} className="ml-1.5 shrink-0" />
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main id="top" className="relative">

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION [RICH BLACK & GOLDEN YELLOW - HIGH IMPACT] */}
        {/* ------------------------------------------------------------- */}
        <section className="relative py-20 md:py-28 bg-neutral-950 text-white overflow-hidden border-b border-neutral-900">
          
          {/* Tonal gold ambient glow background lights */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none z-0"></div>
          <div className="absolute bottom-0 left-[10%] w-[380px] h-[380px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Copy Panel */}
              <motion.div 
                className="lg:col-span-7 flex flex-col gap-6"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div>
                  <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-400 mb-2 backdrop-blur-sm shadow-[0_0_15px_rgba(251,191,36,0.15)]">
                    <Sparkles size={14} className="mr-2" /> 소상공인 카페 회생 하이브리드 솔루션
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white">
                  간판은 그대로,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                    디저트 매출은 새로.
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-neutral-400 font-medium leading-relaxed max-w-xl">
                  기존 간판과 상호명은 고스란히 보존하고, 검증된 120겹 파이와 에그120 콘텐츠를 입지에 맞춰 장착하여 동네 상권의 객단가 한계를 뛰어넘습니다.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
                  <Link className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-amber-400 text-neutral-950 font-black rounded-xl hover:bg-amber-300 transition-all shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:scale-[1.02]" to="/inquiry">
                    무료 도입 상담 받기 <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <a className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-neutral-900 border border-neutral-800 text-white font-extrabold rounded-xl hover:bg-neutral-800 transition-colors" href="#simulator">
                    내 매장 수익 계산
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-2.5 mt-2">
                  <span className="px-3.5 py-1.5 rounded-full border border-neutral-850 bg-neutral-900/60 text-xs font-bold text-neutral-300">#샵인샵 가능</span>
                  <span className="px-3.5 py-1.5 rounded-full border border-neutral-850 bg-neutral-900/60 text-xs font-bold text-neutral-300">#5분 내외 조리</span>
                  <span className="px-3.5 py-1.5 rounded-full border border-neutral-850 bg-neutral-900/60 text-xs font-bold text-neutral-300">#냉동보관</span>
                  <span className="px-3.5 py-1.5 rounded-full border border-neutral-850 bg-neutral-900/60 text-xs font-bold text-neutral-300">#홀·포장·배달 대응</span>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-neutral-900 pt-8 mt-6">
                  <div className="bg-neutral-900/40 border border-neutral-850 p-4 rounded-xl flex flex-col justify-center text-center">
                    <strong className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">5분</strong>
                    <span className="text-[10px] sm:text-xs text-neutral-500 font-bold">내외 초간편 제조</span>
                  </div>
                  <div className="bg-neutral-900/40 border border-neutral-850 p-4 rounded-xl flex flex-col justify-center text-center">
                    <strong className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">287+</strong>
                    <span className="text-[10px] sm:text-xs text-neutral-500 font-bold">전국 취급점 경험</span>
                  </div>
                  <div className="bg-neutral-900/40 border border-neutral-850 p-4 rounded-xl flex flex-col justify-center text-center">
                    <strong className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">3WAY</strong>
                    <span className="text-[10px] sm:text-xs text-neutral-500 font-bold">전방위 판매 채널</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Visual Image (Glassmorphic Card & Crisp Dough) */}
              <motion.div 
                className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden relative min-h-[500px] flex items-end shadow-2xl group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=82" 
                  alt="120겹 파이 클로즈업" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-103 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent"></div>
                
                {/* Frosted Glassmorphism card overlay */}
                <div className="relative z-10 p-6 m-6 bg-neutral-900/80 border border-neutral-800 rounded-2xl backdrop-blur-md shadow-xl">
                  <h3 className="text-lg font-black text-amber-400 mb-1.5 flex items-center gap-2">
                    <Award size={18} /> 시그니처 120겹 파이 모듈
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed mb-3">
                    발효 및 성형 공정이 끝난 생지를 전용 기구에 굽기만 하면 갓 오븐에서 나온 크리스피한 풍미를 선사합니다.
                  </p>
                  <span className="inline-flex px-3 py-1 rounded bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider">
                    Signature core
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* PAIN POINTS SECTION [PURE WHITE THEME - CLEAR TROUBLES] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-white border-b border-neutral-100" id="pain-points">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Troubles Cards Grid */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <motion.div className="max-w-xl mb-12" {...fadeIn}>
                  <span className="text-neutral-500 font-bold tracking-widest text-xs uppercase mb-2 block">Real Troubles</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-black mb-4 tracking-tight leading-tight">
                    아무리 커피를 많이 팔아도 한계가 올 때,<br />
                    문제는 메뉴 가짓수가 아니라 <span className="text-amber-500 font-extrabold">매출 구조</span>입니다.
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 font-bold leading-relaxed">
                    상권 내 레드오션 커피 단가 싸움에서 벗어나, 추가적인 샵인샵 디저트 모듈을 통해 확실한 결제 객단가 리스크 방어선을 형성해야 합니다.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { no: "01", title: "음료 객단가의 벽", desc: "커피 한 잔당 단가가 쉽게 오르지 않고, 저가 체인 침투 시 마진 폭이 급격히 저하됩니다." },
                    { no: "02", title: "생물 디저트 폐기 스트레스", desc: "고객 입맛을 맞추려 다채롭게 준비할수록 선도 저하로 인한 폐기 비용이 매달 누적됩니다." },
                    { no: "03", title: "과도한 제빵 장비 및 고용", desc: "베이커리 전문을 표방하려 해도 주방 공간, 비싼 오븐 기계 셋업과 파티시에 급여 부담이 생깁니다." },
                    { no: "04", title: "출혈식 가격 경쟁", desc: "옆 골목에 저가 대형 커피 매장이 유입될 경우, 단가 방어 및 메뉴 차별점 없이는 생존이 위협받습니다." },
                    { no: "05", title: "배달 리스트 내 평범함", desc: "배민 및 요기요 썸네일 리스트에서 눈길을 끄는 시그니처 빵 결합 세트 아이템이 부재합니다." },
                    { no: "06", title: "SNS 자발적 입소문 부재", desc: "고객들이 직접 사진 찍어 올리고 지인에게 태그할 만한 감각적 비주얼 굿즈 및 대표작이 필요합니다." }
                  ].map((p, idx) => (
                    <motion.div 
                      key={idx} 
                      className="bg-neutral-50 border border-neutral-100 p-6 rounded-xl hover:border-black hover:bg-white transition-all group"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                      <span className="w-8 h-8 rounded bg-neutral-900 text-white font-black text-xs flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all">
                        {p.no}
                      </span>
                      <h3 className="text-base font-black text-black mb-2">{p.title}</h3>
                      <p className="text-xs text-neutral-500 font-bold leading-relaxed">{p.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Monochromatic Barista Image Column */}
              <motion.div 
                className="lg:col-span-4 bg-neutral-50 border border-neutral-200 rounded-2xl overflow-hidden relative min-h-[400px] flex items-end shadow-inner"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" 
                  alt="분주하게 일하는 바리스타 에스프레소 추출" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 contrast-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="relative z-10 p-6 text-white text-xs font-bold leading-relaxed">
                  <span className="text-amber-400 uppercase tracking-widest text-[9px] block mb-1">barista desk</span>
                  "사장님이 음료 제조에 집중하는 동안, 디저트 가열에 들어갈 별도의 주방 작업 리소스는 단 1분 남짓에 불과합니다."
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* WHY SECTION [RICH BLACK THEME & DYNAMIC GOLD BENTO] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-neutral-950 text-white border-b border-neutral-900 relative" id="why">
          
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-3xl mb-16" {...fadeIn}>
              <span className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-2 block">Why 120pie</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                단순히 빵을 납품하는 것이 아닌,<br />
                강력한 <span className="text-amber-400">매장 이익 포트폴리오</span>를 공유합니다.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-bold leading-relaxed max-w-xl">
                120겹 파이와 에그120의 검증된 수익 공식이 사장님 매장 카운터 및 배달앱 내부에서 그대로 가동됩니다.
              </p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,_auto)]">
              
              {/* Bento Card 1: Value Core */}
              <motion.article 
                className="md:col-span-7 bg-neutral-900/60 border border-neutral-900 p-8 rounded-2xl flex flex-col justify-between hover:border-amber-400/50 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <span className="w-10 h-10 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-6 shadow-sm">📈</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3">자연스러운 세트 유도로 주문 결제액 상승</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed">
                    아메리카노 단독 결제율을 본사 특제 120파이 혹은 에그빵 세트 페어링 구성으로 손쉽게 전환시킵니다. 평균 단가를 보정하며 고효율 마진을 공유합니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-850 text-[10px] font-bold text-amber-400">세트 페어링 업셀링</span>
                  <span className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-850 text-[10px] font-bold text-amber-400">결제 객단가 증진</span>
                  <span className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-850 text-[10px] font-bold text-amber-400">매출 마진 극대화</span>
                </div>
              </motion.article>

              {/* Bento Card 2: Embedded Crisp Dough Image */}
              <motion.div 
                className="md:col-span-5 bg-neutral-900 border border-neutral-900 rounded-2xl overflow-hidden relative shadow-lg"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" 
                  alt="노릇노릇 바삭하게 굽는 생지 오븐" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
              </motion.div>

              {/* Bento Card 3: 샵인샵 */}
              <motion.article 
                className="md:col-span-4 bg-neutral-900/60 border border-neutral-900 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-400/50 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div>
                  <span className="w-8 h-8 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center font-bold text-sm mb-4">🏪</span>
                  <h3 className="text-base font-black text-white mb-2">간판 교체 없는 샵인샵 이식</h3>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                    철거비 마진 제로, 기존 인프라에 소형 쇼케이스 기물과 전용 로고 병기만으로 즉시 시작합니다.
                  </p>
                </div>
              </motion.article>

              {/* Bento Card 4: 초간편 조리 */}
              <motion.article 
                className="md:col-span-4 bg-neutral-900/60 border border-neutral-900 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-400/50 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div>
                  <span className="w-8 h-8 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center font-bold text-sm mb-4">⚡</span>
                  <h3 className="text-base font-black text-white mb-2">숙련자 불필요 5분 조리 매뉴얼</h3>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                    어려운 베이커리 솜씨가 필요 없이 특수 오븐 타이머 시스템에 넣기만 하면 제조가 완료됩니다.
                  </p>
                </div>
              </motion.article>

              {/* Bento Card 5: 폐기 없음 */}
              <motion.article 
                className="md:col-span-4 bg-neutral-900/60 border border-neutral-900 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-400/50 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <span className="w-8 h-8 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center font-bold text-sm mb-4">❄️</span>
                  <h3 className="text-base font-black text-white mb-2">상온 폐기 제고 부담 ZERO</h3>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                    공급 생지는 즉각 급냉 보존되어 당일 소진 못 할 잔여 생지를 통째 폐기할 필요가 없습니다.
                  </p>
                </div>
              </motion.article>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR SECTION [SAND YELLOW THEME - INTIMATE FOCUS] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-amber-50/50 border-b border-amber-100" id="simulator">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-3xl mb-16" {...fadeIn}>
              <span className="text-amber-700 font-bold tracking-widest text-xs uppercase mb-2 block">Interactive Calculator</span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-4 tracking-tight leading-tight">
                하루에 단 몇 개만 구워 판매해도,<br />
                월간 누적 <span className="text-amber-600">추가 마진</span>이 바로 계산됩니다.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-bold leading-relaxed max-w-xl">
                사장님의 일일 판매량 목표, 판매 단가, 영업일을 조작하여 실시간 마진 시뮬레이션을 즉석에서 파악해 보세요.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Input panel (B&W Minimal Form on Warm Sand BG) */}
              <div className="lg:col-span-5 bg-white border border-amber-100 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-lg font-black text-neutral-900 mb-2">시뮬레이션 조건 입력</h3>
                  <p className="text-xs text-neutral-500 font-bold leading-relaxed mb-6">
                    매장 상황에 알맞은 보수적인 수치를 대입하여 추가적인 매출 여력을 타진할 수 있습니다.
                  </p>

                  <div className="grid gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-neutral-600 flex justify-between">
                        <span>하루 예상 판매 수량</span>
                        <span className="text-neutral-900 font-extrabold">{quantity} 개</span>
                      </label>
                      <input 
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full accent-neutral-950 bg-neutral-100 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-neutral-600 flex justify-between">
                        <span>평균 판매 단가</span>
                        <span className="text-neutral-900 font-extrabold">{price.toLocaleString()} 원</span>
                      </label>
                      <input 
                        type="range"
                        min="3000"
                        max="7000"
                        step="500"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full accent-neutral-950 bg-neutral-100 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-neutral-600 flex justify-between">
                        <span>월 영업일 기준</span>
                        <span className="text-neutral-900 font-extrabold">{days} 일</span>
                      </label>
                      <input 
                        type="range"
                        min="15"
                        max="31"
                        step="1"
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="w-full accent-neutral-950 bg-neutral-100 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <Link className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-neutral-950 text-white font-black text-xs rounded-lg hover:bg-neutral-800 transition-colors shadow-sm" to="/inquiry">
                    맞춤 시뮬레이션 상세 상담받기
                  </Link>
                </div>
              </div>

              {/* Right Output & Plating Image (High Contrast Deep Gold Card) */}
              <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
                
                {/* Result Dash (Deep Gold Card with Dark Text) */}
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-neutral-950 p-8 rounded-2xl shadow-lg shadow-amber-400/10 flex flex-col justify-between min-h-[160px]">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900/60 block mb-1">
                      Expected Monthly Added Sales
                    </span>
                    <h3 className="text-sm font-black text-neutral-900/80 mb-4">
                      월간 예상 추가 매출액
                    </h3>
                  </div>
                  <div>
                    <strong className="text-3xl sm:text-4xl font-black tracking-tight block mb-2 leading-none">
                      {monthlySales.toLocaleString()} 원
                    </strong>
                    <p className="text-[11px] font-bold text-neutral-900/70">
                      하루 {quantity}개 × 평균 단가 {price.toLocaleString()}원 × 월 {days}일 기준
                    </p>
                  </div>
                </div>

                {/* Split layout (Plating Image & Metric KPIs) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                  <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden relative min-h-[180px]">
                    <img 
                      src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80" 
                      alt="에그120 브런치 연출 샷" 
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent"></div>
                    <span className="absolute bottom-4 left-4 text-white text-[11px] font-bold">에그120 쌀계란빵</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 justify-between">
                    <div className="bg-white border border-amber-100 p-5 rounded-2xl shadow-sm">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Monthly Quantity</span>
                      <strong className="text-xl font-black text-neutral-900 block mb-0.5">{monthlyQuantity.toLocaleString()} 개</strong>
                      <span className="text-[10px] text-neutral-500 font-bold leading-none">월간 예상 파이 제조 개수</span>
                    </div>

                    <div className="bg-white border border-amber-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Expected Margin</span>
                        <strong className="text-base font-black text-amber-600 block">상담 시 개별 공개</strong>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-bold mt-2 leading-none">원자재 수급 및 렌탈료 상세 대입</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* BEFORE AFTER SECTION [PURE WHITE THEME - CONTRAST COMPARE] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-white border-b border-neutral-100" id="before-after">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-3xl mb-16" {...fadeIn}>
              <span className="text-neutral-500 font-bold tracking-widest text-xs uppercase mb-2 block">Contrast Compare</span>
              <h2 className="text-3xl sm:text-4xl font-black text-black mb-4 tracking-tight leading-tight">
                단순히 메뉴 가짓수를 채우지 않고,<br />
                매장의 <span className="text-amber-500 font-extrabold">생존 마진 구조</span>를 완전히 개조합니다.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Before Column (Monochrome Grey Coffee Image) */}
              <motion.article 
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 justify-between hover:border-black transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3.5 py-1 rounded bg-neutral-200 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                      Before
                    </span>
                    <span className="text-neutral-450 font-black text-lg">기존 음료 중심 매장</span>
                  </div>
                  <h3 className="text-xl font-black text-neutral-800 mb-6 leading-tight">객단가 정체와 소모적 단가 한계</h3>
                  
                  <div className="space-y-3.5 mb-6 text-xs sm:text-sm text-neutral-500 font-bold leading-relaxed">
                    <div className="flex gap-2"><span>•</span><p>커피 단독 주문 비중이 비정상적으로 높아 테이블 회전당 매출이 정체됩니다.</p></div>
                    <div className="flex gap-2"><span>•</span><p>생물 디저트 쇼케이스 선도 및 주기적 수요 예측 실패로 유효기간 폐기비가 납니다.</p></div>
                    <div className="flex gap-2"><span>•</span><p>배달앱 리스트에서 평범한 음료 조합 외에 배민 고객 시선을 끌 시그니처가 부재합니다.</p></div>
                  </div>
                </div>

                <div className="h-44 rounded-xl overflow-hidden relative border border-neutral-200 bg-neutral-100">
                  <img 
                    src="https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?auto=format&fit=crop&w=600&q=80" 
                    alt="외로운 심플 커피 잔 흑백 이미지" 
                    className="w-full h-full object-cover grayscale opacity-80" 
                  />
                </div>
              </motion.article>

              {/* After Column (Rich Gold-Accented Brunch Table Image) */}
              <motion.article 
                className="bg-neutral-950 text-white border-2 border-amber-400 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 justify-between shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3.5 py-1 rounded bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-widest">
                      After
                    </span>
                    <span className="text-amber-400 font-black text-lg">120pie 결합 하이브리드 매장</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-6 leading-tight">파이 세트 결합으로 매장 매출 다각화 실현</h3>
                  
                  <div className="space-y-3.5 mb-6 text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
                    <div className="flex gap-3 items-start"><CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" /><p>파이 결합 페어링 메뉴를 통해 1인 결제 주문 객단가를 확실히 상승시킵니다.</p></div>
                    <div className="flex gap-3 items-start"><CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" /><p>냉동 생지를 통한 실시간 주문 즉시 조리로 상온 재고 폐기비 지출이 0원에 수렴합니다.</p></div>
                    <div className="flex gap-3 items-start"><CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" /><p>대표 캐릭터 그래픽 패키징 및 고결 파이 비주얼로 배달 주문 및 자발적 SNS 바이럴을 촉진합니다.</p></div>
                  </div>
                </div>

                <div className="h-44 rounded-xl overflow-hidden relative border border-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" 
                    alt="풍성하고 고급스러운 브런치 다이닝 컷" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </motion.article>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* PROCESS SECTION [RICH BLACK THEME - CRYSPY PROCESS] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-neutral-950 text-white border-b border-neutral-900 relative" id="process">
          
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: 3 Steps Process */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <motion.div className="max-w-xl mb-12" {...fadeIn}>
                  <span className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-2 block">Simple Operation</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                    숙련된 경력이 전혀 없어도,<br />
                    표준화된 시스템으로 <span className="text-amber-400">5분 조리 완성</span>
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 gap-6">
                  {[
                    { step: "01", title: "급속 냉동 생지 물류 보관", desc: "본사 신선 콜드체인 물류망을 통해 급냉 처리된 고결 파이 생지를 냉동고에 보관하여 보존성을 올립니다." },
                    { step: "02", title: "전용 머신 세팅 및 가열", desc: "주문 알림 유입 즉시 해동 생지를 오븐 기구에 넣고 세팅된 자동 타이머 전원만을 가동합니다." },
                    { step: "03", title: "패킹 포장 및 손님 제공", desc: "5분 내외에 크리스피한 질감과 풍미를 내는 파이가 탄생하여, 전용 마크 패키징에 담겨 바로 서빙됩니다." }
                  ].map((p, idx) => (
                    <motion.div 
                      key={idx} 
                      className="bg-neutral-900/60 border border-neutral-900 p-6 rounded-xl flex items-start gap-4.5 hover:border-amber-400/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.05 }}
                    >
                      <span className="w-9 h-9 rounded bg-amber-400 text-neutral-950 font-black text-sm flex items-center justify-center shrink-0">
                        {p.step}
                      </span>
                      <div>
                        <h3 className="text-base font-black text-white mb-1">{p.title}</h3>
                        <p className="text-xs text-neutral-400 font-medium leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Close-up Food Baking Process Image */}
              <motion.div 
                className="lg:col-span-4 bg-neutral-900 border border-neutral-900 rounded-2xl overflow-hidden relative min-h-[380px] flex items-end shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" 
                  alt="바삭한 크리스피 반죽 베이킹 과정 이미지" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 contrast-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
                <div className="relative z-10 p-6 text-white text-xs font-bold leading-relaxed">
                  <span className="text-amber-400 uppercase tracking-widest text-[9px] block mb-1">baking technology</span>
                  "반죽 발효 대기 시간 없이, 본사의 물류 생지 설계로 파티시에의 오리지널 풍미를 즉석 연출합니다."
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* COMPARISON TABLES [PURE WHITE THEME - DUST ACCENT] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-white border-b border-neutral-100" id="comparison">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-3xl mb-16" {...fadeIn}>
              <span className="text-neutral-500 font-bold tracking-widest text-xs uppercase mb-2 block">Logical Analysis</span>
              <h2 className="text-3xl sm:text-4xl font-black text-black mb-4 tracking-tight leading-tight">
                일반 디저트의 단순 도입과는<br />
                기반부터 다른 <span className="text-amber-500 font-extrabold">운영 효율 격차</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Table 1 */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                  <Award size={18} className="text-black" /> 폐기 부담 및 관리 효율성 비교
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-250">
                        <th className="py-3 px-2 font-bold text-neutral-400 uppercase">구분</th>
                        <th className="py-3 px-2 font-bold text-neutral-500">일반 디저트</th>
                        <th className="py-3 px-2 font-black text-amber-600 bg-amber-500/5">120pie &amp; coffee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      <tr>
                        <td className="py-4 px-2 font-bold text-neutral-700">유통 및 보관</td>
                        <td className="py-4 px-2 text-neutral-500">상온/냉장 당일 소비 부담</td>
                        <td className="py-4 px-2 text-black font-semibold bg-amber-500/10">장기 수급 가능 냉동 보존</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-neutral-700">생산 시점</td>
                        <td className="py-4 px-2 text-neutral-500">사전 대량 해동 쇼케이스 진열</td>
                        <td className="py-4 px-2 text-black font-semibold bg-amber-500/10">주문 유입 즉시 즉석 가열</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-neutral-700">폐기 손실도</td>
                        <td className="py-4 px-2 text-neutral-500">예측 불발 시 고스란히 손실</td>
                        <td className="py-4 px-2 text-black font-semibold bg-amber-500/10">소진 비율 연동으로 0%대</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-neutral-700">선도 체크도</td>
                        <td className="py-4 px-2 text-neutral-500">매일 진열함 내부 청소 및 폐기</td>
                        <td className="py-4 px-2 text-black font-semibold bg-amber-500/10">원재료 봉지 단위 냉동고 수납</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2 */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-black" /> 가맹 도입 경쟁력 사양
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-250">
                        <th className="py-3 px-2 font-bold text-neutral-400 uppercase">비교 사양</th>
                        <th className="py-3 px-2 font-bold text-neutral-500">타 디저트 이식</th>
                        <th className="py-3 px-2 font-black text-amber-600 bg-amber-500/5">120pie &amp; coffee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      <tr>
                        <td className="py-4 px-2 font-bold text-neutral-700">도입 본질</td>
                        <td className="py-4 px-2 text-neutral-500">구색용 메뉴 추가</td>
                        <td className="py-4 px-2 text-black font-semibold bg-amber-500/10">매장 결제 마진 구조 개조</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-neutral-700">조리 가용성</td>
                        <td className="py-4 px-2 text-neutral-500">외부 완제품 유통 공급</td>
                        <td className="py-4 px-2 text-black font-semibold bg-amber-500/10">갓 구운 신선 베이킹 완성</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-neutral-700">독점 브랜드 가치</td>
                        <td className="py-4 px-2 text-neutral-500">어디서나 납품받는 평이함</td>
                        <td className="py-4 px-2 text-black font-semibold bg-amber-500/10">특허 120겹 생지 및 에그120</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-neutral-700">유통 루트 지원</td>
                        <td className="py-4 px-2 text-neutral-500">단독 홀 판매 의존</td>
                        <td className="py-4 px-2 text-black font-semibold bg-amber-500/10">홀 · 포장 · 배달의 삼위일체</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* PROOF SECTION [RICH BLACK THEME - GOLD SCENE] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-neutral-950 text-white border-b border-neutral-900 relative" id="proof">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-3xl mb-16" {...fadeIn}>
              <span className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-2 block">Market Proofs</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                주장으로 채운 카피보다,<br />
                현장에서 <span className="text-amber-400">숫자</span>로 증명된 안도감.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { count: "287+", title: "전국 입증 매장", desc: "오피스/주거/대학가 등 전국 다변화 상권 287개 지점에서 실매출 성장 데이터를 확보했습니다." },
                { count: "박람회", title: "시식 대성황 완료", desc: "창업/식음료 박람회 현장에서 까다로운 업계 사장님들이 직접 맛을 보고 우수성을 극찬했습니다." },
                { count: "SNS", title: "피드 업로드 물결", desc: "특색 있는 120pie 캐릭터 봉투와 파이의 고퀄리티 단면 비주얼이 고객의 자발적 노출을 유도합니다." },
                { count: "CASE", title: "유형별 데이터베이스", desc: "소규모 개인점 개선부터 대형 프랜차이즈 사이드 업셀링까지 모든 운영 사례를 문서화했습니다." }
              ].map((s, idx) => (
                <motion.article 
                  key={idx} 
                  className="bg-neutral-900/60 border border-neutral-900 p-6 rounded-xl hover:border-amber-400/50 transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <strong className="text-3xl font-black text-amber-400 mb-2 block">{s.count}</strong>
                  <h4 className="text-base font-black text-white mb-2">{s.title}</h4>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed">{s.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* TARGET CASES SECTION [PURE WHITE THEME - SHOP FRONTS] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-white border-b border-neutral-100" id="cases">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: Image of Modern Cafe Exterior */}
              <motion.div 
                className="lg:col-span-4 bg-neutral-50 border border-neutral-200 rounded-2xl overflow-hidden relative min-h-[350px] flex items-end shadow-inner"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
                  alt="모던 매장 전경" 
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-105 opacity-95" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="relative z-10 p-6 text-white text-xs font-bold leading-relaxed">
                  <span className="text-amber-400 uppercase tracking-widest text-[9px] block mb-1">modular system</span>
                  "현재 기가 및 상대적 인프라에 속박되지 않고 사장님에 가장 이익 높은 셋업을 지원합니다."
                </div>
              </motion.div>

              {/* Right Column: Case description cards */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <motion.div className="max-w-xl mb-10" {...fadeIn}>
                  <span className="text-neutral-500 font-bold tracking-widest text-xs uppercase mb-2 block">Target Cases</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-black mb-4 tracking-tight leading-tight">
                    사장님의 매장 유형에 맞춰,<br />
                    가장 <span className="text-amber-500 font-extrabold">효율성 높은 모듈</span>을 이식합니다.
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { case: "CASE 1", title: "개인 동네 카페", desc: "음료 가짓수는 충분히 갖추었으나, 사이드 매출 견인 롤이 전무해 테이블당 회전 마진이 정체된 사장님." },
                    { case: "CASE 2", title: "테이크아웃 프랜차이즈", desc: "아메리카노 단독 판매 비율이 비정상적으로 높아 마진 방어 및 페어링 객단가가 절대적으로 필요한 사장님." },
                    { case: "CASE 3", title: "배달 전문 샵인샵", desc: "리스트 노출 대비 평점, 리뷰 및 건당 주문 총액을 상승시켜 고정 배달 료를 헤징하려는 매장." },
                    { case: "CASE 4", title: "소자본 신규 예비창업", desc: "초기 비싼 오븐 기계 셋업 없이 120pie의 정량화된 가판 캐릭터 부스만으로 가볍게 외식업을 영위할 점주님." }
                  ].map((c, idx) => (
                    <div key={idx} className="bg-neutral-50 border border-neutral-100 p-5 rounded-xl hover:border-black hover:bg-white transition-all">
                      <span className="text-[10px] font-black tracking-widest text-neutral-500 block mb-2">{c.case}</span>
                      <h3 className="text-base font-black text-black mb-1">{c.title}</h3>
                      <p className="text-xs text-neutral-500 font-bold leading-normal">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* TIMELINE SECTION [RICH BLACK THEME - GOLD ROADMAP] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-neutral-950 text-white border-b border-neutral-900 relative" id="timeline">
          
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: Timeline list */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <motion.div className="max-w-xl mb-12" {...fadeIn}>
                  <span className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-2 block">Simple Roadmap</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                    단 6단계의 순서로,<br />
                    내일부터 <span className="text-amber-400">추가 마진을 가동</span>하세요.
                  </h2>
                </motion.div>

                <div className="relative border-l border-neutral-800 ml-3 pl-6 space-y-8">
                  {[
                    { step: "1", title: "온라인 상담 접수", desc: "기본 주소지 및 매장 평수, 일일 대략적인 커피 잔수를 남겨주시면 파악을 진행합니다." },
                    { step: "2", title: "매장 현황 진단", desc: "동네 상권, 대학가, 오피스 밀집 구역 등 최상의 이식 타겟을 구체화합니다." },
                    { step: "3", title: "마진 시뮬레이션 개별 오픈", desc: "보수적 목표량과 이에 따른 정확한 원가 물류 공급가 및 마진율 포트폴리오를 제공합니다." },
                    { step: "4", title: "가맹 체결 및 조리 실습", desc: "과한 인프라 투자 없이 간단한 입점 협약서 날인 후 5분 초간단 가이드 조리법을 전수합니다." },
                    { step: "5", title: "기구 셋업 및 원재료 수급", desc: "본사 콜드체인 물류망을 통해 소형 전용 머신 셋업 및 급냉 파이 생지 초도 물량을 하차합니다." },
                    { step: "6", title: "대망의 개시 및 매출 가동", desc: "카운터 앞 전용 워머 배치, 전용 캐릭터 포장지 세팅, 배달 플랫폼 등록 후 판매를 개시합니다." }
                  ].map((t, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[35px] top-1 w-5.5 h-5.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-black text-amber-400 flex items-center justify-center z-10">
                        {t.step}
                      </span>
                      <div>
                        <h3 className="text-base font-black text-white mb-1">{t.title}</h3>
                        <p className="text-xs text-neutral-400 font-medium leading-normal">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Kraft Packaging image */}
              <motion.div 
                className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden relative min-h-[400px] flex items-end shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" 
                  alt="브랜드 테이크아웃 포장 봉투" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 contrast-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
                <div className="relative z-10 p-6 text-white text-xs font-bold leading-relaxed">
                  <span className="text-amber-400 uppercase tracking-widest text-[9px] block mb-1">packaging identity</span>
                  "세련된 크라프트 크래프트 백과 120겹 파이 전용 패키징이 테이크아웃 고객들의 눈길을 사로잡습니다."
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SUPPORT / FAQ SECTION [PURE WHITE THEME] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-white border-b border-neutral-100" id="faq">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-3xl mb-16" {...fadeIn}>
              <span className="text-neutral-500 font-bold tracking-widest text-xs uppercase mb-2 block">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-black text-black mb-4 tracking-tight leading-tight">
                자주 물어보시는 사안들을<br />
                <span className="text-amber-500 font-extrabold">명확하게 답해</span>드립니다.
              </h2>
            </motion.div>

            <div className="space-y-4 max-w-4xl">
              {[
                { q: "기존 가맹 카페 상호나 간판을 떼야 하나요?", a: "아닙니다. 개인 매장의 브랜딩, 카페 간판과 주력 음료는 그대로 운용하시면서, 매대 한구석 소형 오븐 셋업 및 120pie 그래픽 마크 배치를 통해 병행 판매하는 형태이므로 상호/인테리어 훼손이 없습니다." },
                { q: "정말 조리 경험이 없는 아르바이트생도 파이를 굽나요?", a: "네. 본사 공급 파이 생지는 이미 120겹의 페이스트리 결이 발효 완성되어 출하되므로, 타이머가 장착된 전용 가열 기구 작동법(단 2분 교육) 수강만으로 오차 없는 구이 결과가 나옵니다." },
                { q: "배달앱 등 배달 샵인샵 영업으로도 매출 시너지가 날까요?", a: "기존 아메리카노 단독 주문 대비 120겹 파이 세트 메뉴를 배민 썸네일에 부착하여 건당 주문 총액이 극대화됩니다. 특히 츄러스, 에그120 등은 배달 마진에 최적화된 인기 스낵군입니다." },
                { q: "생지 보관성이나 상온 폐기 부담 처리는 어떤가요?", a: "모든 부자재는 고품질 급속냉동 상태로 하차되어 냉동고에 적치되며, 손님이 주문 결제하면 비로소 해동 후 가열하는 방식이므로 당일 판매량 예측 미스로 인한 상온 폐기비 스트레스가 일절 없습니다." }
              ].map((faq, idx) => (
                <details key={idx} className="faq-item group bg-neutral-50 border border-neutral-200 rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="font-bold text-black text-sm sm:text-base md:text-lg flex justify-between items-center cursor-pointer select-none">
                    <span className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-neutral-400 shrink-0" />
                      {faq.q}
                    </span>
                    <span className="text-black group-open:text-amber-500 text-xl font-bold group-open:rotate-45 transition-transform duration-300 shrink-0 ml-4">
                      +
                    </span>
                  </summary>
                  <div className="mt-4 text-xs sm:text-sm text-neutral-500 font-bold leading-relaxed border-t border-neutral-200 pt-4 pl-7">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* FINAL CTA SECTION [RICH BLACK & GOLD CORE] */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 bg-neutral-950 border-t border-neutral-900 relative" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-850 p-8 sm:p-14 rounded-3xl relative overflow-hidden flex flex-col items-center text-center">
              
              {/* Gold blur highlight inside the CTA box */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <span className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-4 block">Let's Partner</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight max-w-2xl">
                사장님의 소중한 매장에 120pie의<br />
                강력한 <span className="text-amber-400">매출 개선 엔진</span>을 장착하세요.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl mb-8 leading-relaxed">
                매장 주소지에 따른 세부 배달 상권 분석, 셋업 기구 크기 조율 및 마진 시뮬레이션을 본사 전담 서포트 프로페셔널 팀이 친절하게 제공합니다.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-10">
                <Link className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-amber-400 text-neutral-950 font-black rounded-lg hover:bg-amber-300 transition-all hover:scale-[1.02] shadow-[0_4px_20px_rgba(251,191,36,0.25)]" to="/inquiry">
                  무료 도입 상담 신청하기 <ArrowRight size={16} className="ml-2" />
                </Link>
                <a className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-neutral-900 border border-neutral-800 text-white font-extrabold rounded-lg hover:bg-neutral-800 transition-colors" href="#proof">
                  박람회 시식 정보 보기
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-neutral-500 font-bold">
          <span>© 2026 120pie &amp; coffee Landing Draft. All Rights Reserved.</span>
          <span>Tri-Tone Scoped Premium Landing Redesign</span>
        </div>
      </footer>

    </div>
  );
}

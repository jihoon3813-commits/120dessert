import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

export default function BrandIntro() {
  return (
    <div className="flex flex-col w-full bg-white">
      <SubVisualSection />
      <DefinitionSection />
      <BackgroundSection />
      <CoreValuesSection />
      <StructureSection />
      <GrowthModelSection />
      <WhyNowSection />
      <StoreChangeSection />
      <FinalCTASection />
    </div>
  );
}

function SubVisualSection() {
  return (
    <section className="relative py-24 md:py-32 bg-neutral-900 border-b border-neutral-800 overflow-hidden">
      <div className="absolute inset-0 bg-neutral-900/60 z-10"></div>
      <img src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=2070&auto=format&fit=crop" alt="Brand visual" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center text-white">
        <span className="text-amber-400 font-bold tracking-widest text-sm mb-4 block uppercase">120 Dessert Brand Story</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          120디저트는 즉석조리형 국민간식<br/>마스터브랜드입니다
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-neutral-300 mb-10 leading-relaxed font-medium">
          익숙한 간식을 더 특별하게, 작은 공간의 가능성을 더 크게 만드는 브랜드
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/adoption" className="px-8 py-3 bg-amber-400 text-neutral-900 font-bold rounded hover:bg-amber-500 transition-colors">도입안내 보기</Link>
          <Link to="/inquiry" className="px-8 py-3 bg-white/10 text-white font-bold rounded backdrop-blur border border-white/20 hover:bg-white/20 transition-colors">가맹문의 하기</Link>
        </div>
      </div>
    </section>
  );
}

function DefinitionSection() {
  const badges = ["즉석성", "대중성", "차별성", "확장성", "운영편의성"];
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-snug mb-8">
          120디저트는 익숙한 국민간식을 120만의 방식으로 재해석해,<br/>
          갓 구워낸 즐거움과 운영하기 쉬운 시스템을 함께 제공하는 브랜드입니다
        </h2>
        <p className="text-lg text-neutral-600 mb-12">
          120겹파이를 중심으로 에그120, 츄러스120, 핫도그120, 떡볶이120까지<br/>
          매장 상황에 맞게 도입하고 확장할 수 있는 구조를 제안합니다
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map(b => (
            <span key={b} className="px-5 py-2.5 bg-neutral-100 text-neutral-800 text-sm font-bold rounded-full border border-neutral-200">
              #{b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function BackgroundSection() {
  return (
    <section className="py-24 bg-neutral-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2">
           <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
             120디저트는 이미 검증된<br/>메뉴 자산 위에서 출발합니다
           </h2>
           <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
             120겹파이를 중심으로 시작된 샵인샵 운영 경험은 시장성과 상품성을 충분히 증명해왔습니다.<br/><br/>
             이제는 각 아이템이 따로 보이던 구조를 넘어, 120디저트라는 하나의 브랜드 자산으로 정리할 시점입니다.
           </p>
           <Link to="/#menu" className="mt-8 inline-flex items-center text-neutral-900 font-bold border-b border-neutral-900 pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors">
              브랜드 구조 보기 <ArrowRight size={16} className="ml-2" />
           </Link>
        </div>
        <div className="w-full md:w-1/2">
           <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm relative">
              <div className="absolute top-0 bottom-0 left-[39px] w-0.5 bg-neutral-100 z-0"></div>
              
              <div className="space-y-8 relative z-10">
                 {[
                   { title: "120겹파이 운영 확대", desc: "시그니처 메뉴 시장성 검증 완료" },
                   { title: "에그120 출시", desc: "새로운 비주얼의 성장 동력 확보" },
                   { title: "직영 운영 메뉴 확대", desc: "츄러스, 핫도그, 떡볶이 라인업 구축" },
                   { title: "120디저트 브랜드 런칭", desc: "마스터브랜드 전환 및 본격 궤도 진입", isCurrent: true },
                 ].map((step, i) => (
                   <div key={i} className="flex gap-6">
                     <div className={cn("shrink-0 w-4 h-4 rounded-full mt-1.5 ring-4", step.isCurrent ? "bg-amber-400 ring-amber-100" : "bg-neutral-300 ring-white")}></div>
                     <div>
                       <h4 className={cn("font-bold mb-1", step.isCurrent ? "text-amber-600" : "text-neutral-900")}>{step.title}</h4>
                       <p className="text-sm text-neutral-500">{step.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

function CoreValuesSection() {
   const values = [
     { title: "즉석성", desc: "갓 구워 나오는 따뜻함과 퍼포먼스가 브랜드 경험의 중심입니다" },
     { title: "대중성", desc: "누구나 알고 좋아하는 간식을 기반으로 한 친숙한 브랜드입니다" },
     { title: "차별성", desc: "전용기계, 비주얼, 조리방식으로 다른 곳과 다른 메뉴 경험을 제공합니다" },
     { title: "확장성", desc: "메뉴 도입에서 공동간판, 단독 전환까지 단계적으로 확장할 수 있습니다" },
     { title: "운영편의성", desc: "점주가 쉽게 도입하고 운영할 수 있는 구조를 지향합니다" },
   ];
   return (
     <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">브랜드 핵심 가치</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {values.map((v, i) => (
                <div key={i} className="bg-neutral-50 border border-neutral-100 p-6 rounded-xl text-center group hover:border-amber-200 hover:bg-white hover:shadow-lg hover:shadow-amber-500/5 transition-all">
                   <div className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-amber-600">{v.title}</div>
                   <p className="text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
           </div>
           <div className="mt-12 text-center">
              <Link to="/adoption" className="px-6 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800 transition-colors inline-block">
                도입 모델 확인하기
              </Link>
           </div>
        </div>
     </section>
   )
}

function StructureSection() {
  return (
    <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
         <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">브랜드는 하나로, 역할은 분명하게</h2>
         <p className="text-lg text-neutral-400 mb-16 max-w-2xl mx-auto">
            120디저트는 120겹파이를 중심축으로 하고, 에그120을 성장 동력으로,<br/>
            나머지 라인업을 매장 맞춤형 확장 상품으로 운영하는 구조입니다.
         </p>

         <div className="max-w-4xl mx-auto bg-neutral-800/50 border border-neutral-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="bg-amber-400 text-neutral-900 font-black text-2xl py-4 px-8 rounded-xl inline-block mb-12 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
               120디저트 <span className="font-medium text-lg ml-2 opacity-80">(Master Brand)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Fake connecting lines hidden on mobile */}
              <div className="hidden md:block absolute top-[-48px] left-[16.66%] right-[16.66%] h-12 border-t-2 border-l-2 border-r-2 border-neutral-700 rounded-t-xl z-0"></div>
              <div className="hidden md:block absolute top-[-48px] left-1/2 w-0.5 h-12 bg-neutral-700 z-0"></div>

              <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 relative z-10 flex flex-col items-center">
                <div className="text-xs font-bold text-amber-500 mb-2 tracking-widest uppercase">Hero</div>
                <div className="text-xl font-bold mb-2">120겹파이</div>
                <div className="text-sm text-neutral-400 text-center">가장 강력한 시그니처 축</div>
              </div>
              <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 relative z-10 flex flex-col items-center">
                <div className="text-xs font-bold text-green-400 mb-2 tracking-widest uppercase">Growth</div>
                <div className="text-xl font-bold mb-2">에그120</div>
                <div className="text-sm text-neutral-400 text-center">비주얼 강점의 성장 동력</div>
              </div>
              <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 relative z-10 flex flex-col items-center">
                <div className="text-xs font-bold text-blue-400 mb-2 tracking-widest uppercase">Expansion</div>
                <div className="text-lg font-bold mb-1">츄러스 · 핫도그 · 떡볶이</div>
                <div className="text-sm text-neutral-400 text-center">매장 맞춤형 확장 상품</div>
              </div>
            </div>
         </div>
         <div className="mt-16">
            <Link to="/#menu" className="inline-flex items-center text-amber-400 font-bold hover:text-amber-300">메뉴 전체 보기 <ArrowRight size={16} className="ml-2" /></Link>
         </div>
      </div>
    </section>
  )
}

function GrowthModelSection() {
  return (
    <section className="py-24 bg-neutral-50 px-4 sm:px-6 lg:px-8 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto text-center">
         <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">120디저트는 처음부터<br/>큰 전환을 요구하지 않습니다</h2>
         <p className="text-lg text-neutral-600 mb-16 max-w-2xl mx-auto">
            기존 매장 안에서 메뉴를 도입하는 것부터 시작해, 브랜드 표기, 공동간판, 단독 전환까지 점주 상황에 맞는 단계형 참여 모델을 제안합니다.
         </p>

         <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
            {["샵인샵", "브랜드 표기", "공동간판", "단독 전환"].map((step, i, arr) => (
              <div key={step} className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-8">
                 <div className="bg-white px-8 py-5 rounded-2xl font-bold text-xl text-neutral-900 shadow-sm border border-neutral-200 w-full md:w-auto">
                   {step}
                 </div>
                 {i < arr.length - 1 && <ArrowRight className="text-neutral-300 hidden md:block" size={24} />}
                 {i < arr.length - 1 && <div className="h-6 w-0.5 bg-neutral-300 block md:hidden"></div>}
              </div>
            ))}
         </div>

         <div className="flex justify-center gap-4">
            <Link to="/adoption" className="px-6 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800">도입안내 자세히 보기</Link>
            <Link to="/inquiry" className="px-6 py-3 bg-amber-400 text-neutral-900 font-bold rounded hover:bg-amber-500">공동간판 상담받기</Link>
         </div>
      </div>
    </section>
  )
}

function WhyNowSection() {
  return (
    <section className="py-32 bg-amber-400 text-neutral-900 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
         <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16 leading-tight">
            좋은 메뉴를 파는 데서 끝나지 않고,<br/>좋은 브랜드로 남기 위해 필요한 전환입니다
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/40 p-8 rounded-2xl backdrop-blur-sm border border-white/50">
               <h3 className="font-bold text-xl mb-3">검증된 운영 자산</h3>
               <p className="text-neutral-800">수많은 파트너 매장을 통해 상품의 퀄리티와 시장 반응이 확실하게 증명되었습니다.</p>
            </div>
            <div className="bg-white/40 p-8 rounded-2xl backdrop-blur-sm border border-white/50">
               <h3 className="font-bold text-xl mb-3">확장성을 지닌 구조</h3>
               <p className="text-neutral-800">개별 아이템이 아닌 브랜드로 묶일 때, 다채로운 메뉴 라인업과 운영의 시너지가 극대화됩니다.</p>
            </div>
            <div className="bg-white/40 p-8 rounded-2xl backdrop-blur-sm border border-white/50">
               <h3 className="font-bold text-xl mb-3">강력한 설득력</h3>
               <p className="text-neutral-800">단순한 메뉴 납품을 넘어 점주님께 미래를 제안할 수 있는 시스템과 브랜드 구조가 마련되었습니다.</p>
            </div>
         </div>
         <div className="mt-16">
            <Link to="/inquiry" className="inline-flex items-center px-8 py-4 bg-neutral-900 text-white font-bold text-lg rounded-xl hover:bg-neutral-800 shadow-xl shadow-neutral-900/20">가맹/도입 문의하기</Link>
         </div>
      </div>
    </section>
  )
}

function StoreChangeSection() {
  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">기존 매장 그대로 시작해도,<br/>브랜드는 더 크게 보일 수 있습니다</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
               <div className="text-2xl font-black text-neutral-300 mb-6">Before</div>
               <ul className="space-y-4">
                  <li className="flex items-start text-neutral-500"><CheckCircle2 className="mr-3 shrink-0 text-neutral-300" /> 메뉴 하나만 추가된 상태</li>
                  <li className="flex items-start text-neutral-500"><CheckCircle2 className="mr-3 shrink-0 text-neutral-300" /> 다른 매장과의 차별화 부족</li>
                  <li className="flex items-start text-neutral-500"><CheckCircle2 className="mr-3 shrink-0 text-neutral-300" /> 소비자의 브랜드 인지 약함</li>
               </ul>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
               <div className="text-2xl font-black text-amber-500 mb-6">After <span className="text-sm font-bold text-amber-600 block sm:inline mt-1 sm:mt-0 sm:ml-2">with 120디저트</span></div>
               <ul className="space-y-4">
                  <li className="flex items-start font-medium text-neutral-900"><CheckCircle2 className="mr-3 shrink-0 text-amber-500" /> 폭발력 있는 대표 메뉴 확보</li>
                  <li className="flex items-start font-medium text-neutral-900"><CheckCircle2 className="mr-3 shrink-0 text-amber-500" /> 통일된 브랜드 구조로 매장 경쟁력 시너지</li>
                  <li className="flex items-start font-medium text-neutral-900"><CheckCircle2 className="mr-3 shrink-0 text-amber-500" /> 향후 공동간판 및 단독 전환으로의 확장 가능</li>
               </ul>
            </div>
         </div>
         
         <div className="mt-12 text-center">
            <Link to="/inquiry" className="inline-flex px-8 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800">우리 매장에 맞는 방식 상담받기</Link>
         </div>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="py-24 bg-neutral-900 text-white text-center px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
       <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
         120디저트 브랜드와 함께<br className="block sm:hidden" />
         메뉴 도입부터 공동간판, 단독 전환까지<br className="block sm:hidden" /> 시작해보세요
       </h2>
       <div className="flex flex-wrap justify-center gap-4">
         <Link to="/adoption" className="px-6 py-3 bg-white/10 text-white font-medium rounded hover:bg-white/20 transition-colors">도입안내 보기</Link>
         <Link to="/inquiry" className="px-6 py-3 bg-amber-400 text-neutral-900 font-bold rounded hover:bg-amber-500 transition-colors">가맹문의 하기</Link>
         <Link to="/portal" className="px-6 py-3 bg-neutral-800 text-white font-medium rounded hover:bg-neutral-700 transition-colors border border-neutral-700">점주전용 바로가기</Link>
       </div>
    </section>
  )
}

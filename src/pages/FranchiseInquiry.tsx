import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Building, Store, Coffee, PackagePlus, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function FranchiseInquiry() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createInquiry = useMutation(api.inquiries.create);

  const [formData, setFormData] = useState({
    type: "신규 도입",
    name: "",
    phone: "",
    region: "",
    consultingTime: "",
    hasStore: true,
    industry: "",
    storeName: "",
    coreMenu: "",
    storeSize: "",
    interestMenus: [] as string[],
    interestTypes: [] as string[],
    content: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createInquiry(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      alert("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInterestMenu = (menu: string) => {
    setFormData(prev => ({
      ...prev,
      interestMenus: prev.interestMenus.includes(menu)
        ? prev.interestMenus.filter(m => m !== menu)
        : [...prev.interestMenus, menu]
    }));
  };

  const toggleInterestType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      interestTypes: prev.interestTypes.includes(type)
        ? prev.interestTypes.filter(t => t !== type)
        : [...prev.interestTypes, type]
    }));
  };

  if (isSubmitted) {
    return <SuccessState />;
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
         <div className="text-center mb-12">
            <span className="text-amber-500 font-bold tracking-widest text-sm mb-4 block uppercase">가맹문의</span>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              우리 매장에 맞는 120pie&coffee<br/>도입 방식을 상담해드립니다
            </h1>
            <p className="text-neutral-600">
              메뉴 도입, 공동간판, 추가 도입, 단독 전환까지<br/>
              관심 있는 방향을 선택해 상담을 신청해주세요.
            </p>
         </div>

         <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10 text-center">
            <p className="text-neutral-800 font-medium leading-relaxed">
              처음부터 정확히 정해져 있지 않아도 괜찮습니다.<br/>
              현재 운영 중인 매장 상황과 관심 방향만 알려주시면<br/>
              적합한 방식으로 상담을 도와드립니다.
            </p>
         </div>

         <form className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden" onSubmit={handleSubmit}>
            
            <Section title="1. 문의 유형 선택">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <TypeButton icon={<Store/>} label="신규 도입" active={formData.type === "신규 도입"} onClick={() => setFormData({...formData, type: "신규 도입"})} />
                  <TypeButton icon={<Building/>} label="공동간판" active={formData.type === "공동간판"} onClick={() => setFormData({...formData, type: "공동간판"})} />
                  <TypeButton icon={<Coffee/>} label="단독 전환" active={formData.type === "단독 전환"} onClick={() => setFormData({...formData, type: "단독 전환"})} />
                  <TypeButton icon={<PackagePlus/>} label="추가 도입" active={formData.type === "추가 도입"} onClick={() => setFormData({...formData, type: "추가 도입"})} />
               </div>
            </Section>

            <Section title="2. 기본 정보 입력">
               <p className="text-sm text-neutral-500 mb-4">연락 가능한 정보를 정확히 입력해 주세요</p>
               <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Input label="이름" placeholder="홍길동" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                   <Input label="연락처" placeholder="010-0000-0000" type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Input label="지역" placeholder="서울 강남구" required value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} />
                   <Input label="상담 가능 시간대" placeholder="평일 오후 2시~5시" value={formData.consultingTime} onChange={(e) => setFormData({...formData, consultingTime: e.target.value})} />
                 </div>
               </div>
            </Section>

            <Section title="3. 매장 / 운영 정보">
               <p className="text-sm text-neutral-500 mb-4">현재 운영 중인 매장 정보가 있으면 더 정확한 상담이 가능합니다</p>
               <div className="space-y-4">
                 <div className="flex gap-4 mb-2">
                    <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                      <input type="radio" name="hasStore" className="accent-neutral-900" checked={formData.hasStore} onChange={() => setFormData({...formData, hasStore: true})} /> 
                      현재 매장 운영 중
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                      <input type="radio" name="hasStore" className="accent-neutral-900" checked={!formData.hasStore} onChange={() => setFormData({...formData, hasStore: false})} /> 
                      신규 창업 예정
                    </label>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Input label="업종 (예: 카페, 분식 등)" placeholder="카페" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} />
                   <Input label="매장명" placeholder="OO카페" value={formData.storeName} onChange={(e) => setFormData({...formData, storeName: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Input label="현재 판매 중인 핵심 메뉴" placeholder="커피, 마카롱 등" value={formData.coreMenu} onChange={(e) => setFormData({...formData, coreMenu: e.target.value})} />
                   <Input label="매장 규모 (선택)" placeholder="약 15평" value={formData.storeSize} onChange={(e) => setFormData({...formData, storeSize: e.target.value})} />
                 </div>
               </div>
            </Section>

            <Section title="4. 관심 메뉴 / 도입 방식">
               <p className="text-sm text-neutral-500 mb-4">관심 있는 메뉴와 도입 방식을 선택해 주세요 (다중 선택 가능)</p>
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-bold text-neutral-900 mb-3">관심 메뉴</label>
                   <div className="flex flex-wrap gap-3">
                      {["120겹파이", "에그120", "츄러스120", "핫도그120", "떡볶이120"].map(m => (
                        <InquiryCheckbox key={m} label={m} checked={formData.interestMenus.includes(m)} onChange={() => toggleInterestMenu(m)} />
                      ))}
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-neutral-900 mb-3">관심 방식</label>
                   <div className="flex flex-wrap gap-3">
                      {["샵인샵", "브랜드 표기", "공동간판", "단독 전환"].map(m => (
                        <InquiryCheckbox key={m} label={m} checked={formData.interestTypes.includes(m)} onChange={() => toggleInterestType(m)} />
                      ))}
                   </div>
                 </div>
               </div>
            </Section>

            <Section title="5. 상세 문의 입력">
               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-neutral-900 mb-2">문의 내용</label>
                    <textarea 
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 outline-none focus:border-neutral-900 focus:bg-white transition-colors text-sm min-h-[120px] resize-y"
                      placeholder="예: 우리 매장에도 가능한지 궁금합니다. 공동간판 방식이 가능한지 알고 싶습니다."
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                    ></textarea>
                  </div>
               </div>
            </Section>

            <div className="p-8 border-t border-neutral-100 bg-neutral-50/50 text-center">
               <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer mb-8">
                  <input type="checkbox" required className="accent-neutral-900 w-4 h-4 rounded" />
                  개인정보 수집 및 이용에 동의합니다.
               </label>
               <div className="max-w-sm mx-auto">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    상담 신청 완료하기
                  </button>
                  <p className="text-xs text-neutral-400 mt-4">접수 후 확인 가능한 순서대로 연락드릴 예정입니다</p>
               </div>
            </div>

         </form>
      </div>
    </div>
  )
}

function SuccessState() {
  return (
    <div className="bg-neutral-50 min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
       <div className="text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">가맹문의가 접수되었습니다</h1>
          <p className="text-lg text-neutral-600 mb-12">
            입력해주신 내용을 바탕으로 확인 후<br/>입력하신 연락처로 빠르게 연락드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/#brand" className="px-6 py-3 bg-white border border-neutral-200 text-neutral-900 font-medium rounded hover:bg-neutral-50 transition-colors">브랜드소개 보기</Link>
             <Link to="/#adoption" className="px-6 py-3 bg-white border border-neutral-200 text-neutral-900 font-medium rounded hover:bg-neutral-50 transition-colors">도입안내 보기</Link>
             <Link to="/" className="px-6 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800 transition-colors">메인으로 이동</Link>
          </div>
       </div>
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="p-6 md:p-8 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/30 transition-colors">
      <h2 className="text-xl font-bold text-neutral-900 mb-6">{title}</h2>
      {children}
    </div>
  )
}

function TypeButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={cn("flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all", 
        active ? "bg-amber-50 border-amber-400 text-amber-700 font-bold" : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 font-medium"
      )}
    >
       <div className={cn(active ? "text-amber-500" : "text-neutral-400")}>{icon}</div>
       <span className="text-sm">{label}</span>
    </button>
  )
}

function Input({ label, placeholder, required = false, type = "text", value, onChange }: { label: string, placeholder: string, required?: boolean, type?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="block text-sm font-bold text-neutral-900 mb-2">
         {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <input 
        type={type} 
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-neutral-200 rounded-lg px-4 py-3 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
      />
    </div>
  )
}

function InquiryCheckbox({ label, checked, onChange, key }: { label: string, checked: boolean, onChange: () => void, key?: string }) {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer bg-white border px-4 py-2.5 rounded-lg transition-colors",
      checked ? "border-amber-400 bg-amber-50" : "border-neutral-200 hover:border-neutral-300"
    )}>
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-neutral-900 w-4 h-4 rounded border-neutral-300" />
      <span className={cn("text-sm font-medium", checked ? "text-amber-700 font-bold" : "text-neutral-700")}>{label}</span>
    </label>
  );
}

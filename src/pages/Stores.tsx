import { useState } from "react";
import { Search, MapPin } from "lucide-react";

const STORES = [
  { id: 1, name: "서울 강남본점", type: "단독매장", address: "서울 강남구 테헤란로 123", phone: "02-1234-5678" },
  { id: 2, name: "부산 해운대점", type: "단독매장", address: "부산 해운대구 해운대해변로 123", phone: "051-123-4567" },
  { id: 3, name: "홍대 입구점", type: "샵인샵", address: "서울 마포구 양화로 123", phone: "02-987-6543" },
  { id: 4, name: "대구 동성로점", type: "샵인샵", address: "대구 중구 동성로 123", phone: "053-123-4567" },
  { id: 5, name: "광주 상무점", type: "브랜드 표기형", address: "광주 서구 상무중앙로 123", phone: "062-123-4567" },
];

export default function Stores() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStores = STORES.filter(store => 
    store.name.includes(searchTerm) || store.address.includes(searchTerm)
  );

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-neutral-900 border-b border-neutral-800 pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">전국 매장 현황</h1>
          <p className="text-lg text-neutral-400 font-medium">우리 동네와 가장 가까운 성공 사장님을 만나보세요</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar List */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input 
                type="text" 
                placeholder="매장명 또는 주소 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-xl text-neutral-900 font-medium focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-sm"
              />
            </div>

            <div className="flex-1 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm h-[600px] overflow-y-auto">
              <div className="divide-y divide-neutral-100">
                {filteredStores.map(store => (
                  <div key={store.id} className="p-6 hover:bg-neutral-50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-black text-lg text-neutral-900 group-hover:text-amber-500 transition-colors">{store.name}</h3>
                       <span className="text-xs font-bold text-neutral-900 bg-amber-400 px-2 py-1 rounded shadow-sm">{store.type}</span>
                    </div>
                    <div className="text-sm text-neutral-500 flex items-start gap-2 mb-2 font-medium">
                       <MapPin size={16} className="shrink-0 mt-0.5 text-neutral-400" />
                       {store.address}
                    </div>
                    <div className="text-sm text-neutral-400 font-medium ml-6">
                       {store.phone}
                    </div>
                  </div>
                ))}
                {filteredStores.length === 0 && (
                  <div className="p-8 text-center text-neutral-500 font-medium">검색 결과가 없습니다.</div>
                )}
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:w-2/3 h-[600px] lg:h-[688px] bg-neutral-200 rounded-xl border border-neutral-300 overflow-hidden relative shadow-inner">
             {/* Map Placeholder */}
             <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 bg-[size:40px_40px] bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]">
                <MapPin size={48} className="mb-4 text-neutral-400" />
                <p className="font-bold text-lg text-neutral-500">지도 API 연동 영역</p>
                <p className="text-sm font-medium">실제 구현 시 Kakao Maps, Naver Maps 또는 Google Maps API를 연동합니다.</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

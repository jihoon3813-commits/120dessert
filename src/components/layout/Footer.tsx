import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1">
          <Link to="/" className="font-bold text-2xl tracking-tight text-white mb-4 block">
            <span className="text-amber-500">120pie</span>&coffee
          </Link>
          <p className="text-sm mb-6 max-w-sm text-neutral-500">
            120pie&coffee는 샵인샵 도입부터 하이브리드 리모델링까지 소상공인 카페 회생을 위한 솔루션을 제안합니다
          </p>
          <div className="flex gap-4 text-sm font-medium">
            <Link to="/brand" className="hover:text-white transition-colors">회사소개</Link>
            <Link to="/inquiry" className="hover:text-white transition-colors">제휴 및 입점 문의</Link>
            <Link to="/portal" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 transition-colors">점주전용</Link>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-white font-semibold mb-4">고객센터</h3>
          <p className="text-2xl font-bold text-white mb-2">1588-0000</p>
          <p className="text-sm">평일 10:00 - 18:00 (점심시간 12:00 - 13:00)</p>
          <p className="text-sm mb-4">주말 및 공휴일 휴무</p>
          <p className="text-sm">이메일: hello@120pieandcoffee.com</p>
        </div>

        <div className="flex-1 text-sm flex flex-col gap-2">
          <p className="text-white font-semibold mb-2">사업자 정보</p>
          <p>(주)120파이앤커피 | 대표 000</p>
          <p>사업자등록번호 000-00-00000</p>
          <p>서울특별시 강남구 테헤란로 00, 0층</p>
          <div className="mt-4 flex gap-4">
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="#" className="hover:text-white font-medium">개인정보처리방침</a>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-neutral-600">
            <span>© 120PIE&COFFEE. All rights reserved.</span>
            <Link to="/admin" target="_blank" rel="noopener noreferrer" className="text-neutral-850 hover:text-neutral-500 transition-colors text-[11px] font-medium">
              본사 관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

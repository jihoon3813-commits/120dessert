import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { ChevronLeft, MessageSquare, CheckCircle2, Clock, FileText, Download, Bell, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

export function StoreInquiriesView({ storeName, setActiveTab, initialType = "1:1 문의" }: { storeName: string, setActiveTab: (t: any) => void, initialType?: string }) {
  const inquiries = useQuery(api.storeInquiries.list) || [];
  const myInquiries = inquiries.filter(i => i.storeName === storeName);
  const createInquiry = useMutation(api.storeInquiries.create);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [type, setType] = useState(initialType);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("제목과 내용을 모두 입력해주세요.");
    try {
      await createInquiry({ storeName, type, title, content });
      setIsFormOpen(false);
      setTitle("");
      setContent("");
      alert("문의가 접수되었습니다.");
    } catch(err) {
      alert("문의 접수 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200 min-h-[60vh] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab("dashboard")} className="p-2 -ml-2 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">문의 내역</h2>
            <p className="text-xs text-neutral-500 mt-0.5">1:1 문의, 건의사항, 추가 도입 등 다양한 의견을 남겨주세요.</p>
          </div>
        </div>
        <button onClick={() => setIsFormOpen(true)} className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors">
          새 문의 남기기
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-neutral-50 border border-neutral-200 rounded-xl space-y-4">
          <h3 className="font-bold text-neutral-900 mb-2">새 문의 작성</h3>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">문의 유형</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900">
              <option value="1:1 문의">1:1 문의</option>
              <option value="건의하기">건의하기</option>
              <option value="추가 메뉴">추가 메뉴 도입</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">제목</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요" className="w-full p-3 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">내용</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="문의 내용을 상세히 적어주세요" className="w-full p-3 bg-white border border-neutral-200 rounded-lg text-sm h-32 resize-none focus:outline-none focus:border-neutral-900" />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg font-bold text-sm hover:bg-neutral-50">취소</button>
            <button type="submit" className="px-6 py-2 bg-neutral-900 text-white rounded-lg font-bold text-sm hover:bg-neutral-800">등록하기</button>
          </div>
        </form>
      )}

      <div className="space-y-4 flex-1">
        {myInquiries.length === 0 ? (
          <div className="text-center py-12 text-neutral-400 text-sm">등록된 문의 내역이 없습니다.</div>
        ) : (
          myInquiries.map((i) => (
            <div key={i._id} className="border border-neutral-200 rounded-xl overflow-hidden">
              <div className="p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs font-bold">{i.type}</span>
                    <span className="text-xs text-neutral-500">{new Date(i.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="font-bold text-neutral-900">{i.title}</div>
                  <div className="text-sm text-neutral-600 mt-2 whitespace-pre-wrap">{i.content}</div>
                </div>
                <div className="shrink-0">
                  {i.status === "답변완료" ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full"><CheckCircle2 size={14} />답변완료</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full"><Clock size={14} />대기중</span>
                  )}
                </div>
              </div>
              {i.reply && (
                <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                  <div className="flex gap-2 text-sm">
                    <MessageSquare size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 mb-1">본사 답변</div>
                      <p className="text-neutral-700 whitespace-pre-wrap">{i.reply}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function MaterialsView({ setActiveTab }: { setActiveTab: (t: any) => void }) {
  const materials = useQuery(api.materials.list) || [];
  const visibleMaterials = materials.filter(m => m.isVisible);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? visibleMaterials : visibleMaterials.filter(m => m.type === filter);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200 min-h-[60vh] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab("dashboard")} className="p-2 -ml-2 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">교육 및 홍보물 자료실</h2>
            <p className="text-xs text-neutral-500 mt-0.5">매장 운영에 필요한 최신 가이드 및 홍보물을 확인하세요.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "교육자료", "홍보물"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-colors", filter === f ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200")}
          >
            {f === "all" ? "전체보기" : f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-neutral-400 text-sm">등록된 자료가 없습니다.</div>
        ) : (
          filtered.map(m => (
            <div key={m._id} className="border border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-colors group flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs font-bold">{m.type}</span>
                <span className="text-xs text-neutral-400">{m.format}</span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-4 flex-1">{m.title}</h3>
              {m.fileUrl ? (
                <button onClick={() => window.open(m.fileUrl, "_blank")} className="flex items-center justify-center gap-2 w-full py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-sm font-bold text-neutral-700 transition-colors">
                  <Download size={16} /> 다운로드
                </button>
              ) : (
                <div className="text-center py-2 bg-neutral-50 rounded-lg text-sm font-medium text-neutral-400 cursor-not-allowed">
                  첨부파일 없음
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function NoticesView({ setActiveTab }: { setActiveTab: (t: any) => void }) {
  const notices = useQuery(api.notices.list) || [];
  const visibleNotices = notices.filter(n => n.isVisible);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200 min-h-[60vh] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab("dashboard")} className="p-2 -ml-2 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">공지사항</h2>
            <p className="text-xs text-neutral-500 mt-0.5">본사에서 가맹점주님들께 안내하는 공식 공지사항입니다.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {visibleNotices.length === 0 ? (
          <div className="text-center py-12 text-neutral-400 text-sm">등록된 공지사항이 없습니다.</div>
        ) : (
          visibleNotices.map((n) => {
            const isExpanded = expandedId === n._id;
            return (
              <div key={n._id} className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : n._id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                      <Bell size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm md:text-base">{n.title}</h3>
                      <p className="text-xs text-neutral-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-neutral-400 ml-4">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                {isExpanded && (
                  <div className="p-5 bg-neutral-50/50 border-t border-neutral-100 text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
                    {n.content}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

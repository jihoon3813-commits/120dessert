import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Check, X, Search, CheckCircle2, MessageSquare } from "lucide-react";
import { cn } from "../../lib/utils";

export default function StoreInquiriesSection() {
  const inquiries = useQuery(api.storeInquiries.list);
  const replyInquiry = useMutation(api.storeInquiries.reply);
  const removeInquiry = useMutation(api.storeInquiries.remove);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  if (inquiries === undefined) {
    return <div className="p-8 text-center text-neutral-500">불러오는 중...</div>;
  }

  const filtered = inquiries.filter((i) => {
    if (typeFilter !== "all" && i.type !== typeFilter) return false;
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      if (!i.storeName.toLowerCase().includes(lower) && !i.title.toLowerCase().includes(lower)) {
        return false;
      }
    }
    return true;
  });

  const handleReply = async (id: string) => {
    if (!replyText.trim()) return alert("답변 내용을 입력해주세요.");
    try {
      await replyInquiry({ id: id as Id<"storeInquiries">, reply: replyText });
      setReplyText("");
      setSelectedId(null);
      alert("답변이 등록되었습니다.");
    } catch (e) {
      alert("답변 등록 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await removeInquiry({ id: id as Id<"storeInquiries"> });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 tracking-tight">점주 문의 관리</h2>
          <p className="text-sm text-neutral-500 mt-1">1:1 문의, 건의하기, 추가 메뉴 등 점주들의 문의를 관리합니다.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input
            type="text"
            placeholder="가맹점명 또는 제목 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium outline-none focus:border-neutral-900"
        >
          <option value="all">모든 유형</option>
          <option value="1:1 문의">1:1 문의</option>
          <option value="건의하기">건의하기</option>
          <option value="추가 메뉴">추가 메뉴</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase">
              <th className="p-4">가맹점명</th>
              <th className="p-4">유형</th>
              <th className="p-4">제목</th>
              <th className="p-4">등록일</th>
              <th className="p-4 text-center">상태</th>
              <th className="p-4 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-neutral-400">문의 내역이 없습니다.</td></tr>
            ) : (
              filtered.map((i) => (
                <React.Fragment key={i._id}>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-4 font-bold text-neutral-900">{i.storeName}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs font-bold">{i.type}</span></td>
                    <td className="p-4 font-medium text-neutral-900 cursor-pointer hover:underline" onClick={() => setSelectedId(selectedId === i._id ? null : i._id)}>{i.title}</td>
                    <td className="p-4 text-neutral-500">{new Date(i.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-center">
                      {i.status === "답변완료" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full"><CheckCircle2 size={12} />답변완료</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full"><MessageSquare size={12} />대기중</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleDelete(i._id)} className="text-xs font-bold text-red-500 hover:text-red-700">삭제</button>
                    </td>
                  </tr>
                  {selectedId === i._id && (
                    <tr className="bg-neutral-50/50">
                      <td colSpan={6} className="p-6 border-b border-neutral-100">
                        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
                          <div className="mb-4">
                            <h4 className="font-bold text-sm text-neutral-900 mb-2">문의 내용</h4>
                            <p className="text-sm text-neutral-700 whitespace-pre-wrap">{i.content}</p>
                          </div>
                          <div className="border-t border-neutral-100 pt-4 mt-4">
                            <h4 className="font-bold text-sm text-neutral-900 mb-2">본사 답변</h4>
                            {i.reply ? (
                              <p className="text-sm text-neutral-700 whitespace-pre-wrap bg-neutral-50 p-4 rounded-lg border border-neutral-100">{i.reply}</p>
                            ) : (
                              <div className="flex gap-2 mt-2">
                                <textarea
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="답변 내용을 입력하세요..."
                                  className="flex-1 border border-neutral-200 rounded-lg p-3 text-sm focus:border-neutral-900 outline-none resize-none h-24"
                                />
                                <button
                                  onClick={() => handleReply(i._id)}
                                  className="px-6 bg-neutral-900 text-white rounded-lg font-bold hover:bg-neutral-800 transition-colors"
                                >
                                  답변 등록
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

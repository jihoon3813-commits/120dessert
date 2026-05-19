import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Search, Plus, Trash2, Edit2, X } from "lucide-react";
import { cn } from "../../lib/utils";

export default function NoticesSection() {
  const notices = useQuery(api.notices.list);
  const createNotice = useMutation(api.notices.create);
  const updateNotice = useMutation(api.notices.update);
  const removeNotice = useMutation(api.notices.remove);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isVisible: true,
  });
  const [searchTerm, setSearchTerm] = useState("");

  if (notices === undefined) {
    return <div className="p-8 text-center text-neutral-500">불러오는 중...</div>;
  }

  const filtered = notices.filter(n => {
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      return n.title.toLowerCase().includes(lower) || n.content.toLowerCase().includes(lower);
    }
    return true;
  });

  const openModal = (n?: any) => {
    if (n) {
      setEditingId(n._id);
      setFormData({ title: n.title, content: n.content, isVisible: n.isVisible });
    } else {
      setEditingId(null);
      setFormData({ title: "", content: "", isVisible: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateNotice({ id: editingId as Id<"notices">, ...formData });
      } else {
        await createNotice(formData);
      }
      setIsModalOpen(false);
    } catch (e) {
      alert("오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await removeNotice({ id: id as Id<"notices"> });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 tracking-tight">공지사항 관리</h2>
          <p className="text-sm text-neutral-500 mt-1">점주 전용 포털에 띄울 공지사항을 작성하고 관리합니다.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white font-bold text-sm rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus size={16} /> 신규 공지 작성
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input
            type="text"
            placeholder="제목 또는 내용 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase">
              <th className="p-4 w-2/3">제목</th>
              <th className="p-4 text-center">노출 여부</th>
              <th className="p-4 text-center">등록일</th>
              <th className="p-4 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-neutral-400">등록된 공지사항이 없습니다.</td></tr>
            ) : (
              filtered.map((n) => (
                <tr key={n._id} className="hover:bg-neutral-50">
                  <td className="p-4">
                    <div className="font-bold text-neutral-900">{n.title}</div>
                    <div className="text-xs text-neutral-500 mt-1 line-clamp-1">{n.content}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={cn("px-2 py-1 rounded text-xs font-bold", n.isVisible ? "bg-green-50 text-green-700" : "bg-neutral-100 text-neutral-500")}>
                      {n.isVisible ? "노출중" : "숨김"}
                    </span>
                  </td>
                  <td className="p-4 text-center text-neutral-500">{new Date(n.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-center space-x-2">
                    <button onClick={() => openModal(n)} className="text-xs font-bold text-neutral-600 hover:text-neutral-900">수정</button>
                    <button onClick={() => handleDelete(n._id)} className="text-xs font-bold text-red-500 hover:text-red-700">삭제</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-neutral-900">{editingId ? "공지사항 수정" : "공지사항 작성"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-900"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">제목</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:border-neutral-900 outline-none" placeholder="공지사항 제목" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">내용</label>
                <textarea required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:border-neutral-900 outline-none h-48 resize-none" placeholder="공지사항 상세 내용" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isVisible" checked={formData.isVisible} onChange={(e) => setFormData({...formData, isVisible: e.checked})} className="rounded text-neutral-900 focus:ring-neutral-900" />
                <label htmlFor="isVisible" className="text-sm font-medium text-neutral-700">점주 포털에 즉시 노출</label>
              </div>
              <div className="pt-4 flex gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-neutral-100 text-neutral-700 font-bold rounded-lg hover:bg-neutral-200">취소</button>
                <button type="submit" className="flex-1 py-2 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800">저장</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

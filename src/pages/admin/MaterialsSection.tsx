import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Search, Plus, Trash2, Edit2, X } from "lucide-react";
import { cn } from "../../lib/utils";

export default function MaterialsSection() {
  const materials = useQuery(api.materials.list);
  const createMaterial = useMutation(api.materials.create);
  const updateMaterial = useMutation(api.materials.update);
  const removeMaterial = useMutation(api.materials.remove);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "교육자료",
    format: "PDF",
    fileUrl: "",
    isVisible: true,
  });

  if (materials === undefined) {
    return <div className="p-8 text-center text-neutral-500">불러오는 중...</div>;
  }

  const openModal = (m?: any) => {
    if (m) {
      setEditingId(m._id);
      setFormData({ title: m.title, type: m.type, format: m.format, fileUrl: m.fileUrl || "", isVisible: m.isVisible });
    } else {
      setEditingId(null);
      setFormData({ title: "", type: "교육자료", format: "PDF", fileUrl: "", isVisible: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMaterial({ id: editingId as Id<"materials">, ...formData });
      } else {
        await createMaterial(formData);
      }
      setIsModalOpen(false);
    } catch (e) {
      alert("오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await removeMaterial({ id: id as Id<"materials"> });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 tracking-tight">자료실 관리</h2>
          <p className="text-sm text-neutral-500 mt-1">교육자료, 홍보물 등을 관리하고 배포합니다.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white font-bold text-sm rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus size={16} /> 신규 등록
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase">
              <th className="p-4">구분</th>
              <th className="p-4">포맷</th>
              <th className="p-4">자료명</th>
              <th className="p-4 text-center">노출 여부</th>
              <th className="p-4 text-center">등록일</th>
              <th className="p-4 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {materials.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-neutral-400">등록된 자료가 없습니다.</td></tr>
            ) : (
              materials.map((m) => (
                <tr key={m._id} className="hover:bg-neutral-50">
                  <td className="p-4"><span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs font-bold">{m.type}</span></td>
                  <td className="p-4 text-neutral-500">{m.format}</td>
                  <td className="p-4 font-bold text-neutral-900">{m.title}</td>
                  <td className="p-4 text-center">
                    <span className={cn("px-2 py-1 rounded text-xs font-bold", m.isVisible ? "bg-green-50 text-green-700" : "bg-neutral-100 text-neutral-500")}>
                      {m.isVisible ? "노출중" : "숨김"}
                    </span>
                  </td>
                  <td className="p-4 text-center text-neutral-500">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-center space-x-2">
                    <button onClick={() => openModal(m)} className="text-xs font-bold text-neutral-600 hover:text-neutral-900">수정</button>
                    <button onClick={() => handleDelete(m._id)} className="text-xs font-bold text-red-500 hover:text-red-700">삭제</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-neutral-900">{editingId ? "자료 수정" : "자료 신규 등록"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-900"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">구분</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:border-neutral-900 outline-none">
                  <option value="교육자료">교육자료</option>
                  <option value="홍보물">홍보물</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">자료명</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:border-neutral-900 outline-none" placeholder="예: 할로윈 시즌 홍보물" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">포맷</label>
                <input type="text" required value={formData.format} onChange={(e) => setFormData({...formData, format: e.target.value})} className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:border-neutral-900 outline-none" placeholder="예: PDF, JPG / AI" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">파일/링크 URL (선택)</label>
                <input type="text" value={formData.fileUrl} onChange={(e) => setFormData({...formData, fileUrl: e.target.value})} className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:border-neutral-900 outline-none" placeholder="다운로드 링크 등" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isVisible" checked={formData.isVisible} onChange={(e) => setFormData({...formData, isVisible: e.target.checked})} className="rounded text-neutral-900 focus:ring-neutral-900" />
                <label htmlFor="isVisible" className="text-sm font-medium text-neutral-700">점주 포털에 노출하기</label>
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

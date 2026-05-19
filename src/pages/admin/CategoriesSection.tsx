import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Trash2, X, ArrowUpDown } from "lucide-react";
import { cn } from "../../lib/utils";

export default function CategoriesSection() {
  const categories = useQuery(api.categories.list);
  const createCategory = useMutation(api.categories.create);
  const updateCategory = useMutation(api.categories.update);
  const removeCategory = useMutation(api.categories.remove);
  const reorderCategories = useMutation(api.categories.reorder);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");

  const sorted = [...(categories ?? [])].sort((a, b) => a.order - b.order);

  const openAdd = () => {
    setSelectedId(null);
    setFormName("");
    setIsEditing(true);
  };

  const openEdit = (cat: any) => {
    setSelectedId(cat._id);
    setFormName(cat.name);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("카테고리를 삭제하시겠습니까?")) return;
    await removeCategory({ id: id as Id<"categories"> });
  };

  const handleMove = async (index: number, dir: "up" | "down") => {
    const ti = dir === "up" ? index - 1 : index + 1;
    if (ti < 0 || ti >= sorted.length) return;
    await reorderCategories({
      items: [
        { id: sorted[index]._id, order: sorted[ti].order },
        { id: sorted[ti]._id, order: sorted[index].order },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) {
      const cat = sorted.find((c) => c._id === selectedId)!;
      await updateCategory({ id: selectedId as Id<"categories">, name: formName, order: cat.order });
    } else {
      const nextOrder = sorted.length > 0 ? Math.max(...sorted.map((c) => c.order)) + 1 : 1;
      await createCategory({ name: formName, order: nextOrder });
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAdd} className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors">
          + 카테고리 추가
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
              <th className="p-4 w-20 text-center">순서</th>
              <th className="p-4">카테고리명</th>
              <th className="p-4 w-32 text-center">순서 조정</th>
              <th className="p-4 w-28 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-sm">
            {sorted.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-neutral-400">카테고리가 없습니다. 추가해주세요.</td></tr>
            ) : (
              sorted.map((cat, i) => (
                <tr key={cat._id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 text-center text-neutral-500 font-bold">{cat.order}</td>
                  <td className="p-4 font-bold text-neutral-900">{cat.name}</td>
                  <td className="p-4 text-center">
                    <div className="inline-flex gap-1">
                      <button disabled={i === 0} onClick={() => handleMove(i, "up")}
                        className="p-1.5 rounded border border-neutral-200 text-neutral-500 hover:text-neutral-900 disabled:opacity-30 transition-colors text-xs">▲</button>
                      <button disabled={i === sorted.length - 1} onClick={() => handleMove(i, "down")}
                        className="p-1.5 rounded border border-neutral-200 text-neutral-500 hover:text-neutral-900 disabled:opacity-30 transition-colors text-xs">▼</button>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex gap-2">
                      <button onClick={() => openEdit(cat)} className="text-xs font-bold py-1 px-2 rounded border border-neutral-200 hover:bg-neutral-50 transition-colors">수정</button>
                      <button onClick={() => handleDelete(cat._id)} className="text-xs font-bold py-1 px-2 rounded border border-red-100 bg-red-50/50 text-red-500 hover:bg-red-50 transition-colors">삭제</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50">
              <h3 className="font-bold text-neutral-900">{selectedId ? "카테고리 수정" : "카테고리 추가"}</h3>
              <button onClick={() => setIsEditing(false)}><X size={18} className="text-neutral-400 hover:text-neutral-600" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">카테고리명 *</label>
                <input required value={formName} onChange={(e) => setFormName(e.target.value)}
                  placeholder="예: 디저트, 음료, 케이크"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button type="button" onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-neutral-200 text-sm font-bold rounded-lg hover:bg-neutral-50 transition-colors">취소</button>
                <button type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors">저장</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

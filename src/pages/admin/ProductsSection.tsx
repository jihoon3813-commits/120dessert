import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { X, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

const emptyForm = {
  categoryId: "" as string,
  name: "",
  modelName: "",
  unit: "",
  quantity: 0,
  supplyPrice: 0,
  salePrice: 0,
  discountAmount: 0,
  thumbnailUrl: "",
  detailImageUrl: "",
  isActive: true,
};

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getStorageUrl = useMutation(api.files.getStorageUrl);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // 1. 서명된 업로드 URL 발급
      const uploadUrl = await generateUploadUrl();
      // 2. 파일을 Convex Storage에 직접 업로드
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("업로드 실패");
      const { storageId } = await res.json();
      // 3. storageId → 공개 URL 변환
      const url = await getStorageUrl({ storageId: storageId as Id<"_storage"> });
      if (url) onChange(url);
    } catch (err) {
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="이미지 URL 입력 또는 파일 선택"
          className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => ref.current?.click()}
          className="flex items-center gap-1 px-3 py-2 border border-neutral-200 rounded-lg text-xs font-bold text-neutral-500 hover:bg-neutral-50 transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {uploading ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
          {uploading ? "업로드 중..." : "파일 선택"}
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {value && !uploading && (
        <img
          src={value}
          alt="preview"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="mt-2 h-20 w-auto rounded-lg border border-neutral-200 object-cover"
        />
      )}
    </div>
  );
}


export default function ProductsSection() {
  const products = useQuery(api.products.list);
  const categories = useQuery(api.categories.list);
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);
  const removeProduct = useMutation(api.products.remove);
  const reorderProducts = useMutation(api.products.reorder);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  const sorted = [...(products ?? [])].sort((a, b) => a.order - b.order);
  const catMap = Object.fromEntries((categories ?? []).map((c) => [c._id, c.name]));

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const openAdd = () => {
    setSelectedId(null);
    const nextOrder = sorted.length > 0 ? Math.max(...sorted.map((p) => p.order)) + 1 : 1;
    setForm({ ...emptyForm });
    setIsEditing(true);
  };

  const openEdit = (p: any) => {
    setSelectedId(p._id);
    setForm({
      categoryId: p.categoryId ?? "",
      name: p.name,
      modelName: p.modelName ?? "",
      unit: p.unit ?? "",
      quantity: p.quantity,
      supplyPrice: p.supplyPrice,
      salePrice: p.salePrice,
      discountAmount: p.discountAmount ?? 0,
      thumbnailUrl: p.thumbnailUrl ?? "",
      detailImageUrl: p.detailImageUrl ?? "",
      isActive: p.isActive,
    });
    setIsEditing(true);
  };

  const handleMove = async (i: number, dir: "up" | "down") => {
    const ti = dir === "up" ? i - 1 : i + 1;
    if (ti < 0 || ti >= sorted.length) return;
    await reorderProducts({
      items: [
        { id: sorted[i]._id, order: sorted[ti].order },
        { id: sorted[ti]._id, order: sorted[i].order },
      ],
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("제품을 삭제하시겠습니까?")) return;
    await removeProduct({ id: id as Id<"products"> });
  };

  const handleToggleActive = async (p: any) => {
    await updateProduct({ ...p, id: p._id, categoryId: p.categoryId ?? undefined, isActive: !p.isActive });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      categoryId: form.categoryId ? (form.categoryId as Id<"categories">) : undefined,
      name: form.name,
      modelName: form.modelName || undefined,
      unit: form.unit || undefined,
      quantity: Number(form.quantity),
      supplyPrice: Number(form.supplyPrice),
      salePrice: Number(form.salePrice),
      discountAmount: form.discountAmount ? Number(form.discountAmount) : undefined,
      thumbnailUrl: form.thumbnailUrl || undefined,
      detailImageUrl: form.detailImageUrl || undefined,
      isActive: form.isActive,
    };
    if (selectedId) {
      await updateProduct({ ...payload, id: selectedId as Id<"products">, order: sorted.find((p) => p._id === selectedId)?.order ?? 1 });
    } else {
      const nextOrder = sorted.length > 0 ? Math.max(...sorted.map((p) => p.order)) + 1 : 1;
      await createProduct({ ...payload, order: nextOrder });
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAdd} className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors">
          + 제품 추가
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <th className="p-4 w-20 text-center">순서</th>
                <th className="p-4 w-20 text-center">이미지</th>
                <th className="p-4">제품명</th>
                <th className="p-4">카테고리</th>
                <th className="p-4 text-right">판매가</th>
                <th className="p-4 text-right">공급가</th>
                <th className="p-4 w-28 text-center">상태</th>
                <th className="p-4 w-36 text-center">순서 조정</th>
                <th className="p-4 w-28 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {sorted.length === 0 ? (
                <tr><td colSpan={9} className="p-10 text-center text-neutral-400">등록된 제품이 없습니다.</td></tr>
              ) : (
                sorted.map((p, i) => (
                  <tr key={p._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4 text-center text-neutral-500 font-bold">{p.order}</td>
                    <td className="p-4 text-center">
                      {p.thumbnailUrl ? (
                        <img src={p.thumbnailUrl} alt={p.name} className="w-12 h-12 object-cover rounded-lg border border-neutral-200 mx-auto" onError={(e) => (e.currentTarget.style.display = "none")} />
                      ) : (
                        <div className="w-12 h-12 bg-neutral-100 rounded-lg border border-neutral-200 mx-auto flex items-center justify-center text-neutral-300">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-neutral-900">{p.name}</div>
                      {p.modelName && <div className="text-xs text-neutral-400 mt-0.5">{p.modelName}</div>}
                      {p.unit && <div className="text-xs text-neutral-400">단위: {p.unit}</div>}
                    </td>
                    <td className="p-4 text-neutral-500 text-xs">{catMap[p.categoryId ?? ""] ?? "—"}</td>
                    <td className="p-4 text-right font-bold text-neutral-900">{p.salePrice.toLocaleString()}원</td>
                    <td className="p-4 text-right text-neutral-500">{p.supplyPrice.toLocaleString()}원</td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleToggleActive(p)}
                        className={cn("inline-flex px-2.5 py-1 rounded-full border text-xs font-bold transition-all",
                          p.isActive ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" : "bg-neutral-100 text-neutral-400 border-neutral-200 hover:bg-neutral-200")}>
                        {p.isActive ? "판매중" : "중지"}
                      </button>
                    </td>
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
                        <button onClick={() => openEdit(p)} className="text-xs font-bold py-1 px-2 rounded border border-neutral-200 hover:bg-neutral-50 transition-colors">수정</button>
                        <button onClick={() => handleDelete(p._id)} className="text-xs font-bold py-1 px-2 rounded border border-red-100 bg-red-50/50 text-red-500 hover:bg-red-50 transition-colors">삭제</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden my-4">
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50 sticky top-0">
              <h3 className="font-bold text-neutral-900 text-lg">{selectedId ? "제품 수정" : "제품 추가"}</h3>
              <button onClick={() => setIsEditing(false)}><X size={18} className="text-neutral-400 hover:text-neutral-600" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">카테고리</label>
                  <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm">
                    <option value="">카테고리 없음</option>
                    {(categories ?? []).map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">제품명 *</label>
                  <input required value={form.name} onChange={(e) => set("name", e.target.value)}
                    placeholder="제품명 입력" className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">모델명</label>
                  <input value={form.modelName} onChange={(e) => set("modelName", e.target.value)}
                    placeholder="모델명 (선택)" className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm" />
                </div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">단위</label>
                  <input value={form.unit} onChange={(e) => set("unit", e.target.value)}
                    placeholder="예: 개, 박스, kg" className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">수량</label>
                  <input type="number" min={0} value={form.quantity} onChange={(e) => set("quantity", e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm" />
                </div>
              </div>
              {/* Row 3 - Pricing */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">공급가 (원)</label>
                  <input type="number" min={0} value={form.supplyPrice} onChange={(e) => set("supplyPrice", e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">판매가 (원)</label>
                  <input type="number" min={0} value={form.salePrice} onChange={(e) => set("salePrice", e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">할인금액 (원)</label>
                  <input type="number" min={0} value={form.discountAmount} onChange={(e) => set("discountAmount", e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 text-sm" />
                </div>
              </div>
              {/* Images */}
              <ImageField label="썸네일 이미지" value={form.thumbnailUrl} onChange={(v) => set("thumbnailUrl", v)} />
              <ImageField label="상세페이지 이미지" value={form.detailImageUrl} onChange={(v) => set("detailImageUrl", v)} />
              {/* Active toggle */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)}
                  className="accent-neutral-950 w-4 h-4" />
                <label htmlFor="isActive" className="text-sm font-medium text-neutral-700 cursor-pointer">판매 활성화</label>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
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

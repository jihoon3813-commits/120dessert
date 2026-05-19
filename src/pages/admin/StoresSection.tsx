import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Trash2, Edit2, X, Search, MapPin, User, Phone, Key, HelpCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const INTRODUCED_MENUS_PRESETS = [
  "120겹파이",
  "에그120",
  "크루아상",
  "에그타르트",
  "기타메뉴"
];

const STATUS_PRESETS = ["승인", "보류", "중지", "폐업"];

export default function StoresSection() {
  const stores = useQuery(api.stores.list);
  const createStore = useMutation(api.stores.create);
  const updateStore = useMutation(api.stores.update);
  const removeStore = useMutation(api.stores.remove);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Modal form state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  
  const [formStoreId, setFormStoreId] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formStoreName, setFormStoreName] = useState("");
  const [formOwnerName, setFormOwnerName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formDetailAddress, setFormDetailAddress] = useState("");
  const [formMenus, setFormMenus] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState("승인");
  const [errorMsg, setErrorMsg] = useState("");

  // Phone auto hyphen
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length < 4) return numbers;
    if (numbers.length < 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length < 11) return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormContact(formatted);
  };

  // Open Daum Postcode
  const handleAddressSearch = () => {
    const scriptId = "daum-postcode-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const executePostcode = () => {
      new (window as any).daum.Postcode({
        oncomplete: (data: any) => {
          let fullAddr = data.roadAddress;
          let extraAddr = "";

          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";

          setFormAddress(fullAddr);
        },
      }).open();
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => executePostcode();
      document.body.appendChild(script);
    } else {
      executePostcode();
    }
  };

  const openAdd = () => {
    setSelectedStoreId(null);
    setFormStoreId("");
    setFormPassword("");
    setFormStoreName("");
    setFormOwnerName("");
    setFormContact("");
    setFormAddress("");
    setFormDetailAddress("");
    setFormMenus([]);
    setFormStatus("승인");
    setErrorMsg("");
    setIsOpen(true);
  };

  const openEdit = (store: any) => {
    setSelectedStoreId(store._id);
    setFormStoreId(store.storeId);
    setFormPassword(store.password);
    setFormStoreName(store.storeName);
    setFormOwnerName(store.ownerName);
    setFormContact(store.contact);
    setFormAddress(store.address);
    setFormDetailAddress(store.detailAddress || "");
    setFormMenus(store.menus || []);
    setFormStatus(store.status);
    setErrorMsg("");
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("정말 이 가맹점 계정을 삭제하시겠습니까? 관련 데이터가 소실됩니다.")) {
      try {
        await removeStore({ id: id as Id<"stores"> });
      } catch (err) {
        alert("삭제 실패: " + err);
      }
    }
  };

  const handleMenuCheckbox = (menu: string, checked: boolean) => {
    if (checked) {
      setFormMenus([...formMenus, menu]);
    } else {
      setFormMenus(formMenus.filter((m) => m !== menu));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formStoreId || !formPassword || !formStoreName || !formOwnerName || !formContact || !formAddress) {
      setErrorMsg("필수 입력란(*)을 모두 채워주세요.");
      return;
    }

    try {
      if (selectedStoreId) {
        await updateStore({
          id: selectedStoreId as Id<"stores">,
          storeId: formStoreId,
          password: formPassword,
          storeName: formStoreName,
          ownerName: formOwnerName,
          contact: formContact,
          address: formAddress,
          detailAddress: formDetailAddress || undefined,
          menus: formMenus,
          status: formStatus,
        });
      } else {
        await createStore({
          storeId: formStoreId,
          password: formPassword,
          storeName: formStoreName,
          ownerName: formOwnerName,
          contact: formContact,
          address: formAddress,
          detailAddress: formDetailAddress || undefined,
          menus: formMenus,
          status: formStatus,
        });
      }
      setIsOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || "저장 중 오류가 발생했습니다.");
    }
  };

  // Filter
  const filtered = (stores || []).filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.storeName.toLowerCase().includes(q) ||
      s.ownerName.toLowerCase().includes(q) ||
      s.contact.includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.storeId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search and Action */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-3 text-neutral-400" size={16} />
          <input
            type="text"
            placeholder="가맹점명, 점주명, 연락처, 아이디 등으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 text-sm shadow-sm"
          />
        </div>

        {/* Add button */}
        <button
          onClick={openAdd}
          className="w-full sm:w-auto px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors shadow-sm"
        >
          + 가맹점 신규 등록
        </button>
      </div>

      {/* Stores List Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <th className="p-4">가맹점 정보</th>
                <th className="p-4">점주명 / 연락처</th>
                <th className="p-4">도입 메뉴</th>
                <th className="p-4">가맹점 주소</th>
                <th className="p-4 text-center">상태</th>
                <th className="p-4 text-center w-28">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {stores === undefined ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-400">
                    불러오는 중...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-neutral-400">
                    등록된 가맹점이 없습니다. 신규 가맹점을 등록해보세요.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s._id} className="hover:bg-neutral-50/50 transition-colors">
                    {/* Store Info */}
                    <td className="p-4">
                      <div className="font-bold text-neutral-900">{s.storeName}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">ID: {s.storeId}</div>
                    </td>

                    {/* Owner Info */}
                    <td className="p-4">
                      <div className="font-semibold text-neutral-800">{s.ownerName}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{s.contact}</div>
                    </td>

                    {/* Introduced Menus */}
                    <td className="p-4">
                      {s.menus && s.menus.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {s.menus.map((m) => (
                            <span
                              key={m}
                              className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded text-[10px] font-bold"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-neutral-400 text-xs">-</span>
                      )}
                    </td>

                    {/* Address */}
                    <td className="p-4 max-w-xs">
                      <div className="text-neutral-900 truncate font-medium">{s.address}</div>
                      {s.detailAddress && (
                        <div className="text-xs text-neutral-400 truncate mt-0.5">{s.detailAddress}</div>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 text-center">
                      <span
                        className={cn(
                          "inline-block px-2.5 py-1 rounded-full border text-[11px] font-bold shadow-sm",
                          s.status === "승인" && "bg-green-50 text-green-700 border-green-200",
                          s.status === "보류" && "bg-amber-50 text-amber-700 border-amber-200",
                          s.status === "중지" && "bg-red-50 text-red-700 border-red-200",
                          s.status === "폐업" && "bg-neutral-100 text-neutral-600 border-neutral-300"
                        )}
                      >
                        {s.status}
                      </span>
                    </td>

                    {/* Edit / Delete Buttons */}
                    <td className="p-4 text-center">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEdit(s)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors shadow-sm"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 rounded border border-red-100 bg-red-50/50 hover:bg-red-50 transition-colors shadow-sm"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Store Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <h3 className="font-bold text-neutral-900 text-base">
                {selectedStoreId ? "가맹점 상세 정보 수정" : "신규 가맹점 등록"}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Login Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    로그인 아이디 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="아이디 입력"
                    value={formStoreId}
                    onChange={(e) => setFormStoreId(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    비밀번호 *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="비밀번호 입력"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  />
                </div>
              </div>

              {/* Store & Owner Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    가맹점명 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 강남역점"
                    value={formStoreName}
                    onChange={(e) => setFormStoreName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    점주명 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formOwnerName}
                    onChange={(e) => setFormOwnerName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                  />
                </div>
              </div>

              {/* Contact & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    연락처 *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={13}
                    placeholder="010-0000-0000"
                    value={formContact}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    가맹 상태 *
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm font-bold text-neutral-800"
                  >
                    {STATUS_PRESETS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address (Daum Postcode API integration) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                  가맹점 주소 *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    readOnly
                    placeholder="도로명 주소 (검색 버튼 이용)"
                    value={formAddress}
                    className="flex-1 px-3 py-2 bg-neutral-100 border border-neutral-200 rounded-lg outline-none text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={handleAddressSearch}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors shadow-sm whitespace-nowrap shrink-0"
                  >
                    도로명 검색
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="상세 주소 입력"
                  value={formDetailAddress}
                  onChange={(e) => setFormDetailAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm"
                />
              </div>

              {/* Introduced Menus (Checkboxes) */}
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  도입 메뉴 선택
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                  {INTRODUCED_MENUS_PRESETS.map((menu) => {
                    const isChecked = formMenus.includes(menu);
                    return (
                      <label
                        key={menu}
                        className={cn(
                          "flex items-center gap-2 px-2.5 py-1.5 bg-white border rounded-lg cursor-pointer text-xs font-bold select-none transition-colors hover:bg-neutral-50",
                          isChecked ? "border-neutral-950 text-neutral-950 bg-neutral-50" : "border-neutral-200 text-neutral-600"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleMenuCheckbox(menu, e.target.checked)}
                          className="accent-neutral-950 w-3.5 h-3.5 rounded border-neutral-300"
                        />
                        <span>{menu}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-neutral-200 text-neutral-700 text-sm font-bold rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

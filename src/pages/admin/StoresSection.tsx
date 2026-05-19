import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { 
  Trash2, 
  Edit2, 
  X, 
  Search, 
  MapPin, 
  User, 
  Phone, 
  Key, 
  HelpCircle, 
  Download, 
  FileSpreadsheet, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "../../lib/utils";

const STATUS_PRESETS = ["승인", "보류", "중지", "폐업"];

export default function StoresSection() {
  const stores = useQuery(api.stores.list);
  const categories = useQuery(api.categories.list) || [];
  const createStore = useMutation(api.stores.create);
  const updateStore = useMutation(api.stores.update);
  const removeStore = useMutation(api.stores.remove);
  const createMultipleStores = useMutation(api.stores.createMultiple);

  // Dynamic intro menus preset from categories table
  const introducedMenusPresets = categories.length > 0
    ? categories.map((c) => c.name)
    : ["120겹파이", "에그120", "크루아상", "에그타르트", "기타메뉴"];

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
  const [formRegisterDate, setFormRegisterDate] = useState("");
  const [formCancellationDate, setFormCancellationDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Bulk upload modal states
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [parsedBulkData, setParsedBulkData] = useState<any[]>([]);
  const [bulkErrors, setBulkErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ successCount: number; errorCount: number; details: any[] } | null>(null);

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
    setFormRegisterDate("");
    setFormCancellationDate("");
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
    setFormRegisterDate(store.registerDate || "");
    setFormCancellationDate(store.cancellationDate || "");
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
          registerDate: formRegisterDate || undefined,
          cancellationDate: formCancellationDate || undefined,
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
          registerDate: formRegisterDate || undefined,
          cancellationDate: formCancellationDate || undefined,
        });
      }
      setIsOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || "저장 중 오류가 발생했습니다.");
    }
  };

  // CSV Parser helper
  const parseCSV = (text: string): string[][] => {
    const lines = [];
    let row: string[] = [];
    let inQuotes = false;
    let currentVal = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentVal += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentVal.trim());
        currentVal = "";
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        row.push(currentVal.trim());
        lines.push(row);
        row = [];
        currentVal = "";
      } else {
        currentVal += char;
      }
    }
    if (currentVal || row.length > 0) {
      row.push(currentVal.trim());
      lines.push(row);
    }
    return lines.filter(r => r.length > 0 && r.some(cell => cell !== ""));
  };

  // Download Sample CSV
  const handleDownloadSample = () => {
    const headers = [
      "아이디*",
      "비밀번호*",
      "가맹점명*",
      "점주명*",
      "연락처*",
      "도로명주소*",
      "상세주소",
      "가맹상태(승인/보류/중지/폐업)*",
      "등록일(YYYY-MM-DD)",
      "해지일(YYYY-MM-DD)",
      ...introducedMenusPresets.map((menu) => `${menu}(Y/N)`)
    ];

    const exampleRow = [
      "seoul_01",
      "pwd123",
      "서울강남점",
      "이순신",
      "010-9876-5432",
      "서울 강남구 테헤란로 123",
      "4층",
      "승인",
      "2026-05-19",
      "",
      ...introducedMenusPresets.map(() => "Y")
    ];

    const csvContent = "\uFEFF" + [
      headers.join(","),
      exampleRow.join(",")
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "가맹점_일괄등록_양식.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Bulk File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBulkFile(file);
    setUploadResult(null);
    setBulkErrors([]);
    setParsedBulkData([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsedRows = parseCSV(text);
        if (parsedRows.length < 2) {
          setBulkErrors(["데이터 행이 없는 빈 파일이거나 올바르지 않은 형식입니다."]);
          return;
        }

        const headerRow = parsedRows[0].map(h => h.replace(/[\*]/g, "").trim());
        const dataRows = parsedRows.slice(1);

        const idIdx = headerRow.findIndex(h => h.includes("아이디"));
        const pwdIdx = headerRow.findIndex(h => h.includes("비밀번호"));
        const storeNameIdx = headerRow.findIndex(h => h.includes("가맹점명"));
        const ownerNameIdx = headerRow.findIndex(h => h.includes("점주명"));
        const contactIdx = headerRow.findIndex(h => h.includes("연락처"));
        const addressIdx = headerRow.findIndex(h => h.includes("도로명주소"));
        const detailAddressIdx = headerRow.findIndex(h => h.includes("상세주소"));
        const statusIdx = headerRow.findIndex(h => h.includes("가맹상태"));
        const regDateIdx = headerRow.findIndex(h => h.includes("등록일"));
        const cancelDateIdx = headerRow.findIndex(h => h.includes("해지일"));

        if (idIdx === -1 || pwdIdx === -1 || storeNameIdx === -1 || ownerNameIdx === -1 || contactIdx === -1 || addressIdx === -1) {
          setBulkErrors(["필수 열 헤더가 누락되었습니다. (템플릿에 지정된 '아이디', '비밀번호', '가맹점명' 등의 이름이 유지되어야 합니다.)"]);
          return;
        }

        // Map introduction menus
        const menuMappings = introducedMenusPresets.map((menu) => {
          const colIdx = headerRow.findIndex(h => h.startsWith(menu));
          return { menu, colIdx };
        });

        const parsedStores = [];
        const errors = [];

        for (let i = 0; i < dataRows.length; i++) {
          const row = dataRows[i];
          const rowNum = i + 2;

          const storeId = row[idIdx] || "";
          const password = row[pwdIdx] || "";
          const storeName = row[storeNameIdx] || "";
          const ownerName = row[ownerNameIdx] || "";
          const contact = row[contactIdx] || "";
          const address = row[addressIdx] || "";
          const detailAddress = row[detailAddressIdx] || "";
          const status = row[statusIdx] || "승인";
          const registerDate = row[regDateIdx] || "";
          const cancellationDate = row[cancelDateIdx] || "";

          if (!storeId || !password || !storeName || !ownerName || !contact || !address) {
            errors.push(`${rowNum}행: 필수 정보(아이디, 비밀번호, 가맹점명, 점주명, 연락처, 도로명주소)가 누락되었습니다.`);
            continue;
          }

          const menus: string[] = [];
          menuMappings.forEach(({ menu, colIdx }) => {
            if (colIdx !== -1 && row[colIdx]) {
              const val = row[colIdx].toUpperCase().trim();
              if (val === "Y" || val === "YES" || val === "예" || val === "1") {
                menus.push(menu);
              }
            }
          });

          parsedStores.push({
            storeId,
            password,
            storeName,
            ownerName,
            contact,
            address,
            detailAddress: detailAddress || undefined,
            menus,
            status,
            registerDate: registerDate || undefined,
            cancellationDate: cancellationDate || undefined,
          });
        }

        setParsedBulkData(parsedStores);
        if (errors.length > 0) {
          setBulkErrors(errors);
        }
      } catch (err: any) {
        setBulkErrors(["파일을 읽는 과정에서 오류가 발생했습니다: " + err.message]);
      }
    };
    reader.readAsText(file);
  };

  // Submit Bulk Upload
  const handleBulkSubmit = async () => {
    if (parsedBulkData.length === 0) return;
    setIsUploading(true);
    try {
      const res = await createMultipleStores({ stores: parsedBulkData });
      const successCount = res.filter(r => r.success).length;
      const errorCount = res.filter(r => !r.success).length;
      setUploadResult({
        successCount,
        errorCount,
        details: res
      });
      setParsedBulkData([]);
      setBulkFile(null);
    } catch (err: any) {
      alert("일괄 업로드 중 오류가 발생했습니다: " + err.message);
    } finally {
      setIsUploading(false);
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

        {/* Buttons */}
        <div className="flex w-full sm:w-auto gap-2">
          <button
            onClick={() => {
              setBulkFile(null);
              setParsedBulkData([]);
              setBulkErrors([]);
              setUploadResult(null);
              setIsBulkOpen(true);
            }}
            className="flex-grow sm:flex-grow-0 px-4 py-2 border border-neutral-200 bg-white text-neutral-700 text-sm font-bold rounded-lg hover:bg-neutral-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <Download size={14} className="rotate-180 text-neutral-500" />
            엑셀 일괄 등록
          </button>
          <button
            onClick={openAdd}
            className="flex-grow sm:flex-grow-0 px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors shadow-sm whitespace-nowrap"
          >
            + 가맹점 신규 등록
          </button>
        </div>
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
                      <div className="text-[10px] text-neutral-500 mt-1.5 flex flex-col gap-0.5">
                        {s.registerDate && (
                          <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-green-500"></span>
                            등록일: {s.registerDate}
                          </span>
                        )}
                        {s.cancellationDate && (
                          <span className="flex items-center gap-1 text-red-500 font-bold">
                            <span className="w-1 h-1 rounded-full bg-red-500"></span>
                            해지일: {s.cancellationDate}
                          </span>
                        )}
                      </div>
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
                              className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded text-[10px] font-bold animate-in fade-in duration-200"
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

              {/* Registration & Cancellation Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    가맹 등록일
                  </label>
                  <input
                    type="date"
                    value={formRegisterDate}
                    onChange={(e) => setFormRegisterDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm text-neutral-800 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    가맹 해지일
                  </label>
                  <input
                    type="date"
                    value={formCancellationDate}
                    onChange={(e) => setFormCancellationDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 focus:bg-white text-sm text-neutral-800 font-bold"
                  />
                </div>
              </div>

              {/* Introduced Menus (Checkboxes) */}
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  도입 메뉴 선택
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                  {introducedMenusPresets.map((menu) => {
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

      {/* Bulk Upload Modal */}
      {isBulkOpen && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="text-amber-500" size={20} />
                <h3 className="font-bold text-neutral-900 text-base">가맹점 엑셀 일괄 등록</h3>
              </div>
              <button 
                onClick={() => setIsBulkOpen(false)} 
                disabled={isUploading}
                className="text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Step 1: Download Format */}
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider">
                  STEP 1. 최신 양식 다운로드
                </h4>
                <p className="text-xs text-amber-700 leading-relaxed font-medium">
                  현재 등록된 도입 메뉴 카테고리 정보가 포함된 최신 엑셀(CSV) 양식을 내려받아 작성해 주세요.
                  (카테고리 수정 시 양식 내용도 동적으로 자동 업데이트됩니다.)
                </p>
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="px-3.5 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Download size={13} />
                  일괄등록 샘플 양식 다운로드 (.csv)
                </button>
              </div>

              {/* Step 2: File Upload */}
              <div className="border border-dashed border-neutral-300 rounded-xl p-5 text-center bg-neutral-50/30">
                <h4 className="text-xs font-black text-neutral-600 uppercase tracking-wider mb-2">
                  STEP 2. 작성된 CSV 파일 업로드
                </h4>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                  id="bulk-file-input"
                />
                <label
                  htmlFor="bulk-file-input"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 bg-white text-neutral-700 text-xs font-bold rounded-lg hover:bg-neutral-50 cursor-pointer shadow-sm select-none"
                >
                  <FileSpreadsheet size={14} className="text-neutral-500" />
                  {bulkFile ? `${bulkFile.name} (변경)` : "CSV 파일 선택"}
                </label>
              </div>

              {/* Upload Result / Progress Report */}
              {uploadResult && (
                <div className={cn(
                  "p-4 border rounded-xl space-y-2",
                  uploadResult.errorCount === 0 ? "bg-green-50 border-green-200 text-green-800" : "bg-neutral-50 border-neutral-200 text-neutral-800"
                )}>
                  <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1">
                    {uploadResult.errorCount === 0 ? <CheckCircle2 size={14} className="text-green-600" /> : <AlertCircle size={14} className="text-neutral-500" />}
                    일괄 등록 처리 완료 리포트
                  </h4>
                  <div className="text-xs font-bold space-y-1">
                    <p className="text-green-600">✔ 성공 가맹점 수: {uploadResult.successCount}건</p>
                    <p className={cn(uploadResult.errorCount > 0 ? "text-red-600" : "text-neutral-500")}>
                      ✘ 실패 가맹점 수: {uploadResult.errorCount}건
                    </p>
                  </div>
                  {uploadResult.details.filter(d => !d.success).length > 0 && (
                    <div className="mt-2.5 max-h-28 overflow-y-auto border border-red-200 bg-white rounded-lg p-2.5 space-y-1 text-[10px] text-red-600 font-medium">
                      {uploadResult.details.filter(d => !d.success).map((d, idx) => (
                        <div key={idx}>• ID: {d.storeId} - {d.error}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Errors report */}
              {bulkErrors.length > 0 && (
                <div className="p-4 border border-red-200 bg-red-50/50 rounded-xl space-y-1.5 text-xs text-red-700 font-semibold">
                  <div className="flex items-center gap-1">
                    <AlertCircle size={14} className="shrink-0" />
                    파일 내 검증 오류 발생:
                  </div>
                  <div className="max-h-24 overflow-y-auto pl-5 list-disc space-y-0.5 font-medium text-[11px]">
                    {bulkErrors.map((err, idx) => (
                      <div key={idx}>• {err}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Table Preview */}
              {parsedBulkData.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-neutral-600 uppercase tracking-wider">
                    등록 예정 가맹점 미리보기 ({parsedBulkData.length}건)
                  </h4>
                  <div className="border border-neutral-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto bg-white">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead className="bg-neutral-50 text-neutral-500 font-bold border-b border-neutral-200 sticky top-0">
                        <tr>
                          <th className="p-2">아이디</th>
                          <th className="p-2">가맹점명</th>
                          <th className="p-2">점주명</th>
                          <th className="p-2">연락처</th>
                          <th className="p-2">가맹점 주소</th>
                          <th className="p-2">도입메뉴 수</th>
                          <th className="p-2">상태</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-neutral-700">
                        {parsedBulkData.map((data, idx) => (
                          <tr key={idx} className="hover:bg-neutral-50">
                            <td className="p-2 font-mono">{data.storeId}</td>
                            <td className="p-2 font-bold">{data.storeName}</td>
                            <td className="p-2">{data.ownerName}</td>
                            <td className="p-2">{data.contact}</td>
                            <td className="p-2 truncate max-w-[100px]">{data.address}</td>
                            <td className="p-2 font-bold text-amber-600">{data.menus?.length || 0}개</td>
                            <td className="p-2">{data.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsBulkOpen(false)}
                disabled={isUploading}
                className="px-4 py-2 border border-neutral-200 text-neutral-700 text-sm font-bold rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={handleBulkSubmit}
                disabled={isUploading || parsedBulkData.length === 0}
                className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-amber-50 hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    등록 중...
                  </>
                ) : (
                  `가맹점 일괄 등록 진행 (${parsedBulkData.length}건)`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

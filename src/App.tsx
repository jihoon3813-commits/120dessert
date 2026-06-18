import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import FranchiseInquiry from "./pages/FranchiseInquiry";
import OwnerPortal from "./pages/OwnerPortal";
import Stores from "./pages/Stores";
import Admin from "./pages/Admin";
import HomeV2 from "./pages/HomeV2";
import HomeV3 from "./pages/HomeV3";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인 루트(/) 주소 접속 시 바로 완벽한 V3 랜딩을 띄웁니다! */}
          <Route index element={<HomeV3 />} />
          <Route path="v1" element={<Home />} />
          <Route path="inquiry" element={<FranchiseInquiry />} />
          <Route path="portal" element={<OwnerPortal />} />
          <Route path="stores" element={<Stores />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        {/* 새로운 메인 랜딩 (V2) - 자체 헤더와 푸터 적용 */}
        <Route path="v2" element={<HomeV2 />} />
        {/* 완벽한 신규 랜딩 (V3) - 자체 다크 헤더와 푸터 적용 */}
        <Route path="v3" element={<HomeV3 />} />
      </Routes>
    </HashRouter>
  );
}



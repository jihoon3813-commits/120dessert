import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import BrandIntro from "./pages/BrandIntro";
import AdoptionGuide from "./pages/AdoptionGuide";
import FranchiseInquiry from "./pages/FranchiseInquiry";
import OwnerPortal from "./pages/OwnerPortal";
import Stores from "./pages/Stores";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="brand" element={<BrandIntro />} />
          <Route path="adoption" element={<AdoptionGuide />} />
          <Route path="inquiry" element={<FranchiseInquiry />} />
          <Route path="portal" element={<OwnerPortal />} />
          <Route path="stores" element={<Stores />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

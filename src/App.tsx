import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import FranchiseInquiry from "./pages/FranchiseInquiry";
import OwnerPortal from "./pages/OwnerPortal";
import Stores from "./pages/Stores";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="inquiry" element={<FranchiseInquiry />} />
          <Route path="portal" element={<OwnerPortal />} />
          <Route path="stores" element={<Stores />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}


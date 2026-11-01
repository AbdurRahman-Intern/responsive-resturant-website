// All page routes in one place.
//   "/"      -> HomePage
//   "/menu"  -> MenuPage
//   "*"      -> NotFoundPage (any other URL)
// TODO: when the SaaS dashboard exists, add routes like "/dashboard" here.
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

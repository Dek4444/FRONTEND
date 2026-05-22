import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import PembicaraPage from "./pages/PembicaraPage";
import EventsPage from "./pages/EventsPage";
import BiodataPage from "./pages/BiodataPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/biodata" element={<BiodataPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/pembicara" element={<PembicaraPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import Dashboard from "@/pages/Dashboard";
import Goals from "@/pages/Goals";
import Journal from "@/pages/Journal";
import Coach from "@/pages/Coach";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import DailyPlan from "@/components/home/DailyPlan";
import Coach from "@/pages/Coach";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home />} />

          <Route path="/planner" element={<DailyPlan />} />

          {/* Temporary */}
          <Route path="/journal" element={<Home />} />
          <Route path="/analytics" element={<Home />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/goals" element={<Home />} />
          <Route path="/settings" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
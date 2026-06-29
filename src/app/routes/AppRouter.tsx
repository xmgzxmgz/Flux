import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { AppLayout } from "@/app/routes/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { TripListPage } from "@/pages/TripListPage";
import { TripDetailPage } from "@/pages/TripDetailPage";
import { TripPlannerPage } from "@/pages/TripPlannerPage";
import { SettingsPage } from "@/pages/SettingsPage";

function AppShell() {
  useTheme();
  return (
    <div className="min-h-dvh bg-bg text-zinc-100">
      <div className="mx-auto w-full max-w-[1440px]">
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/trips" element={<TripListPage />} />
            <Route path="/trips/:id" element={<TripDetailPage />} />
            <Route path="/planner" element={<TripPlannerPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

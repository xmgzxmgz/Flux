import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/app/routes/AppLayout";
import { WorkspacePage } from "@/pages/WorkspacePage";
import { EditorPage } from "@/pages/EditorPage";
import { ExportPage } from "@/pages/ExportPage";
import { SettingsPage } from "@/pages/SettingsPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<WorkspacePage />} />
          <Route path="/editor/:projectId" element={<EditorPage />} />
          <Route path="/export/:projectId" element={<ExportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


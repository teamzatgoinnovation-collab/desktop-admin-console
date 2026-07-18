import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppShell } from "@/layouts/AppShell";
import { hydrateErpnextSession } from "@/lib/client";
import { ApiKeysPage } from "@/pages/ApiKeysPage";
import { BranchesPage } from "@/pages/BranchesPage";
import { CompaniesPage } from "@/pages/CompaniesPage";
import { ConnectionPage } from "@/pages/ConnectionPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { LogsPage } from "@/pages/LogsPage";
import { RolesPage } from "@/pages/RolesPage";
import { UsersPage } from "@/pages/UsersPage";
import { useSessionStore } from "@/store/session";

const Router = window.zatgoDesktop ? HashRouter : BrowserRouter;

function RequireAuth({ children }: { children: React.ReactNode }) {
  const connected = useSessionStore((s) => s.connected);
  if (!connected) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="branches" element={<BranchesPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="api-keys" element={<ApiKeysPage />} />
        <Route path="connection" element={<ConnectionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void hydrateErpnextSession().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[var(--color-muted-foreground)]">
        Loading…
      </div>
    );
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

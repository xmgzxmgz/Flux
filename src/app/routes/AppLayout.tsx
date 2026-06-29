import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const NAV_ITEMS = [
  { to: "/", label: "仪表盘", exact: true },
  { to: "/trips", label: "行程列表", exact: false },
  { to: "/planner", label: "规划行程", exact: false },
  { to: "/settings", label: "设置", exact: false },
];

function TopNav({ onToggleSidebar, sidebarOpen }: { onToggleSidebar: () => void; sidebarOpen: boolean }) {
  const { isDark } = useTheme();
  const navItemBase =
    "rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white";

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="mr-1 rounded-md p-2 text-zinc-300 transition hover:bg-white/5 hover:text-white md:hidden"
            aria-label={sidebarOpen ? "关闭侧边栏" : "打开侧边栏"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d={sidebarOpen ? "M5 5l10 10M15 5L5 15" : "M3 5h14M3 10h14M3 15h14"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/40" />
            <span className="text-sm font-bold tracking-wide">Flux</span>
            <span className="hidden text-xs text-zinc-500 sm:inline">MotoViz</span>
          </div>
          <div className="hidden items-center gap-1 rounded-full border border-border bg-panel px-2 py-0.5 text-xs text-zinc-400 md:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>本地优先</span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                cn(navItemBase, isActive && "bg-white/10 text-white")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="text-xs text-zinc-500">
          {isDark ? "🌙" : "☀"}
        </div>
      </div>
    </header>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navItemBase =
    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 flex h-full w-60 flex-col border-r border-border bg-bg/95 backdrop-blur-md transition-transform duration-200 md:sticky md:top-[57px] md:z-10 md:h-[calc(100dvh-57px)] md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-1 p-3 pt-16 md:pt-4">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={onClose}
              className={({ isActive }) =>
                cn(navItemBase, isActive && "bg-white/10 text-white")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto border-t border-border p-4">
          <p className="text-xs text-zinc-500">Flux MotoViz v1.0</p>
          <p className="mt-1 text-xs text-zinc-600">数据存储在本地浏览器中</p>
        </div>
      </aside>
    </>
  );
}

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh">
      <TopNav
        onToggleSidebar={() => setSidebarOpen(v => !v)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

function TopNav() {
  const navItemBase =
    "rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white";

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-black/40 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <div className="text-sm font-semibold tracking-wide">MotoViz</div>
          </div>
          <div className="hidden items-center gap-1 rounded-full border border-border bg-panel px-2 py-0.5 text-xs text-zinc-200 md:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>本地优先</span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(navItemBase, isActive && "bg-white/10 text-white")
            }
          >
            工作台
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(navItemBase, isActive && "bg-white/10 text-white")
            }
          >
            设置
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export function AppLayout() {
  return (
    <div>
      <TopNav />
      <main className="px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

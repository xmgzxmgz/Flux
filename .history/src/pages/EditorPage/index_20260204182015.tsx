import { Link, useParams } from "react-router-dom";

export function EditorPage() {
  const { projectId } = useParams();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-xl border border-border bg-panel p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">轨迹编辑器</h1>
            <p className="mt-1 text-sm text-zinc-300">Project: {projectId}</p>
          </div>
          <Link
            to={`/export/${projectId ?? "demo"}`}
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
          >
            去导出
          </Link>
        </div>
        <div className="mt-4 aspect-[16/10] w-full rounded-lg border border-border bg-black/30" />
      </section>

      <section className="rounded-xl border border-border bg-panel p-5 shadow-soft">
        <h2 className="text-sm font-semibold text-zinc-100">属性面板</h2>
        <div className="mt-3 grid gap-3">
          <div className="rounded-lg border border-border bg-black/20 p-3">
            <div className="text-xs font-medium text-zinc-200">外观</div>
            <div className="mt-2 h-9 rounded-md border border-border bg-black/20" />
          </div>
          <div className="rounded-lg border border-border bg-black/20 p-3">
            <div className="text-xs font-medium text-zinc-200">信息层</div>
            <div className="mt-2 h-9 rounded-md border border-border bg-black/20" />
          </div>
          <div className="rounded-lg border border-border bg-black/20 p-3">
            <div className="text-xs font-medium text-zinc-200">动画</div>
            <div className="mt-2 h-9 rounded-md border border-border bg-black/20" />
          </div>
        </div>
      </section>
    </div>
  );
}


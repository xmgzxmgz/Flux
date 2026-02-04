import { Link, useParams } from "react-router-dom";

export function ExportPage() {
  const { projectId } = useParams();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-xl border border-border bg-panel p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">导出与发布</h1>
            <p className="mt-1 text-sm text-zinc-300">Project: {projectId}</p>
          </div>
          <Link
            to={`/editor/${projectId ?? "demo"}`}
            className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
          >
            返回编辑
          </Link>
        </div>
        <div className="mt-4 aspect-[16/10] w-full rounded-lg border border-border bg-black/30" />
      </section>

      <section className="rounded-xl border border-border bg-panel p-5 shadow-soft">
        <h2 className="text-sm font-semibold text-zinc-100">导出参数</h2>
        <div className="mt-3 grid gap-3">
          <div className="rounded-lg border border-border bg-black/20 p-3">
            <div className="text-xs font-medium text-zinc-200">类型</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button className="rounded-md bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-400">
                海报
              </button>
              <button className="rounded-md border border-border bg-white/5 px-3 py-2 text-xs font-medium text-zinc-100 transition hover:bg-white/10">
                动画
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-black/20 p-3">
            <div className="text-xs font-medium text-zinc-200">分辨率</div>
            <select className="mt-2 w-full rounded-md border border-border bg-black/20 px-3 py-2 text-sm text-zinc-100">
              <option>1080p</option>
              <option>2K</option>
              <option>4K</option>
            </select>
          </div>
          <button className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-400">
            开始导出
          </button>
        </div>
      </section>
    </div>
  );
}


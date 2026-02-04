import { useRef, useState } from "react";
import { Link } from "react-router-dom";

type ImportState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; fileName: string };

export function WorkspacePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<ImportState>({ status: "idle" });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-border bg-panel p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">导入轨迹文件</h1>
            <p className="mt-1 text-sm text-zinc-300">
              GPX/FIT/TCX 将在浏览器本地解析，不上传原始坐标点。
            </p>
          </div>
          <button
            type="button"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
            onClick={() => inputRef.current?.click()}
          >
            选择文件
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".gpx,.fit,.tcx"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setState({ status: "loading" });
            try {
              await new Promise((r) => setTimeout(r, 400));
              setState({ status: "done", fileName: file.name });
            } catch {
              setState({ status: "error", message: "文件解析失败，请检查文件是否损坏。" });
            } finally {
              e.target.value = "";
            }
          }}
        />

        <div className="mt-4">
          {state.status === "idle" && (
            <div className="rounded-lg border border-border bg-black/20 p-4 text-sm text-zinc-300">
              支持拖拽导入与多文件队列（后续实现）。
            </div>
          )}
          {state.status === "loading" && (
            <div className="rounded-lg border border-border bg-black/20 p-4 text-sm text-zinc-200">
              正在解析…
            </div>
          )}
          {state.status === "error" && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
              {state.message}
            </div>
          )}
          {state.status === "done" && (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-50">
              已接收文件：{state.fileName}
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  to="/editor/demo"
                  className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-400"
                >
                  进入编辑器
                </Link>
                <Link
                  to="/export/demo"
                  className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
                >
                  去导出
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-panel p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">项目列表</h2>
            <p className="mt-1 text-sm text-zinc-300">IndexedDB 持久化将在下一步接入。</p>
          </div>
          <div className="w-full max-w-[280px]">
            <input
              placeholder="搜索项目…"
              className="w-full rounded-md border border-border bg-black/20 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border bg-black/15 p-4 transition hover:bg-black/20"
            >
              <div className="h-20 rounded-md bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-emerald-500/10" />
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-zinc-100">示例项目</div>
                  <div className="mt-0.5 text-xs text-zinc-400">尚未保存</div>
                </div>
                <Link
                  to="/editor/demo"
                  className="rounded-md border border-border bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-100 transition hover:bg-white/10"
                >
                  打开
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


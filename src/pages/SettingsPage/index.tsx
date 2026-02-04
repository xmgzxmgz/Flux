export function SettingsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-border bg-panel p-5 shadow-soft">
        <h1 className="text-lg font-semibold">设置与隐私</h1>
        <p className="mt-1 text-sm text-zinc-300">
          默认离线/本地解析，不上传原始轨迹文件与坐标点。
        </p>
        <div className="mt-4 grid gap-3">
          <div className="rounded-lg border border-border bg-black/20 p-4">
            <div className="text-sm font-medium">离线模式</div>
            <div className="mt-1 text-xs text-zinc-400">下一步接入网络拦截策略。</div>
            <button className="mt-3 rounded-md bg-white/5 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10">
              已开启
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-panel p-5 shadow-soft">
        <h2 className="text-sm font-semibold text-zinc-100">本地存储</h2>
        <div className="mt-3 rounded-lg border border-border bg-black/20 p-4">
          <div className="text-sm font-medium">缓存占用</div>
          <div className="mt-1 text-xs text-zinc-400">下一步接入空间估算与清理。</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10">
              清理缓存
            </button>
            <button className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-100 transition hover:bg-red-500/15">
              删除所有项目
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


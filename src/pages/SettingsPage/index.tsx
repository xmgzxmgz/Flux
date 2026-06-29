import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTrips } from '@/hooks/useTrips';

export function SettingsPage() {
  const { toggleTheme, isDark } = useTheme();
  const { trips, clearAll, exportData, importData } = useTrips();
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flux-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const success = importData(text);
        setImportStatus(success ? '导入成功！' : '导入失败：文件格式不正确');
      } catch {
        setImportStatus('导入失败：无法读取文件');
      }
      setTimeout(() => setImportStatus(null), 3000);
    };
    input.click();
  };

  const handleClearCache = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('flux-')) {
        // Keep theme setting
        if (key !== 'flux-theme') {
          localStorage.removeItem(key);
        }
      }
    });
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2000);
  };

  const handleDeleteAll = () => {
    if (window.confirm('确定删除所有行程数据吗？此操作不可撤销！')) {
      clearAll();
    }
  };

  const estimateStorage = () => {
    try {
      const raw = localStorage.getItem('flux-trips') || '';
      const bytes = new Blob([raw]).size;
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    } catch {
      return '未知';
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">设置</h1>
        <p className="mt-1 text-sm text-zinc-400">应用偏好与数据管理</p>
      </div>

      <div className="card card-padding space-y-4">
        <h2 className="text-sm font-semibold">外观</h2>
        <div className="flex items-center justify-between rounded-lg border border-border bg-black/20 p-4">
          <div>
            <div className="text-sm font-medium">主题</div>
            <div className="mt-0.5 text-xs text-zinc-400">当前：{isDark ? '深色模式' : '浅色模式'}</div>
          </div>
          <button onClick={toggleTheme} className="btn-secondary">
            切换为{isDark ? '浅色' : '深色'}
          </button>
        </div>
      </div>

      <div className="card card-padding space-y-4">
        <h2 className="text-sm font-semibold">数据管理</h2>

        <div className="rounded-lg border border-border bg-black/20 p-4">
          <div className="text-sm font-medium">导出数据</div>
          <div className="mt-0.5 text-xs text-zinc-400">将所有行程数据导出为 JSON 文件</div>
          <button onClick={handleExport} className="btn-primary mt-3">
            导出备份
          </button>
        </div>

        <div className="rounded-lg border border-border bg-black/20 p-4">
          <div className="text-sm font-medium">导入数据</div>
          <div className="mt-0.5 text-xs text-zinc-400">从 JSON 备份文件恢复行程数据</div>
          <div className="mt-3 flex items-center gap-3">
            <button onClick={handleImport} className="btn-secondary">
              选择文件导入
            </button>
            {importStatus && (
              <span className={`text-xs ${importStatus.includes('成功') ? 'text-emerald-400' : 'text-red-400'}`}>
                {importStatus}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="card card-padding space-y-4">
        <h2 className="text-sm font-semibold">本地存储</h2>

        <div className="rounded-lg border border-border bg-black/20 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">缓存占用</div>
            <span className="text-xs text-zinc-400">{estimateStorage()}</span>
          </div>
          <div className="mt-1 text-xs text-zinc-500">共 {trips.length} 条行程记录</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={handleClearCache} className="btn-secondary">
              {cacheCleared ? '已清理！' : '清理缓存'}
            </button>
            <button onClick={handleDeleteAll} className="btn-danger">
              删除所有行程
            </button>
          </div>
        </div>
      </div>

      <div className="card card-padding space-y-3">
        <h2 className="text-sm font-semibold">隐私</h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Flux 坚持本地优先原则。所有行程数据存储在你的浏览器 localStorage 中，
          不会上传到任何服务器。导出的备份文件也完全在本地生成。
        </p>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          零网络请求，完全离线可用
        </div>
      </div>
    </div>
  );
}

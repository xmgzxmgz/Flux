# ⚡ Flux (MotoViz)

[![CI](https://github.com/xmgzxmgz/Flux/actions/workflows/ci.yml/badge.svg)](https://github.com/xmgzxmgz/Flux/actions/workflows/ci.yml)

> 基于 React 19 + TypeScript 的摩托车旅行记录与规划平台。

## ✨ 功能

- 🗺️ **旅行规划** — 创建和管理摩托车旅行计划
- 📋 **旅行记录** — 记录每次骑行的路线、时间、花费
- 📊 **数据看板** — 骑行统计、里程趋势、费用分析
- 📸 **详情展示** — 旅行详情页，包含照片和笔记
- 🌓 **暗色/亮色主题** — 自动或手动切换
- 📱 **响应式布局** — 适配桌面和移动端
- ✅ **单元测试** — 核心逻辑测试覆盖

## 🛠️ 技术栈

- **前端**: React 19 + TypeScript + Vite
- **样式**: Tailwind CSS
- **路由**: React Router v7
- **图标**: Lucide React
- **构建**: Vite + pnpm
- **测试**: Vitest

## 🚀 快速开始

```bash
pnpm install
pnpm dev      # 开发服务器
pnpm build    # 生产构建
pnpm test     # 运行测试
pnpm preview  # 预览构建结果
```

## 📁 项目结构

```
src/
├── pages/
│   ├── DashboardPage/     # 数据看板
│   ├── TripListPage/      # 旅行列表
│   ├── TripDetailPage/    # 旅行详情
│   ├── TripPlannerPage/   # 旅行规划
│   └── SettingsPage/      # 设置
├── components/            # 通用组件
├── hooks/                 # 自定义 Hooks (useTheme, useTrips)
├── lib/                   # 工具函数
├── shared/types/          # TypeScript 类型定义
└── main.tsx               # 入口
```

## 📄 License

MIT

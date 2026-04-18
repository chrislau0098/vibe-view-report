# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**vibe-view-report-1** 是一份为「得到 App · 《时间的朋友》2026 开年数据战报」生成的 React 单页长图网站。参考小米年度战报的分节长图结构，采用飞书 Q3 / Pintopay 式深色剧场审美，以爱马仕橙为品牌锚点。

**设计与风格已在 `DESIGN.md` 中冻结。生成 UI 前必须先通读 `DESIGN.md`。**

**生产指令见 `SystemPrompt.md`。该文件是给后续 Claude Code 执行生成的完整指令。**

## Development Workflow

1. **Read First**: `DESIGN.md` → `SystemPrompt.md` → `docs/references/*.png`
2. **Implement Sections 顺序**：`src/data.ts` → primitives → `<Hero>` → 6 个 Section → `<Footer>` → `App.tsx` 编排
3. **Verify**: `npm run dev` 打开浏览器滚屏检查；`npm run lint` 必须零 error

## Commands

```bash
npm run dev        # Vite dev server with HMR
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run preview    # Preview production build
```

## Tech Stack

| Layer | Tool | 状态 |
|---|---|---|
| Framework | React 19 + TypeScript | ✅ 已装 |
| Bundler | Vite 8 | ✅ 已装 |
| Styling | Tailwind CSS v4 (CSS-first，无 `tailwind.config.js`) | ✅ 已装 |
| Animation | `motion/react` (Framer Motion v12+) | ✅ 已装 |
| UI | shadcn/ui (Tailwind v4 mode) | ✅ 已装 |
| Headless | `@base-ui/react` | ✅ 已装 |
| English Font | Geist Variable | ✅ 已装 |
| Icons | `lucide-react` | ✅ 已装 |
| 图表库 | Recharts 3 + shadcn/chart | ✅ 已装 |
| 中文黑体 | `@fontsource-variable/noto-sans-sc` | ✅ 已装 |

Path alias: `@/` → `./src/`

## Architecture

```
src/
├── App.tsx                  # 单页编排：Hero → 6 Sections → Footer
├── index.css                # 全局 tokens (oklch) + @theme 映射 + 字体 import
├── data.ts                  # 战报数据源（11 个指标的结构化 export）
├── lib/
│   ├── utils.ts             # cn() (clsx + tailwind-merge)
│   └── easings.ts           # EASE.out / EASE.bounce 等 motion easing 常量
├── components/
│   ├── ui/                  # shadcn 原生组件（button / card / chart…）
│   ├── primitives/          # 自制底层组件
│   │   ├── RollingNumber.tsx
│   │   ├── DeltaBadge.tsx
│   │   ├── SpotlightGradient.tsx
│   │   ├── ChapterStamp.tsx
│   │   └── OwlSilhouette.tsx
│   ├── charts/              # 图表组件
│   │   ├── GrowthCurve.tsx      # Hero 自绘 SVG 曲线
│   │   ├── ComparisonBar.tsx    # 双条形对比
│   │   └── YoYChart.tsx         # 同比曲线（Recharts）
│   └── sections/            # 页面分节
│       ├── Hero.tsx
│       ├── SectionViewership.tsx
│       ├── SectionExposure.tsx
│       ├── SectionDepth.tsx
│       ├── SectionScale.tsx
│       ├── SectionGrowth.tsx
│       └── SectionOutro.tsx
└── assets/                  # 内部素材（猫头鹰 SVG / spotlight 等）
```

## Critical Engineering Constraints

### Motion easing — 数组格式 only

```tsx
// ✅
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
// ❌ TypeScript error with motion/react v12
transition={{ duration: 0.5, ease: 'easeOut' }}
```

将 easing 常量集中定义在 `src/lib/easings.ts`，见 DESIGN.md §5.1。

Hero sections 使用 `animate={…}`（页面加载即动）。所有 Section 使用 `whileInView={…}` 或 `useInView` + `animate`。

### Tailwind v4 hover scale — motion variants only

`scale-[1.04]` 在 Tailwind v4 中生成独立 `scale:` 属性，`transition: transform` 无法捕获。hover 缩放必须走 motion variants:

```tsx
<motion.div initial="rest" whileHover="hover" animate="rest">
  <motion.img
    variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
    transition={{ duration: 0.28, ease: [0.45, 0, 0.55, 1] }}
  />
</motion.div>
```

### Recharts 3 — 内置动画必须关闭

```tsx
<LineChart>
  <Line isAnimationActive={false} ... />  // 必须
</LineChart>
```

由 motion/react 的 `useInView` + `motion.g` 统一接管滚动入场，避免双动画系统打架。

### WebGL / Shader 背景

本项目 Hero 使用 `@paper-design/shaders-react`（MeshGradient），零 GLSL 配置。`prefers-reduced-motion` 时设 `speed: 0` 冻结。WebGL 不可用时回退 CSS radial-gradient。

### Rolling Number — motion-plus/react

使用 `AnimateNumber` 组件实现逐位 spring 滚入。不引入 `react-countup` 等外部库。

### Chinese Fonts

Noto Sans SC Variable 约 2-4MB，使用 `font-display: swap`。

## Data Source

**唯一数据源**：`src/data.ts`（不允许在组件里 inline 数字）。结构见 `SystemPrompt.md` §4。

## prefers-reduced-motion

全局已有以下规则（`src/index.css`）：
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

motion/react 会自动尊重此 media query，数字滚动等 JS 动画也应在组件内检测并降级。

## 迭代更新规则

修改代码时，同步更新 spec 文件：

- **spec 缺口**（Section 布局/数据绑定描述不准）→ 补 `SystemPrompt.md` → 再改代码
- **通用审美发现**（对所有同类项目有效的规则）→ 补 `DESIGN.md` 对应章节 → 再改代码
- **工程坑**（新发现的技术约束）→ 补本文件（`CLAUDE.md`）→ 再改代码

## References

- `DESIGN.md` — 完整设计系统（色彩 / 字体 / 间距 / 动效 / 组件清单）
- `SystemPrompt.md` — 本次生成的完整执行指令
- `docs/references/` — 7 张参考图（IMG 1-3 结构 / IMG 4-7 风格）

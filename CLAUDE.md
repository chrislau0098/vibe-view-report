# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**vibe-view-report-1** 是一份为「得到 App · 《时间的朋友》2026 开年数据战报」生成的 React 单页长图网站。参考小米年度战报的分节长图结构，采用飞书 Q3 / Pintopay 式深色剧场审美，以爱马仕橙为品牌锚点。

**设计与风格已在 `DESIGN.md` 中冻结。生成 UI 前必须先通读 `DESIGN.md`。**

**生产指令见 `PROMPT.md`。该文件是给后续 Claude Code 执行生成的完整指令。**

## Task Logging Rule

每次任务完成后，必须向 `.memory/YYYY-MM-DD.md` 追加一条日志记录（按当天日期命名，文件不存在则新建）。

格式：
```
### HH:MM — 一句话描述完成了什么
- 关键决策：…
- 下一步：…（无则省略）
```

`.memory/` 目录已加入 `.gitignore`，不上传 GitHub。

## Development Workflow

1. **Read First**: `DESIGN.md` → `PROMPT.md` → `docs/references/*.png`
2. **Install missing deps** (见下方 Tech Stack 补丁列表)
3. **Implement Sections 顺序**：`src/data.ts` → `<RollingNumber>` / `<SpotlightGradient>` 等 primitive → `<Hero>` → 6 个 Section → `<Footer>` → `App.tsx` 编排
4. **Verify**: `npm run dev` 打开浏览器滚屏检查；`npm run lint` 必须零 error

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
| **图表库** | **Recharts 3 + shadcn/chart** | **🟡 需安装** |
| **中文宋体（标题）** | `@fontsource-variable/noto-serif-sc` | **🟡 需安装** |
| **中文黑体（正文）** | `@fontsource-variable/noto-sans-sc` | **🟡 需安装** |

### 需执行的补丁安装
```bash
npm install recharts @fontsource-variable/noto-serif-sc @fontsource-variable/noto-sans-sc
npx shadcn@latest add chart
```

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

## Design System

所有颜色 / 字体 / 间距 / 动效 token 必须从 `DESIGN.md` 第 2-5 节派生。修改任何 token 前先在 `DESIGN.md` 决策日志追加一条记录。

### 色彩快速取用（详见 DESIGN.md §2）
```
--primary:       oklch(0.65 0.175 42)   /* 爱马仕橙 #D75F28 */
--primary-hl:    oklch(0.73 0.185 48)   /* #F76A20 发光态 */
--background:    oklch(0.11 0.012 260)  /* #0A0B0D 深墨 */
--foreground:    oklch(0.96 0.012 80)   /* #F5F2EC 暖白 */
```

### 字体分工
- **中文标题**（"时间的朋友"、章节主标题）：`font-chinese-serif`（思源宋体）
- **中文正文 / 说明文**：`font-chinese-sans`（思源黑体 / 苹方）
- **数字 / 英文**：`font-sans`（Geist Variable）

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

### Full-screen canvas — WebGL only, never Canvas 2D

Canvas 2D `fillText()` 循环在 1440p 会达到 14k–22k main-thread draws 导致卡顿。全屏动画背景必须 WebGL + glyph atlas（本项目 Hero spotlight 不需要全屏动画，用 CSS radial-gradient 即可；如需粒子/噪点动画则上 WebGL）。

### WebGL shader pitfalls（如确实需要）

- `half`, `input`, `output` 是 GLSL ES 1.0 保留关键字 — 用作变量名会静默编译失败（黑屏无报错）。在 compile 辅助函数中调用 `gl.getShaderInfoLog(s)`。
- `texImage2D()` 上传 Canvas 2D 纹理前调用 `gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)` 修正 Y 轴翻转。
- TypeScript 闭包 null guard 不会穿透 — 每个嵌套函数开头加 `if (!canvas || !gl) return`。

### ResizeObserver + Canvas DPR

不要累加 transform：`ctx.scale(dpr, dpr)` 会在每次 resize 叠加。用绝对形式：
```ts
ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
```

### Rolling Number — motion/react 原生实现

**不**引入 `react-countup`、`@number-flow/react` 等外部库。用 `useMotionValue + useTransform + animate + useInView` 自封装 `<RollingNumber>`。参考 Build UI [Animated Counter](https://buildui.com/recipes/animated-counter) 模式。中文数量级（万 / 亿）由 format prop 控制。

### Chinese Fonts — 思源字体延迟加载

思源宋体 + 黑体总量约 2-4MB。使用 `font-display: swap` + subsetting，必要时按 Latin-Simplified-Chinese 拆包。

## Data Source

**唯一数据源**：`src/data.ts`（不允许在组件里 inline 数字）。结构见 `PROMPT.md` §4。

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

## References

- `DESIGN.md` — 完整设计系统（色彩 / 字体 / 间距 / 动效 / 组件清单）
- `PROMPT.md` — 本次生成的完整执行指令
- `docs/references/` — 7 张参考图（IMG 1-3 结构 / IMG 4-7 风格）

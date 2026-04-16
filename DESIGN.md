# Design Spec — 得到《时间的朋友》2026 开年捷报

> 本文档是本项目的设计语言定义。所有 UI 生成前必须先读本文件。
> 基础设计约束继承 Vault 根目录的 `DESIGN.md`（Geist Sans、motion/react 数组 easing、WebGL 大背景、Linear/Vercel 克制审美）。

---

## 1. 风格定位

### 1.1 一句话定位
**"把罗振宇跨年演讲的大屏装进一张可滚动的战报里。"**

深色剧场版（Theatre Dark）— Pintopay 式 spotlight 光晕 × 飞书 Q3 式巨型数字 × Redmi Book 式工程曲线图 × 得到爱马仕橙作品牌锚点。

### 1.2 目标情绪
- **庄重**：得到"做时间的朋友"的长期主义气质，不是春晚热闹
- **克制**：单一 accent，数据让位不抢戏
- **有质感**：spotlight、噪点、文字呼吸感，不是扁平信息图
- **上扬**：每一条同比增长都应在视觉上"向上飞跃"

### 1.3 Aesthetic Reference Matrix

| 维度 | 参照对象 | 复用哪部分 |
|------|----------|-----------|
| 深色基调 / Spotlight 光晕 | Pintopay（IMG 5） | 深基底 + 角落蓝/橙光渐变 |
| 巨型白色数字 + 上升曲线 | 飞书 Q3（IMG 7） | "180%" 巨字构图 + 底部橙色曲线 |
| 渐变工程曲线图 | Redmi Book（IMG 6） | 底部对比曲线（绿→黄→橙→红的多色渐变） |
| 卡片组合与数据卡 | Materia（IMG 4） | 圆角描边卡 + 单张 accent fill CTA 卡 |
| 分节长图结构 | 小米年度战报（IMG 1-3） | 竖屏 Section 叠加、每节一个数据锚点 |
| 得到品牌锚点 | 得到 App + 时间的朋友历届 | 爱马仕橙 + 黑底橙字 + 猫头鹰符号 |

### 1.4 Anti-Patterns（禁止事项）
- ❌ 红金春节味、烟花、生肖、春联
- ❌ 蓝紫赛博朋克渐变、霓虹感
- ❌ 莫兰迪 / 马卡龙 / 柔和粉彩
- ❌ 塑料橙 `#FFA500` —— 必须压到焦橙 `#D75F28`
- ❌ 圆体 / 娃娃体 / 手写涂鸦体中文标题
- ❌ AI 插画（得到视觉偏"文本 + 实拍 + 图形符号"）
- ❌ 卡片套卡片、Inter + 紫渐变的 AI 通用模板
- ❌ 只有 opacity 淡入的廉价入场动画

---

## 2. 色彩系统

> 基于得到爱马仕橙（华与华设计方案，千通彩参考色 `#D75F28`）+ Linear/Pintopay 深色基底调校。使用 `oklch()` 供 Tailwind v4 CSS-first 使用。

### 2.1 Dark Mode（默认 / 主视觉）

```css
/* Base Layers */
--background:       oklch(0.11 0.012 260)     /* #0A0B0D 深墨，略带冷调 */
--surface-l1:       oklch(0.14 0.012 260)     /* #111113 panel */
--surface-l2:       oklch(0.18 0.012 260)     /* #18181B card */
--surface-l3:       oklch(0.23 0.012 260)     /* #26262A hover */

/* Text */
--foreground:       oklch(0.96 0.012 80)      /* #F5F2EC 暖白，防刺眼 */
--foreground-2:     oklch(0.72 0.012 80)      /* #A8A49D 次级 */
--foreground-3:     oklch(0.52 0.012 80)      /* #7A766E meta / disabled */

/* Borders */
--border:           oklch(1 0 0 / 0.06)        /* 默认边框，不可见感 */
--border-strong:    oklch(1 0 0 / 0.12)        /* card / input 边框 */

/* Brand Accent (得到爱马仕橙系) */
--primary:          oklch(0.65 0.175 42)      /* #D75F28 爱马仕橙，品牌锚点 */
--primary-hl:       oklch(0.73 0.185 48)      /* #F76A20 数字高亮 / 发光态 */
--primary-glow:     oklch(0.65 0.175 42 / 0.18)  /* spotlight 渐变源 */

/* Data Chart Palette (低调多色渐变，用于增长曲线) */
--chart-1:          oklch(0.73 0.185 48)      /* 橙色主曲线 */
--chart-2:          oklch(0.68 0.14 65)       /* 琥珀辅 */
--chart-3:          oklch(0.62 0.12 150)      /* 青绿辅（过去对比） */
--chart-4:          oklch(0.50 0.08 220)      /* 深青辅（更早基线） */
--chart-5:          oklch(0.35 0.04 260)      /* 灰蓝 baseline */

/* Cool Glow (辅助 spotlight，Pintopay 式蓝紫渐变光晕) */
--glow-cool:        oklch(0.45 0.10 240 / 0.15)
```

### 2.2 Light Mode（米白学院版，可选备用）

```css
--background:       oklch(0.97 0.008 80)     /* #FAF7F2 暖纸 */
--surface-l1:       oklch(0.99 0.004 80)     /* 纯白 card */
--foreground:       oklch(0.18 0.01 260)     /* #1D1D1F 墨黑 */
--foreground-2:     oklch(0.50 0.01 260)     /* 中灰 */
--border:           oklch(0.10 0 0 / 0.08)
--primary:          oklch(0.60 0.180 42)      /* 焦橙加深一档以保证在亮底上对比 */
```

### 2.3 使用原则
- **单一 accent**：橙色只用于核心数字、CTA、同比增长徽章、关键图表第 1 条线，**决不散用**
- **禁线性渐变**：所有渐变走多停靠点 + easing（参考 easing-gradients 插件）
- **Spotlight 渐变**：`radial-gradient(1200px 600px at 50% 0%, var(--primary-glow), transparent 60%)`
- **冷暖搭配**：背景冷（微蓝），文字暖（偏米白），accent 暖橙 — 三元对比

---

## 3. 字体排版

### 3.1 字体栈

```css
/* 英文 + 数字主力 (Hero 巨型数字、次级数据) */
--font-sans: 'Geist Variable', -apple-system, system-ui, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, monospace;

/* 中文标题（"时间的朋友"、"开年捷报"等标题字） */
--font-chinese-serif: 'Source Han Serif SC', 'Noto Serif SC', 'FZShuKeBenXiuKaiS-R-GB', serif;

/* 中文正文 */
--font-chinese-sans: 'Source Han Sans SC', 'PingFang SC', 'Noto Sans SC', sans-serif;
```

**获取方式（项目补充依赖，PROMPT.md 中会标注）：**
- 思源宋体：`@fontsource-variable/noto-serif-sc`（作为中文标题字）
- 思源黑体：`@fontsource-variable/noto-sans-sc`（作为中文正文字）
- Geist 已在 package.json 中

### 3.2 字号层级

| 层级 | 字号 (px) | 字重 | 行高 | 字距 | 用途 |
|------|-----------|------|------|------|------|
| Hero Chinese Title | 48–64 | 600 (宋体) | 1.1 | -1px | "2026 时间的朋友"等核心标题 |
| Hero Number | **144–240** | 600 (Geist) | 0.9 | -6px | "4765.7万"等核心大数字 |
| Hero Subtitle | 18–22 | 400 | 1.5 | 0 | 标题下副文案 |
| Section Title | 36–48 | 500 (宋体或黑体粗) | 1.15 | -0.5px | 每节主标题 |
| Section Number | 72–120 | 600 (Geist) | 0.95 | -3px | Section 内主数据 |
| Section Unit/Suffix | 24–36 | 400 | 1.1 | 0 | "万人"、"亿"等单位 |
| Delta Badge | 14–16 | 500 | 1 | 0 | "+33.85%"同比徽章 |
| Body | 16 | 400 | 1.6 | 0 | 正文阅读 |
| Caption | 13–14 | 400 | 1.5 | 0 | 数据说明、备注 |
| Meta | 11–12 | 500 | 1.4 | 0.3px | 上标、日期标记 |

### 3.3 排版原则
- **核心数字必须独占一屏焦点**：`font-size: clamp(96px, 18vw, 240px)`，负字距收紧（`letter-spacing: -0.04em`）
- **大号数字启用 OpenType**：`font-feature-settings: "cv01", "ss03", "tnum"` — 更几何、等宽数字防跳动
- **中文标题用宋体承载"时间感"**：黑体过于现代，宋体带有"岁月"感
- **英文/数字用 Geist 承载"工程精度"**：避免 Inter（AI 通用感）
- **行高宽松**：正文 1.6，避免文字拥挤
- **同一行中文 + 阿拉伯数字时**：数字左右各留 0.1em 呼吸

---

## 4. 间距 / 圆角 / 阴影

### 4.1 间距
```
Base unit:          8px grid
Section padding-y:  96–160px（长图各 section 间距宽松）
Section padding-x:  24px (mobile) / 64px (tablet) / 120px (desktop)
Card padding:       24–32px
Card-inner gap:     16–24px
Text paragraph gap: 16px
```

### 4.2 圆角
```
--radius-sm: 6px   /* badge / inline chip */
--radius-md: 10px  /* button / input */
--radius-lg: 16px  /* card */
--radius-xl: 24px  /* feature section / modal */
--radius-2xl: 32px /* hero card / showcase */
```

### 4.3 阴影（深色模式下谨慎使用）
```
--shadow-card:    0 1px 0 oklch(1 0 0 / 0.04) inset, 0 12px 40px oklch(0 0 0 / 0.45)
--shadow-glow:    0 0 80px oklch(0.65 0.175 42 / 0.25)  /* 橙色发光 */
```

深色模式主要靠**边框 + 背景层次**区分，阴影克制；只在"关键数据卡"使用 glow 强调。

---

## 5. 动效规范

### 5.1 Easing 常量（必须数组格式）

```ts
export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,        // 通用入场，ease-out-expo
  inOut: [0.83, 0, 0.17, 1] as const,     // 平滑往返
  bounce: [0.34, 1.56, 0.64, 1] as const, // 大数字落下时轻微回弹
  spring: [0.45, 0, 0.55, 1] as const,    // 按钮 hover / 轻交互
};
```

### 5.2 Duration
```
微交互 hover:    180ms
按钮 press:      120ms
数据入场 stagger: 每项 80-120ms delay
数字 rolling:    1.6–2.4s（越大的数字时间越长）
曲线 pathLength: 1.8–2.8s
Section 入场:    600ms
Hero 进场:       1200ms+（允许缓慢入场，营造仪式感）
```

### 5.3 入场模式

**Hero**（页面加载即动）：
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: EASE.out }}
/>
```

**Section**（滚动触发）：
```tsx
const inView = useInView(ref, { once: true, margin: "-20%" });
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, ease: EASE.out }}
/>
```

**核心数字**（进入视窗开始滚动）：
- 使用 `useMotionValue + animate + useTransform`，滚动 1.6–2.4s
- 同时配数字上方的 delta badge 在 800ms 延后出现（先看总量，再看增长）

**增长曲线**：
- `<motion.path pathLength={0}>` → `pathLength: 1`，2.4s，`ease: EASE.out`
- 曲线末尾的数据点圆圈在 pathLength 动画结束后 200ms 缩放出现

### 5.4 动效原则
- **每一次入场都要有"向上"的语义**：同比增长的指标必须在视觉上向上飞跃，不可平移、下移
- **数字必须滚动，不可直接显示终值**
- **曲线必须按路径长度绘制，不可 opacity 淡入**
- **Hero 背景允许缓慢的 spotlight 漂移**（`motion.div` 上的 `background-position` 12s 循环）
- **respect `prefers-reduced-motion`**：全部动画降级为 `duration: 0.01ms`

---

## 6. 组件清单

### 6.1 基础组件（扩展 shadcn/ui）
- `<Button>` — shadcn 原生，primary / ghost 两种变体
- `<Badge>` — 用于 `+33.85%` 同比徽章，橙色 fill 或描边两种
- `<Card>` — 圆角 16-24px，border 0.06 opacity，内部 padding 32px
- `<Section>` — 全宽容器，控制 section padding 与 max-width (1200px)

### 6.2 业务组件（自制）

#### `<RollingNumber>`
**用途**：所有核心数字的滚动动画。
**实现**：
```tsx
// Props: value (number), suffix (string), prefix, duration, precision
// 基于 motion/react useMotionValue + useTransform + useInView
// 中文数量级（万 / 亿）由 precision prop 控制
// 例：<RollingNumber value={4765.7} suffix="万人" duration={2.0} />
```
**依赖**：仅 `motion/react`（不引 `react-countup`）

#### `<DeltaBadge>`
**用途**：同比增长徽章。
**结构**：↑ 图标 + 百分比数字 + "同比"文字 + 橙色 fill
**入场**：数字滚动结束后 800ms 从下方弹入

#### `<SpotlightGradient>`
**用途**：Hero 与 Section 顶部的光晕背景。
**实现**：`radial-gradient` 单层 + `motion.div` 的 `backgroundPosition` 缓慢循环
**参数**：position（top-left / top-center / bottom-right）、hue（orange / cool）、intensity

#### `<GrowthCurve>`
**用途**：Hero 或 Section 5 的同比增长曲线（飞书 Q3 风格）。
**实现**：SVG path + `motion.path` `pathLength` 动画；不用 Recharts
**结构**：
- 渐变描边（`<defs><linearGradient>`：橙色主 → 琥珀 → 焦橙）
- 末端数据点圆圈 + 年份标签
- 底部网格线（极细，opacity 0.08）

#### `<ComparisonBar>`
**用途**：两个数据对比（如 5.12亿 vs 14.22亿）。
**实现**：双条形图，数值大的条形先绘制，橙色 fill；小的灰色辅色
**动效**：从左到右 `scaleX`，transform-origin: left

#### `<StatBlock>`（通用数据块）
**结构**：
```
┌─────────────────────────┐
│ [Eyebrow Label 12px]    │  ← 小标题
│                         │
│   4765.7万              │  ← RollingNumber，96-144px
│                         │
│   全网直播观看          │  ← 12-14px caption
│   ↑ +33.85% 同比        │  ← DeltaBadge
└─────────────────────────┘
```

#### `<ChapterStamp>`
**用途**：每节开头的"批注盖印"章戳，橙色圆章带章节号。
**实现**：SVG 圆形描边 + 橙色 `rotateZ(-8deg)` 倾斜 + 中间章节序号
**灵感**：得到每日精进的学习仪式感

#### `<OwlSilhouette>`
**用途**：猫头鹰抽象描边，仅用于页眉或页尾作为品牌锚点。
**实现**：SVG 单色描边（不用原 logo，避免 VI 越线）
**位置**：Hero 顶部居中或 Footer 居中

---

## 7. 图表方案（核心工程决策）

### 7.1 方案：shadcn chart (Recharts 3) + motion/react 自绘 SVG 分层

| 用途 | 方案 |
|------|------|
| **Hero 主曲线**（飞书 Q3 式橙色上升曲线，一次性视觉） | `motion.path` + `pathLength` **自绘 SVG**，不上 Recharts |
| 数据对比条形图（Section 2 的 5.12亿 vs 14.22亿） | `motion.div` + `scaleX`，或直接 shadcn `<Bar>` |
| 增长对比图（Section 5 的同比曲线） | shadcn Chart + Recharts `<LineChart>`，关闭内置动画，用 motion 包裹 scroll-reveal |
| 径向进度（可选，如视频号占比 68%） | shadcn `<RadialBarChart>` 或自绘 SVG 圆环 |

### 7.2 关键工程约束
- **Recharts 内置动画必须关闭**：`isAnimationActive={false}`，由 motion/react 统一接管
- **Tailwind v4 必须在 @theme 中声明 `--color-chart-1..5`**：v4 移除了 tailwind.config.js
- **Hero 曲线的优美 S 形**：手写 Cubic Bezier path data，由设计直觉调参（不要让数据驱动 Hero 曲线的形状）

### 7.3 需要补充的依赖
```json
"recharts": "^3.0.0"
// shadcn chart 相关（通过 pnpm dlx shadcn@latest add chart 一键添加）
"@fontsource-variable/noto-serif-sc": "^5.x"
"@fontsource-variable/noto-sans-sc": "^5.x"
```

---

## 8. 响应式与适配

- **主设备**：Mobile-first，以 720px 宽度为设计基线（类似小米长图的手机端）
- **桌面**：Max-width 1200px 居中，左右保留留白；桌面上允许两列并排展示（如视频号 vs 总观看）
- **Safari 兼容**：`clamp()`、`oklch()`、`aspect-ratio` 均可用
- **断点**：
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px（以 1200 max-width）
- **移动端特殊处理**：核心大数字字号随视口宽度 clamp 缩放；Spotlight 光晕的半径缩小

---

## 9. 设计决策日志

| 日期 | 决策 | 原因 |
|------|------|------|
| 2026-04-16 | 主视觉走深色剧场版（非米白学院版） | 跨年演讲大屏语境 + 参考图 IMG 4-7 全部深色基调 |
| 2026-04-16 | 品牌主色 `#D75F28`（爱马仕橙） | 华与华得到 logo 方案，行业参考值（千通彩） |
| 2026-04-16 | 中文标题字用宋体而非黑体 | 宋体带"时间厚度"，呼应"时间的朋友"长期主义气质 |
| 2026-04-16 | 图表主力 shadcn chart (Recharts 3) + Hero 自绘 SVG | Recharts 覆盖 80% 结构化数据，自绘 SVG 换 Hero 审美天花板 |
| 2026-04-16 | Rolling Number 不引 react-countup | motion/react 原生 `useMotionValue` 已够用，避免双套动画时序 |
| 2026-04-16 | 禁用 Recharts 内置动画 | 与 motion/react 的 scroll-reveal 双动画冲突 |
| 2026-04-16 | 辅助 Chart 渐变色采用 橙→琥珀→青绿→青蓝 四阶 | 呼应 Redmi Book 工程曲线，避免彩虹色；绿→橙表达"过去到现在"的进步 |
| 2026-04-16 | 动效 easing 统一 `[0.16, 1, 0.3, 1]`（ease-out-expo） | 快进慢出，强调"到达"；与 motion/react 数组格式兼容 |

---

## 10. Assets 与 References

**参考图**：`docs/references/`
- `structure-01-03` — 小米长图战报（结构参考，不参考风格）
- `style-04` — Materia 卡片组合（卡片+单 accent 数据卡）
- `style-05` — Pintopay spotlight 深色基调 ⭐ 主要基调参考
- `style-06` — Redmi Book 工程曲线图 ⭐ 曲线图色彩参考
- `style-07` — 飞书 Q3 巨型数字 + 橙色上升曲线 ⭐ Hero 构图参考

**品牌参考**：
- 得到 App 品牌色：`#D75F28` 爱马仕橙（华与华方案）
- "时间的朋友"历届：黑底橙字、宋体标题、具体意象物（冰棍/锦鲤/门/毯子…）
- 禁忌：不可偏向春晚年货、赛博朋克、莫兰迪

---

*Frozen: 2026-04-16 · 下一次结构/组件变更时在本日志追加*

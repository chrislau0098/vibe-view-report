# Design System: Theatre Dark Data Report

> **约束力声明**：本文档是深色剧场风格数据战报的设计语言单一事实源。所有 UI 生成前必须先通读本文件。本规范适用于年度战报、开年捷报、季度数据报告等同类深色长图场景，跨项目复用。
> 结构参照 Design System Cases 标准：Visual DNA → Typography → Color → Spacing → Material → Motion → WebGL → Backgrounds → Icons → Components → Layout → Charts → Anti-Patterns。

## Project

**vibe-view-report-1** — 得到 App 2026 "时间的朋友" 开年数据战报

**Vibe Archetype**: Dark Theatre

---

## 1. Visual DNA

**一句话定位**："把大屏发布会装进一张可滚动的剧场式长图战报里。"

**Composition:**
- **Layout**: single-column scroll（纵向长图，每屏一个数据故事）
- **Content Width**: contained-1200px（max-w-5xl 居中）
- **Framing**: open（无边框容器，靠 Spotlight 光晕和负空间分区）
- **Grid**: none（数据战报不走栅格，靠居中 + 非对称分割）

### Atmosphere Parameters

| 维度 | 值 | 说明 |
|------|-----|------|
| **Density** | 3 / 10 | Art Gallery Airy — 每屏只讲一个数据故事，大量负空间 |
| **Variance** | 5 / 10 | Offset Asymmetric — 居中 Hero 允许（数据战报的仪式感需要），分节允许左右偏移 |
| **Motion** | 7 / 10 | Cinematic Choreography — 数字逐位滚入、曲线按路径绘制、光晕缓慢漂移 |

### 目标情绪
- **庄重**：长期主义气质，不喧闹
- **克制**：单一 accent，数据留白不抢戏
- **有质感**：spotlight、噪点纹理、WebGL 背景、文字呼吸感——不是扁平信息图
- **上扬**：每一条增长数据都应在视觉上"向上飞跃"

---

## 2. Typography

### 2.1 Font Stacks

| Role | Font Stack | 用途 |
|------|-----------|------|
| **Sans** | `'Geist Variable', -apple-system, system-ui, sans-serif` | 英文正文、Section 数字、UI 元素 |
| **Mono** | `'Geist Mono', ui-monospace, monospace` | 章节标号、辅助 meta |
| **Chinese Sans** | `'Noto Sans SC Variable', 'PingFang SC', 'Source Han Sans SC', sans-serif` | 中文标题 + 正文统一 |
| **Display Number** | `'Helvetica Neue', Helvetica, Arial, sans-serif` | Hero 巨型数字（88–200px） |

> **Why Helvetica Neue for display numbers?** Geist 的数字字形较宽，在超大号（>80px）下视觉松散。Helvetica Neue 数字字形紧凑、重心稳定，搭配 `tracking: -0.04em` 在巨型展示中表现更佳。Section 级数字（<120px）继续使用 Geist。

### 2.2 Dependencies

```bash
npm install @fontsource-variable/geist @fontsource-variable/geist-mono @fontsource-variable/noto-sans-sc
```

中文字体总量约 2–4MB，必须使用 `font-display: swap` + subsetting。

### 2.3 Weight Hierarchy（五级体系）

| Weight | Semantic Role | Description |
|--------|--------------|-------------|
| **600** | Emphasis | 同比徽章数字、强调运算符（`× 2.78`）— **唯一允许 600 的地方** |
| **500** | Display | Hero 巨型数字、品牌主色核心 KPI |
| **450** | Heading | 中文 H1 标题（需 Variable Font 支持） |
| **400** | Standard | Section 级数字、中文正文段落 |
| **300** | Light | 副标题、caption、引用正文、收尾标题、标签文字 |

**规则**：对比靠轻重交替，不靠加粗。中文字重比 Latin 低半档。

### 2.4 Type Scale

| Level | Size | Weight | Line-Height | Letter-Spacing | Font |
|-------|------|--------|-------------|----------------|------|
| Display Number | `clamp(88px, 18vw, 200px)` | 500 | 0.88 | -0.04em | Display Number |
| Page Title | `clamp(28px, 4.2vw, 52px)` | 450 | 1.1 | 0.02em | Chinese Sans |
| Page Subtitle | `clamp(16px, 2.6vw, 32px)` | 300 | 1.1 | — | Chinese Sans |
| Section Number Primary | `clamp(52px, 10vw, 120px)` | 500 | 0.88 | -0.04em | Sans |
| Section Number Secondary | `clamp(44px, 8vw, 96px)` | 400 | 0.88 | -0.04em | Sans |
| Section Number Tertiary | `clamp(36px, 6vw, 64px)` | 400 | 0.9 | -0.04em | Sans |
| Quote Text | `clamp(22px, 4vw, 40px)` | 300 | 1.4 | -0.01em | Chinese Sans |
| Closing Title | `clamp(32px, 6vw, 56px)` | 300 | 1.1 | 0.1em | Chinese Sans |
| Eyebrow Pill | 10px | — | — | 0.2em | uppercase |
| Body / Caption | 14px / 13px | 300–400 | 1.5–1.6 | — | Chinese Sans |
| Meta / Label | 12px / 10px | — | — | 0.15–0.2em | tracking-wider |

### 2.5 Numeric OpenType Features

所有数据数字必须开启以下 OpenType 特性，确保对齐与一致性：

```css
font-feature-settings: "cv01", "ss03", "tnum";
```

- `cv01` — 几何字符变体（更 monospaced 的数字外观）
- `ss03` — 风格替代
- `tnum` — Tabular Numbers，等宽数字，防止位宽跳动导致布局抖动

### 2.6 Typography Principles

- **核心数字独占一屏焦点**：`font-size: clamp(88px, 18vw, 200px)` + 负字距收紧，每个 section 只有一个大数字
- **中文用黑体统一**：Noto Sans SC 一种字体走全局，不混用宋体/楷体，保持工程感
- **英文/数字用 Geist**：避免 Inter（AI 通用感太重）
- **行高宽松**：正文 1.6，标题 1.1，避免中文拥挤
- **中英混排呼吸**：同一行中文 + 阿拉伯数字时，数字左右各留 `0.1em`
- **严禁孤字换行（Orphan Rule）**：所有多行中文段落必须加 `textWrap: "balance"`，配合 `maxWidth: 28–42ch`，确保末行不少于 3 字符
- **Banned fonts**：Inter, Times New Roman, Georgia（仅限装饰引号例外）, Comic Sans, 圆体, 娃娃体

### 2.7 Element → Style Quick Reference

弱模型或新 Session 直接查表，不需要从 Type Scale 推断：

| 元素 | 字号 | 字重 | 颜色 | 字体 | 间距上下文 |
|------|------|------|------|------|-----------|
| Hero 主数字 | `clamp(88px, 18vw, 200px)` | 500 | `--primary-hl` | Display Number (Helvetica Neue) | 独占一屏中心, lh 0.88, ls -0.04em |
| Section Primary 数字 | `clamp(52px, 10vw, 120px)` | 500 | `--primary-hl` | Sans (Geist), `opsz 72` | 区域视觉焦点, lh 0.88 |
| Section Secondary 数字 | `clamp(44px, 8vw, 96px)` | 400 | `--foreground-2` | Sans (Geist) | 主数字旁侧或下方, lh 0.9 |
| Section Tertiary 数字 | `clamp(36px, 6vw, 64px)` | 400 | `--foreground-2` | Sans (Geist) | 辅助指标, lh 0.9 |
| 数字单位后缀 (万人/亿次) | 数字的 `0.28–0.35em` | 400 | `--foreground-2` / `--foreground-3` | — | `ml-[0.06–0.08em]` |
| 强调运算符 (× 2.78) | `clamp(22px, 4vw, 56px)` | **600** | `--primary` | Sans | **唯一允许 600 的地方** |
| 等号运算符 | `clamp(28px, 5vw, 56px)` | 300 | `--foreground-3` | Sans | 公式排版连接 |
| 中文标题 | `clamp(28px, 4.2vw, 52px)` | 450 | `--foreground` | Chinese Sans | 数字之前，解释语境 |
| Eyebrow Pill | 10px | — | `--foreground-3` | uppercase, `tracking 0.2em` | Section 顶部 |
| Body / Caption | 14px / 13px | 300–400 | `--foreground-2` | Chinese Sans | 数字之后，补充说明 |
| Delta Badge 数字 | `text-sm` (14px) | 500 | `--primary` | Sans | 紧跟主数字，delay 弹入 |
| ChapterStamp 数字 | 20px | 600 | `--primary` | Sans | SVG 内居中 |

> **所有数据数字**必须开启 `font-feature-settings: "tnum"`（等宽数字），Display Number 额外开启 `"cv01", "ss03"`。

### 2.8 Hierarchy Enforcement Rules

以下规则必须严格遵守，防止信息层级模糊：

**数字层级：**
1. **每个 Section 有且只有 1 个 Primary Number**（最大字号 + `--primary-hl` accent 色）
2. **Primary / Secondary / Tertiary 字号至少差 2 级**（如 120px / 96px / 64px，不允许 120px / 110px 这种模糊）
3. **Secondary 数字用 `--foreground-2`**，不用 accent 色
4. **数字单位后缀**必须比数字小（`0.28–0.35em`），颜色降一级

**Accent 色分配（仅以下 4 类元素可用 `--primary` 或 `--primary-hl`）：**
1. Primary Number（每节 1 个）
2. Delta Badge（`border` + `text`）
3. 图表第 1 条线 / 首条柱
4. ChapterStamp 圆环 + 数字

**所有其他元素**用 `--foreground` / `--foreground-2` / `--foreground-3` 层级。违反此规则 = accent 散用。

**间距层级（三级）：**
| 级别 | 值 | 用途 |
|------|-----|------|
| 组内紧凑 | `gap-1` (4px) | badge 内部、数字 + 单位 |
| 组内标准 | `gap-3` (12px) | 标签 + 数字堆叠 |
| 数据块间 | `gap-6` (24px) | Hero 内部组件间 |
| Section 间 | `py-24 px-6` → `py-40 px-16` | Mobile → Desktop |

---

## 3. Color System

**Mode**: dark

> 使用 `oklch()` 色彩空间，确保感知均匀性。Tailwind v4 CSS-first 模式原生支持。

### 3.1 Base Layers

```
--background:    oklch(0.11 0.012 260)  /* Deep Ink — 主背景，略带冷调蓝灰 */
--surface-l1:    oklch(0.14 0.012 260)  /* Panel Dark — 交替 section / 收尾区域 */
--surface-l2:    oklch(0.18 0.012 260)  /* Card Charcoal — 卡片填充 */
--surface-l3:    oklch(0.23 0.012 260)  /* Hover Slate — 卡片 hover/active */
```

### 3.2 Text

```
--foreground:    oklch(0.96 0.012 80)   /* Warm Ivory — 主文本，偏暖白 */
--foreground-2:  oklch(0.72 0.012 80)   /* Muted Sand — 次级文本、单位后缀 */
--foreground-3:  oklch(0.52 0.012 80)   /* Faded Stone — meta、label、disabled */
```

### 3.3 Borders

```
--border:        oklch(1 0 0 / 0.06)    /* Whisper — 几乎不可见 */
--border-strong:  oklch(1 0 0 / 0.12)    /* Structure — 卡片、分隔线 */
```

### 3.4 Brand Accent（单一 accent 原则）

```
--primary:       oklch(0.65 0.175 42)   /* Burnt Orange — 品牌锚点 #D75F28 */
--primary-hl:    oklch(0.73 0.185 48)   /* Glow Orange — 核心数字高亮 #F76A20 */
--primary-glow:  oklch(0.65 0.175 42 / 0.18)  /* Spotlight 光晕起始色 */
```

> **严格约束**：accent 只用于核心数字、同比徽章、图表第 1 条线、章节装饰。**决不散用**。

### 3.5 Accent Ramp（50-950）

| Step | Value | 用途 |
|------|-------|------|
| 50 | `oklch(0.97 0.02 42)` | 极浅背景 tint |
| 100 | `oklch(0.93 0.04 42)` | 浅背景 |
| 200 | `oklch(0.87 0.07 42)` | 浅色边框 |
| 300 | `oklch(0.80 0.10 42)` | 浅色文本 |
| 400 | `oklch(0.73 0.14 42)` | 次级 accent |
| 500 | `oklch(0.65 0.175 42)` | **Brand Primary (Burnt Orange)** |
| 600 | `oklch(0.55 0.15 42)` | 深色 accent |
| 700 | `oklch(0.45 0.13 42)` | 深色边框 |
| 800 | `oklch(0.35 0.10 42)` | 深背景上的 accent |
| 900 | `oklch(0.25 0.07 42)` | 极深 accent |
| 950 | `oklch(0.18 0.05 42)` | 近黑 accent tint |

### 3.6 Chart Palette

```
--chart-1:  oklch(0.73 0.185 48)   /* 橙色主曲线 */
--chart-2:  oklch(0.68 0.14 65)    /* 琥珀辅色 */
--chart-3:  oklch(0.62 0.12 150)   /* 青绿辅色（过去对比） */
--chart-4:  oklch(0.50 0.08 220)   /* 深青辅色（更早基线） */
--chart-5:  oklch(0.35 0.04 260)   /* 灰蓝 baseline */
```

### 3.7 Special Surfaces

```
--quote-bg:     oklch(0.09 0.008 260)        /* 引用间奏，比主背景更深 */
--outro-bg:     oklch(0.14 0.012 260)        /* 收尾区域，微亮体现上扬 */
--glow-cool:    oklch(0.45 0.10 240 / 0.15)  /* 冷色光晕（蓝调，冷暖对比） */
```

### 3.8 Color Principles

- **冷暖三元对比**：背景冷（微蓝灰）、文字暖（米白）、accent 暖橙
- **60-30-10**：60% background, 30% surface/text, 10% accent
- **禁止线性渐变**：所有渐变走多停靠点 + easing（径向渐变为主）
- **Never use `#000000`**：永远使用 Deep Ink 或更深的 oklch 值
- **Never use `#FFFFFF`**：永远使用 Warm Ivory 暖白

---

## 4. Spacing

### 4.1 Base Unit

**8px** grid

### 4.2 Scale

```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
```

### 4.3 Section & Card

| Token | Value |
|-------|-------|
| `--section-padding` | `py-24 px-6` (mobile) → `py-40 px-16` (desktop) |
| `--hero-min-height` | `min-h-screen`（不用 `h-screen`，iOS Safari 跳动） |
| `--container-max` | `1200px` (max-w-5xl) |
| `--card-padding` | `24–32px` |

### 4.4 Gaps

```
--gap-tight:    4px     /* 紧凑元素 */
--gap-default:  8px     /* 标准间距 */
--gap-loose:    16px    /* 数据块间 */
--gap-section:  24px    /* Hero 内部 / 组件间 */
```

### 4.5 Radius

| Token | Value | 用途 |
|-------|-------|------|
| `--radius-card` | `2rem` (32px) | Double-Bezel 外层 |
| `--radius-inner` | `calc(2rem - 0.375rem)` | Double-Bezel 内层 |
| `--radius-badge` | `9999px` | 徽章 / Eyebrow pill |
| `--radius-button` | `12px` | 按钮 |

### 4.6 Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| Default | < 640px | 单列堆叠，数字 `clamp()` 最小值 |
| `md` | ≥ 768px | 双栏布局展开，ScrollRail 显示，padding 增大 |
| `lg` | ≥ 1024px | 内容区双栏展开 |
| `xl` | ≥ 1280px | max-width 1200px 居中，两侧自然留白 |

---

## 5. Material

### 5.1 Surface Style

**elevated** — 深色模式靠边框 + 背景层次区分，不靠阴影。

### 5.2 Border Treatment

```
--border-default:  1px solid oklch(1 0 0 / 0.06)   /* Whisper */
--border-strong:   1px solid oklch(1 0 0 / 0.12)   /* Structure */
```

### 5.3 Double-Bezel Card

用于重要数据展示块的双层嵌套卡片：

```html
<!-- Outer shell: thin padding + ring border -->
<div class="p-1.5 ring-1 ring-white/5 rounded-[2rem]">
  <!-- Inner content: slightly smaller radius -->
  <div class="rounded-[calc(2rem-0.375rem)] overflow-hidden bg-surface-l2 p-6 md:p-8">
    <!-- 内容 -->
  </div>
</div>
```

内层圆角 = 外层圆角 - 外层 padding，保持视觉平行线条。

### 5.4 Shadow Strategy

深色模式主要靠边框 + 背景层次，不依赖阴影：

```
--shadow-card:  inset 0 1px 0 oklch(1 0 0 / 0.04), 0 0 40px oklch(0 0 0 / 0.45)
--shadow-glow:  0 0 80px oklch(0.65 0.175 42 / 0.25)   /* 仅 accent 元素 */
```

### 5.5 Dividers

```css
/* Accent 发光分隔线 */
background: linear-gradient(to right, transparent, oklch(0.65 0.175 42 / 0.3), transparent);
height: 1px;

/* 内容分隔线 */
background: oklch(1 0 0 / 0.08);
height: 1px;
transform-origin: left;  /* scaleX 动画从左向右展开 */
```

---

## 6. Motion

### 6.1 Animation Engine

| 工具 | 用途 |
|------|------|
| `motion/react` (v12+) | 入场、滚动触发、路径绘制 |
| `motion-plus/react` (`AnimateNumber`) | 逐位 spring 滚入 |
| `@paper-design/shaders-react` (`MeshGradient`) | WebGL 流体背景 |

> **关键约束**：motion/react v12 不接受 `ease: 'easeOut'` 字符串，必须传 cubic-bezier 数组 `[n, n, n, n]`。

### 6.2 Easing（数组格式 only）

```ts
export const EASE = {
  out:    [0.16, 1, 0.3, 1],      // ease-out-expo — 通用入场
  inOut:  [0.83, 0, 0.17, 1],     // 平滑往返（Spotlight 漂移）
  bounce: [0.34, 1.56, 0.64, 1],  // 轻微超调回弹（Badge 弹入）
  spring: [0.45, 0, 0.55, 1],     // 按钮 hover / 轻交互
};
```

### 6.3 Duration System

| Category | Duration | Notes |
|----------|---------|-------|
| Micro-interaction (hover) | 180ms | |
| Button press | 120ms | |
| Element entrance | 600–1000ms | `EASE.out` + staggered delay |
| **Number rolling** | **1.0–2.4s** | spring physics, per-digit independent |
| Curve pathLength | 2.4–3.2s | `EASE.out` |
| Curve breathing | 5s/cycle | `repeatType: "reverse"`, infinite |
| Spotlight drift | 7s/cycle | `EASE.inOut`, infinite |
| WebGL background | continuous | `speed: 0.5` |

### 6.4 Entrance Pattern

**首屏（页面加载即动）**：元素按严格时序编排入场，营造仪式感。核心原则：**先看标题定调 → 再看数字震撼 → 最后看增长背书**。每个元素 `initial: { opacity: 0, y: 20 }` → `animate: { opacity: 1, y: 0 }`，通过递增 `delay` 控制编排。

**滚动段落（`useInView` 触发）**：

```tsx
const inView = useInView(ref, { once: true, margin: "-20%" });
// initial: { opacity: 0, y: 20 }
// animate: inView ? { opacity: 1, y: 0 } : {}
// 内部元素通过递增 delay 实现 stagger（0.1–0.2s 间隔）
```

### 6.5 Number Animation (AnimateNumber)

```tsx
<AnimateNumber
  transition={{
    layout: { duration: duration * 0.4 },
    y: { type: "spring", visualDuration: duration, bounce: 0.1 },
    opacity: { duration: 0.18, ease: "linear" },
  }}
>
  {value}
</AnimateNumber>
```

- **触发方式**：`useInView` 进入视窗后延迟触发，初始显示 `0`
- **单位后缀**：字号为数字的 `0.28–0.35em`，color 降为次级色
- **已验证的教训**：`useMotionValue + animate` 单值 tween 方案效果生硬，必须逐位动画

### 6.6 SVG Path Animation

- 装饰性曲线使用手写 Cubic Bezier path，`pathLength: 0→1` 绘制入场
- 呼吸效果：`d` 属性在两个结构相同的 path 间来回变形（命令数必须一致）
- 装饰模式 `preserveAspectRatio="none"` 拉伸时，路径起止需留边避免屏幕截断

**关键 SVG 教训**：
- `preserveAspectRatio="none"` 会将 `<circle>` 拉伸成椭圆 — 需改用 HTML 元素 + `border-radius: 50%`
- SVG `<text>` 垂直居中必须用 `dominantBaseline="central"`，不能靠 `dy` 或手动调 y
- 两个 path 做 `d` 属性动画时，必须保证命令数和结构完全一致

### 6.7 Hover Patterns

```
卡片 hover:   border-color 变亮 (white/5 → white/10)
按钮 hover:   background 亮一档 + scale 1.04（motion variants）
链接 hover:   underline offset 动画
```

### 6.8 Motion Principles

- **每次入场都有"向上"语义**：增长数据视觉上必须向上飞跃，不可平移或下移
- **数字必须逐位滚入**：不可直接显示终值，也不可整串 tween（效果生硬）
- **曲线必须按 pathLength 绘制**：不可 opacity 淡入
- **滚动指示器不闪烁**：一次性淡入到低透明度，仅箭头做 `y: [0, 5, 0]` 循环
- **性能约束**：仅动画 `transform` 和 `opacity`。全屏动画走 WebGL，不用 Canvas 2D

### 6.9 prefers-reduced-motion（双层处理）

**CSS layer**：
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JS layer** — 以下动画需 `useReducedMotion()` 手动门控：
- Spotlight 漂移 → 静态渲染
- WebGL 背景 → `speed: 0`（冻结）
- RollingNumber → 直接显示终值

---

## 7. WebGL / Shader Backgrounds

### 7.1 Stack

`@paper-design/shaders-react` — 零 GLSL，MIT 协议，React 组件式调用。

### 7.2 Hero Configuration

```tsx
import { MeshGradient } from "@paper-design/shaders-react";

<MeshGradient
  colors={["#0A0B0D", "#1A0E08", "#D75F28", "#3D1A0A", "#0A0B0D"]}
  speed={0.5}           // 0 if reduced-motion
  distortion={0.8}
  swirl={0.3}
  grainOverlay={0.12}   // 纹理质感
  style={{ opacity: 0.45 }}
/>
```

### 7.3 配置范围

| 参数 | 推荐范围 | 说明 |
|------|---------|------|
| `speed` | 0.3–0.5 | 流动速率，>0.5 太快分散注意力 |
| `grainOverlay` | 0.08–0.15 | 噪点纹理强度 |
| `opacity` | 0.3–0.5 | 整体透明度，不抢前景 |
| `distortion` | 0.6–1.0 | 变形程度 |

### 7.4 Fallback

- `prefers-reduced-motion` → `speed: 0`（冻结画面）
- WebGL 不可用 → CSS gradient 替代（radial-gradient 光晕）

---

## 8. Backgrounds

### 8.1 Hero

- 底层: MeshGradient WebGL（§7 配置）
- 中层: CSS SpotlightGradient 叠加
- 装饰: GrowthCurve SVG 地平线（opacity 0.25）

### 8.2 CSS Spotlight

```css
/* accent 色光晕 */
radial-gradient(ellipse 1200px 600px at position, oklch(0.65 0.175 42 / 0.18 * intensity), transparent 70%)

/* 冷色光晕 */
radial-gradient(ellipse 1000px 500px at position, oklch(0.45 0.10 240 / 0.15 * intensity), transparent 65%)
```

动画态：5–8s 循环，`x` 轴微漂移 + `opacity` 微调。

### 8.3 Section Backgrounds

- SVG `NoiseOverlay` — feTurbulence, opacity 0.025, blend-mode overlay
- SpotlightGradient 按 Section 位置配置（top-center / top-right / bottom-center）

### 8.4 禁止

- 纯 CSS radial-gradient 作为 Hero 背景（太素）
- Glassmorphism（`backdrop-blur` + 半透明）

---

## 9. Icons

### 9.1 Provider

**Lucide** — `lucide-react`（项目已安装）

### 9.2 Usage

| Context | Size | Color |
|---------|------|-------|
| Delta Badge 箭头 (↑/↓) | inline | `--primary` |
| ScrollRail 圆点 | 6px | `--foreground-3` / `--primary` (active) |
| 滚动指示箭头 | 16px | `--foreground-3` |

### 9.3 Treatment

线性风格（linear）。装饰性图标标记 `aria-hidden="true"`。

---

## 10. Components

### 10.1 Eyebrow Pills

```html
<span class="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]
  bg-white/5 border border-white/10 text-foreground-3">
  标签文字
</span>
```
不使用 accent 色填充——保持低调。

### 10.2 Number Display (RollingNumber)

核心数字展示必须使用逐位滚动动画（`motion-plus/react` 的 `AnimateNumber`）。

- **Spring 配置**：`type: "spring"`, `bounce: 0.1`
- **触发方式**：`useInView` 进入视窗后延迟触发
- **单位后缀**：字号为数字的 `0.28–0.35em`，color 降为次级色

### 10.3 Delta Badge (Growth Badge)

完整 HTML 结构（含 motion 属性）：

```html
<motion.span
  class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
    border border-primary/40 text-primary bg-primary/5"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
  <!-- 方向箭头 -->
  <span class="text-base leading-none">↑</span>
  <!-- 数值 -->
  <span>+34.81%</span>
  <!-- 标签 -->
  <span class="text-foreground-2 text-xs">同比</span>
</motion.span>
```

- `gap-1` (4px)：箭头 / 数值 / 标签之间
- `px-3 py-1` (12px / 4px)：内边距
- 入场时机：关联数字滚动结束后 ~200ms 从下方弹入（通过 `delay` 控制）

### 10.4 Double-Bezel Card

见 §5.3 Material。

### 10.5 Quote Blocks

大号装饰引号 `\u201C`（Georgia serif, `clamp(64px,10vw,96px)`, accent 色 50% 透明度）+ 引用正文（`weight: 300`, `textWrap: balance`）+ 出处（`tracking: 0.15em`, uppercase）。背景 `oklch(0.09 0.008 260)`，中心微弱 accent 色光晕。

### 10.6 Chapter Stamp

SVG 圆形章节标记（01-05），完整结构：

```html
<motion.svg width="104" height="104" viewBox="0 0 104 104" class="text-primary"
  initial={{ rotate: -15, scale: 0.85, opacity: 0 }}
  animate={{ rotate: -8, scale: 1, opacity: 1 }}
  transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
>
  <!-- 外圈（静态装饰） -->
  <circle cx="52" cy="52" r="44" fill="none" stroke="currentColor"
    stroke-width="2" opacity="0.8" />

  <!-- 内虚线圈 -->
  <circle cx="52" cy="52" r="38" fill="none" stroke="currentColor"
    stroke-width="0.75" opacity="0.4" stroke-dasharray="3 4" />

  <!-- 动画进度圈 (strokeDashoffset 从满到 0) -->
  <motion.circle cx="52" cy="52" r="44" fill="none" stroke="currentColor"
    stroke-width="2" stroke-dasharray={circumference}
    initial={{ strokeDashoffset: circumference }}
    animate={{ strokeDashoffset: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    style={{ rotate: -90, transformOrigin: "52px 52px" }} />

  <!-- 章节数字（居中） -->
  <text x="52" y="60" text-anchor="middle" font-size="20"
    font-weight="600" font-family="'Geist Variable'" fill="currentColor"
    letter-spacing="-0.5">
    01
  </text>

  <!-- 弧形文字 -->
  <defs><path id="arc" d="M 50,52 A 38,38 0 1,1 54,52" /></defs>
  <text font-size="7" font-family="'Geist Variable'" fill="currentColor" opacity="0.6">
    <textPath href="#arc" startOffset="15%">TIME'S FRIEND · 2026</textPath>
  </text>
</motion.svg>
```

入场动画使用 `EASE.bounce` (轻微超调回弹)。

### 10.7 Scroll Rail

右侧固定竖向导航。`fixed right-5 top-1/2`，仅桌面端（`md:flex`）。活跃段落：accent 色短线（2px × 24px）；非活跃：灰色圆点（6px）。

---

## 11. Layout Archetypes

每个 Section 必须选择不同的 archetype。不允许两个 Section 使用相同 archetype。

| Section | Archetype | 说明 |
|---------|-----------|------|
| Hero | **Centered Monolith** | 单个巨大数字居中，全屏 |
| 观看规模 | **Dominant + Sidecar** | 左侧环形图 + 右侧数据面板 |
| 曝光影响力 | **Equation Typography** | 5.12亿 × 2.78 = 14.22亿 公式排版 |
| 观看深度 | **Asymmetric Split** | 左 3fr 大数字 + 右 2fr Double-Bezel 卡片 |
| 规模扩张 | **Comparison** | 左右非对称对比（5fr / 7fr + 竖向分割线） |
| 年度增长 | **Full-bleed Chart** | YoYChart 撑满容器宽度 |
| Outro | **Centered Monolith** | 收束语居中 |

### 11.1 Responsive Rules

- **多列公式/方程**：Mobile 堆叠 `flex-col`，Desktop 展开为 `grid`
- **辅助标签行**：Mobile 隐藏，Desktop 显示，grid gap 必须一致
- **核心数字缩放**：统一使用 `clamp(min, viewport%, max)` 三值缩放
- **No horizontal scroll**：`whitespace-nowrap` 内容在小屏降级为堆叠
- **Touch targets**：所有可交互元素最小 44px

---

## 12. Chart Engineering

### 12.1 Strategy

| 场景 | 方案 |
|------|------|
| Hero 装饰曲线 | `motion.path` + `pathLength` 自绘 SVG |
| 环形占比图 | 自绘 SVG `<circle>` + `strokeDasharray/offset` + motion |
| 对比条形图 | `motion.div` + `scaleX(0→1)` + `transform-origin: left` |
| 结构化面积图 | Recharts 3 + shadcn/chart（关闭 `isAnimationActive`） |

### 12.2 Ring Chart Pattern

```tsx
<circle cx="100" cy="100" r="80" stroke="var(--border)" strokeWidth="7" />
<motion.circle
  strokeDasharray={CIRCUMFERENCE}
  strokeDashoffset={CIRCUMFERENCE}
  animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - ratio / 100) }}
  style={{ rotate: -90, transformOrigin: "center" }}
/>
```

Center text: `dominantBaseline="central"` 精确垂直居中。

### 12.3 Engineering Constraints

- **Recharts 内置动画必须关闭**：`isAnimationActive={false}`
- **Tailwind v4 图表色**：必须在 `@theme` 中声明 `--color-chart-1..5`
- **Hero 曲线**：手写 Bezier path，设计直觉调参，不走真实数据
- **图表最小高度**：400px（不允许被容器压缩）

---

## 13. Anti-Patterns (Banned)

出现任何一条 → 立即修复。

### 13.1 Visual

- ❌ **纯黑 `#000000`** — ✅ 用 Deep Ink `oklch(0.11 0.012 260)`
- ❌ **纯白 `#FFFFFF`** — ✅ 用 Warm Ivory `oklch(0.96 0.012 80)`
- ❌ **塑料橙 `#FFA500`** — ✅ 用焦橙 `oklch(0.65 0.175 42)`
- ❌ **蓝紫赛博朋克 / 霓虹发光** — ✅ 单一暖橙 accent
- ❌ **红金春节味** — ✅ 剧场仪式感
- ❌ **莫兰迪 / 粉彩** — ✅ 深色高对比
- ❌ **3 列等宽卡片** — ✅ 非对称 grid 或单列
- ❌ **卡片套卡片** — ✅ 最多 Double-Bezel 两层
- ❌ **侧边条纹** `border-left: 3px+ solid` — ✅ 全边框或背景色区分

### 13.2 Typography

- ❌ **Inter 字体** — ✅ Geist
- ❌ **全站 font-semibold (600)** — ✅ 五级字重：300/400/450/500/600
- ❌ **宋体混用** — ✅ 中文统一 Noto Sans SC
- ❌ **数字不开 `tnum`** — ✅ 必须等宽数字
- ❌ **渐变文字** `background-clip: text` — ✅ 用字重或字号做强调

### 13.3 Motion

- ❌ **纯 opacity 淡入** — ✅ 必须搭配 `y` 位移或 `scale`
- ❌ **数字整串 tween** — ✅ 逐位 spring 滚入（AnimateNumber）
- ❌ **曲线 opacity 淡入** — ✅ pathLength 绘制
- ❌ **ease 字符串** — ✅ `[n, n, n, n]` 数组
- ❌ **Canvas 2D 全屏动画** — ✅ WebGL 或 CSS
- ❌ **Recharts 内置动画** — ✅ `isAnimationActive={false}`
- ❌ **双动画系统** — ✅ 全部由 motion/react 统一管理

### 13.4 Layout

- ❌ **`h-screen`** — ✅ `min-h-screen`（iOS Safari）
- ❌ **Mobile 水平溢出** — ✅ 小屏堆叠或折行
- ❌ **Labels/data grid gap 不一致** — ✅ 相同 gap 保证列对齐

### 13.5 Engineering

- ❌ **SVG `preserveAspectRatio="none"` + `<circle>`** — ✅ 用 HTML + border-radius
- ❌ **SVG text 用 `dy` 居中** — ✅ `dominantBaseline="central"`
- ❌ **`ctx.scale(dpr, dpr)` 累加** — ✅ `ctx.setTransform(dpr,0,0,dpr,0,0)`
- ❌ **GLSL 保留字做变量名** — ✅ 避免 `half`/`input`/`output`


# PROMPT — 得到《时间的朋友》2026 开年战报生成指令

> 你（Claude Code）的任务：把这份单页 React 长图战报从 `App.tsx` 默认模板一路写到可交付状态。
> **开工前必读：`CLAUDE.md` → `DESIGN.md` → `docs/references/*.png`（7 张参考图）。**

---

## 0. 身份与目标

你是执行 Claude Code。上游 Supervisor (Nova) 已经：
- 完成 7 张参考图分析（3 张结构参考 / 4 张风格参考）
- 调研并冻结了图表方案（shadcn chart / Recharts 3 + motion SVG 自绘）
- 调研并冻结了品牌方向（得到爱马仕橙 `#D75F28`、宋体中文标题、深色剧场版）
- 在 `CLAUDE.md` 中写下工程约束、在 `DESIGN.md` 中冻结了设计系统

你的目标是：**交付一份可滚屏欣赏的单页长图战报**，核心体验是"把罗振宇跨年演讲的大屏装进一张可滚动的战报里"。

---

## 1. 验收标准（先看这个）

完成时必须满足：

- [ ] `npm run dev` 打开后，7 个分节（Hero + 6 Sections）按顺序呈现，无报错
- [ ] `npm run build` 一次通过，`npm run lint` 零 error
- [ ] 所有核心数字（11 个指标）从 `src/data.ts` 单一数据源读取，组件内**不许出现 hard-code 数字**
- [ ] 所有核心数字都以 `<RollingNumber>` 动画形式呈现，不是直接显示终值
- [ ] 每个 Section 都有 scroll-reveal 入场动画（`useInView` 触发）
- [ ] Hero 有 spotlight 背景 + 巨型中文标题（宋体）+ 副标题 + 日期
- [ ] Section 5（增长曲线）至少展示 1 条 `motion.path` + `pathLength` 的自绘曲线
- [ ] Section 3 视频号占比用径向进度或饼图展示（视频号 3247.9 / 全网 4765.7 ≈ 68.2%）
- [ ] `prefers-reduced-motion` 下所有动画降级
- [ ] 移动端（375px 宽）单列布局正常，大数字不溢出
- [ ] 桌面端（1280px+）居中 max-width 1200px，不铺满全屏

---

## 2. 安装步骤（先做这个）

```bash
# 1. 装缺失的运行时依赖
npm install recharts @fontsource-variable/noto-serif-sc @fontsource-variable/noto-sans-sc

# 2. 通过 shadcn CLI 添加 chart 组件 + 基础 UI
npx shadcn@latest add chart card badge button

# 3. 清理默认模板
# 删除 src/App.css, src/assets/ 中的 Vite/React logo
# 保留 src/assets/ 作为项目素材目录
```

---

## 3. 实现顺序（严格按此推进，不可跳步）

### Step 1: Tokens + 字体 + utils

1. **覆写 `src/index.css`**：
   - `@import` 思源宋体 / 思源黑体
   - 在 `@theme inline` 中补 `--font-chinese-serif` 和 `--font-chinese-sans` 映射
   - 在 `:root` 和 `.dark` 中按 DESIGN.md §2 填入 oklch 色值（Dark 为主，Light 可选留空）
   - 默认 `<html>` 挂 `.dark` class（战报主视觉就是深色）
   - 补 `--color-chart-1..5` 以供 Recharts 使用

2. **`src/lib/easings.ts`**：导出 `EASE` 常量（DESIGN.md §5.1）

3. **`src/lib/format.ts`**：
   - `formatChineseNumber(value: number, unit?: "万" | "亿" | "auto")` — 处理 4765.7万 / 5.12亿 / 20分34秒 等中文数量级格式
   - `formatDuration(seconds: number)` — "20分34秒"

### Step 2: 数据源

**`src/data.ts`**：

```ts
export const REPORT_META = {
  title: "时间的朋友",
  year: "2026",
  subtitle: "跨年演讲开年捷报",
  dataDeadline: "2026-01-09",
  brand: "得到 App",
} as const;

export type StatDelta = {
  value: number;           // 百分比数值，如 33.85
  label: string;           // "同比"
  direction: "up" | "down";
  note?: string;           // 可选，如 "同比新增 149 个"
};

export type Stat = {
  id: string;
  label: string;           // "全网直播观看"
  value: number;           // 数值原始值（万/亿由 unit 处理）
  unit: string;            // "万人" / "亿" / "分秒"
  displayFormat?: "number" | "duration";
  delta?: StatDelta;
  caption?: string;        // 补充说明
};

// 11 个核心指标
export const STATS: Record<string, Stat> = {
  totalViewers: {
    id: "totalViewers",
    label: "全网直播观看",
    value: 4765.7,
    unit: "万人",
    delta: { value: 33.85, label: "同比", direction: "up" },
  },
  videoViewers: {
    id: "videoViewers",
    label: "其中视频号观看",
    value: 3247.9,
    unit: "万人",
    caption: "占全网 68.2%",
  },
  onlineExposure: {
    id: "onlineExposure",
    label: "线上内容曝光",
    value: 5.12,
    unit: "亿",
  },
  totalExposure: {
    id: "totalExposure",
    label: "整体曝光",
    value: 14.22,
    unit: "亿",
    caption: "线上线下合计",
  },
  avgDuration: {
    id: "avgDuration",
    label: "人均观看时长",
    value: 20 * 60 + 34,   // 秒
    unit: "分秒",
    displayFormat: "duration",
    delta: { value: 131, label: "同比", direction: "up" },
  },
  avgOnline: {
    id: "avgOnline",
    label: "平均在线人数",
    value: 32.7,
    unit: "万",
  },
  venues: {
    id: "venues",
    label: "跨年演讲分会场",
    value: 324,
    unit: "个",
    delta: { value: 85, label: "同比新增", direction: "up", note: "新增 149 个" },
  },
  offline: {
    id: "offline",
    label: "线下参与用户",
    value: 4.3,
    unit: "万人",
    delta: { value: 168, label: "同比新增", direction: "up", note: "新增 2.7 万人" },
  },
};

// 历年增长曲线数据（用于 Section 5）
export const YOY_CURVE = [
  { year: "2023", viewers: 2850, duration: 7.8 },
  { year: "2024", viewers: 3200, duration: 9.5 },
  { year: "2025", viewers: 3560, duration: 14.2 },
  { year: "2026", viewers: 4765.7, duration: 20.57 },
];
```

注：历年曲线数据为增长趋势占位，若无官方披露可保留此估算；最终发布前与 Supervisor 确认。

### Step 3: Primitives (写在 `src/components/primitives/`)

#### 3.1 `<RollingNumber>`

```tsx
// 接收 { value, precision, suffix, prefix, duration, className }
// 核心实现：
//   const mv = useMotionValue(0);
//   useEffect(() => { if (inView) animate(mv, value, { duration, ease: EASE.out }) }, [inView])
//   const rounded = useTransform(mv, v => v.toFixed(precision ?? 1));
//   <motion.span>{rounded}</motion.span>
// 尊重 prefers-reduced-motion：直接 set value，不做 animate
```

#### 3.2 `<DeltaBadge>`

- 橙色描边 pill（不填色，避免与大数字抢戏）
- `↑` 箭头 + 百分比 + 同比文字
- 数字可用 `<RollingNumber>`
- 进入视窗后 800ms 从下方 10px 弹入

#### 3.3 `<SpotlightGradient>`

- `<div>` 绝对定位，`background: radial-gradient(...)`
- Props: `position` (top-center / top-left / bottom-right)、`hue` ("orange" | "cool")、`intensity` (0-1)
- 可选：外包 `motion.div` 做 8-12 秒缓慢 `backgroundPosition` 循环

#### 3.4 `<ChapterStamp>`

- SVG 圆章：描边 2px，橙色，`rotate(-8deg)`
- 中心有章节序号（01 / 02 / …）
- 外围是手写体英文年份 "TIME'S FRIEND 2026"（SVG text on path）

#### 3.5 `<OwlSilhouette>`

- 单色描边 SVG，猫头鹰简化形态（抽象，不用得到 logo 原件）
- 默认 `currentColor`，可在任何色下切换
- 只出现在 Hero 顶部 60x60 和 Footer 底部 120x120

### Step 4: Charts (`src/components/charts/`)

#### 4.1 `<GrowthCurve>` — 自绘 SVG

- 用于 Hero 或 Section 1 底部，飞书 Q3 风格
- 固定 viewBox `0 0 400 200`
- Path data 手写 cubic bezier：起点左下 → 缓慢上扬 → 末端右上陡升
- `<defs><linearGradient>` 多停靠点：`#7A4020 0% → #D75F28 50% → #F76A20 100%`
- `motion.path` 的 `pathLength` 0 → 1，2.4s，`useInView` 触发
- 末端数据点：`<circle>` + 橙色发光，`scale` 0 → 1 在 path 绘制完后
- 底部年份刻度：2023 / 2024 / 2025 / 2026（极细灰线）

#### 4.2 `<ComparisonBar>` — motion 双条形

- 横向或竖向对比两个数据
- Props: `{ items: { label, value, accent }[], maxValue? }`
- transform-origin 左侧，scaleX 0 → 1，stagger 200ms
- 更大的值用 `accent` 橙色，次要值用灰色

#### 4.3 `<YoYChart>` — Recharts LineChart

- 用于 Section 5：历年直播观看曲线
- 基于 `shadcn chart` + Recharts 3
- `<Line isAnimationActive={false} stroke="var(--color-chart-1)" strokeWidth={2.5} />`
- 外包 `motion.div` + `useInView` 控制入场
- 只显示 X 轴年份 + Y 轴关键刻度，极细灰线

### Step 5: Sections

每个 Section 都包在 `<Section>` 容器（`max-w-6xl mx-auto px-6 md:px-16 py-24 md:py-40`）。

#### Section 0: `<Hero>`

**视觉构图**：
```
┌──────────────────────────────────────────┐
│      [OwlSilhouette]  [小号英文：THE 2026 ANNUAL REPORT]
│
│      时间的朋友                            ← 宋体 64px
│      开年捷报                              ← 宋体 48px
│
│     4765.7 万                              ← 巨型 Geist 数字 180px
│
│     全网直播观看 · ↑33.85% 同比            ← 14px 副文
│
│                 [↓ 向下滚动]
│
│     [Spotlight Gradient 大光晕从顶部]
│     [GrowthCurve 装饰在右下]
│
│     数据截止 · 2026 年 1 月 9 日
└──────────────────────────────────────────┘
```

**动画顺序**（初始加载）：
1. `0ms` — 背景 spotlight fade in（800ms）
2. `200ms` — OwlSilhouette fade in + slide up（600ms）
3. `400ms` — 宋体标题 fade + slide up（800ms，y: 20）
4. `800ms` — 巨型数字开始 rolling（2.4s，到 4765.7）
5. `2200ms` — 副文 + DeltaBadge 出现
6. `2600ms` — GrowthCurve 开始绘制
7. `4800ms` — "向下滚动"指示 fade + 上下呼吸

#### Section 1: `<SectionViewership>` — 视频号占比

**主题**："观看规模的分布"
**数据**: `STATS.totalViewers` vs `STATS.videoViewers`
**布局**：
- 左：`<StatBlock>` 大数字 3247.9 万人 + "其中视频号观看"
- 右：径向进度圆（68.2%）
- 下方: "占全网 68.2% · 视频号成主阵地"

**自绘径向进度**：SVG circle stroke-dasharray + motion pathLength

#### Section 2: `<SectionExposure>` — 曝光对比

**主题**："从线上到全域的放大器"
**数据**：`STATS.onlineExposure` (5.12亿) vs `STATS.totalExposure` (14.22亿)
**布局**：
- Chapter Stamp 02
- 标题："线上内容 × 2.78 = 整体曝光"
- `<ComparisonBar>` 水平双条：5.12亿（灰）vs 14.22亿（橙，更长）
- 中间有乘号 ✕ 2.78 的装饰元素

#### Section 3: `<SectionDepth>` — 观看深度

**主题**："观看深度的飞跃"
**数据**：`STATS.avgDuration` (20分34秒) + delta +131% + `STATS.avgOnline` (32.7万)
**布局**：
- Chapter Stamp 03
- 左上：20 分 34 秒 巨型数字（用 `displayFormat: duration`）+ "+131% 同比" 徽章醒目
- 右下：32.7 万 平均在线
- 文案："观看时长同比翻倍，时间的朋友名副其实"

#### Section 4: `<SectionScale>` — 规模扩张

**主题**："分会场与线下的蔓延"
**数据**：`STATS.venues` (324个 / +149 新增) + `STATS.offline` (4.3万人 / +2.7万)
**布局**：双列卡片，每张卡:
- 主数字
- 辅助文字 "同比新增 149 个" / "同比新增 2.7 万人"
- 小型迷你增长条（0 → 100% 的动画表示新增比例）

**视觉细节**：两张卡 hover 时微抬升（translateY -4px + glow shadow）

#### Section 5: `<SectionGrowth>` — 年度增长曲线

**主题**："四年的时间曲线"
**数据**：`YOY_CURVE` (2023 → 2026)
**布局**：
- Chapter Stamp 05
- 标题："做时间的朋友的第 N 年"
- `<YoYChart>` 主图 + 关键点 4765.7 万做 tooltip 静态标注在 2026 点上方
- 下方三个"小数据"行: "+33.85% 观看" / "+131% 时长" / "+85% 分会场"

#### Section 6: `<SectionOutro>` — 收尾

**主题**："做时间的朋友"
**布局**：
- 中央宋体巨型字："做时间的朋友"（88px）
- 下方小字："感谢每一位长期主义者"
- 底部 OwlSilhouette（120x120）
- 微小署名：`得到 App · 2026-01-09`
- 底部小字：`Generated with care · Claude Code × Nova Design Supervisor`

---

## 4. 数据源结构（必须唯一）

所有数字在 `src/data.ts` 中集中定义。组件内禁止 hard-code。见 Step 2 代码。

---

## 5. 动效细节（重点对齐 DESIGN.md §5）

- **通用入场**：`{ initial: { opacity: 0, y: 40 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, ease: EASE.out } }`
- **Rolling Number**：视窗触发，2.0–2.4s，依数字大小微调
- **曲线**：`pathLength` 0 → 1，2.4s
- **条形**：`scaleX` 0 → 1，1.2s，transform-origin: left，stagger 200ms
- **DeltaBadge**：大数字完成 800ms 后出现
- **Chapter Stamp**：旋转 -15deg → -8deg 同时 scale 0.9 → 1
- **Hero Spotlight**：`backgroundPosition` 0% 0% → 100% 100%，12s loop，linear

---

## 6. 响应式

- Mobile（375-640px）：单列，Hero 巨型数字 clamp 到 `clamp(96px, 22vw, 180px)`
- Tablet（640-1024px）：仍多为单列，section padding 收紧
- Desktop（1024+）：max-width 1200px，两列对比 section（Section 1 / 4）变双列
- 桌面端背景光晕直径扩大（2000px），移动端收到 1200px

---

## 7. 典型陷阱（不要踩）

1. **Recharts 内置动画未关**：会与 motion/react 打架。`isAnimationActive={false}` 必加。
2. **Tailwind v4 CSS vars 未加 `--color-` 前缀**：v4 要求 `--color-primary` 才能被 `text-primary` class 识别。
3. **中文字体未加载**：Noto Serif SC 约 2MB，如果 import 整个包会拖慢 FCP，必要时 subset。
4. **Hero 数字太大导致移动端溢出**：必须 `clamp()`，不能写死 px。
5. **DeltaBadge 使用橙色 fill 背景**：会和大橙数字打架。用橙色描边 + 透明底。
6. **忘记 `prefers-reduced-motion`**：Rolling Number 的 `animate()` 需检测并降级。
7. **未定 `html.dark` 或 `body.dark`**：shadcn dark variant 不会生效，页面会显示 Light 模式空模板。
8. **Recharts ResponsiveContainer 与 motion.div layout 冲突**：如遇 viewBox 计算错位，把 layout 属性上移一层。
9. **导出长图用 html-to-image 时 SVG `<foreignObject>` tooltip 会丢**：如果有导出需求，禁用 tooltip（本项目无需考虑，除非 Chris 后续要求）。
10. **图表的 5 段色不要做彩虹**：用 橙→琥珀→青绿→青蓝 四阶（DESIGN.md §2.1），避免花哨。

---

## 8. 开发节奏建议

1. **先跑通 Hero + RollingNumber**（确保 motion/react + 字体 + 深色主题生效）
2. **再做 Section 2 (曝光对比)**（验证 ComparisonBar + 章戳 + 入场时序）
3. **再做 Section 5 (历年曲线)**（验证 Recharts + motion 包裹的组合）
4. **其他 Section 按照模板快速填充**
5. **最后做 Outro + 全局微调**（通读体验，改时序）

**每做完一个 Section，打开浏览器滚屏一遍确认体验再继续。**

---

## 9. 何时回头问 Nova（Supervisor）

- 图表方案在实现中遇到 shadcn chart 与 Recharts 3 API 兼容问题
- 思源字体包体积过大影响首屏，需讨论是否子集化
- 某个 Section 的具体文案找不到合适表达（如"做时间的朋友的第 N 年"中的 N）
- 数据源中某个指标需要新增同比数据且无官方披露

其他情况下按本指令推进即可。

---

## 10. 最终交付

完成时 Commit Message 建议：

```
feat: 生成得到《时间的朋友》2026 开年战报主页面

- Hero + 6 Section 长图结构，深色剧场版
- 所有核心数字 RollingNumber 动画，scroll-reveal 入场
- 图表：shadcn chart (Recharts 3) + Hero SVG 自绘曲线
- 字体：宋体中文标题 + Geist 大号数字
- 色彩：爱马仕橙 #D75F28 单一 accent

Co-authored-by: Nova Design Supervisor
```

---

*PROMPT 生成：2026-04-16 · by Claude Opus 4.6 (Supervisor)*
*上游参考：CLAUDE.md / DESIGN.md / docs/references/*

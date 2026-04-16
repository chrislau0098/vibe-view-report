# Critic · 设计评审与修复路线

> **Supervisor**: Nova Design Supervisor (Claude Code)
> **Date**: 2026-04-16
> **Scope**: 整站（Hero + 6 Sections + Primitives + Charts）
> **Design Skill Loaded**: `high-end-visual-design` · `critique` · 项目根 `DESIGN.md`
> **Verdict**: ⚠️ 方向对，执行差一口气。结构完整、骨架清晰，但质感、节奏、字重与背景都卡在了「AI 模板」而非「$150k Agency build」的那条线上。

---

## 0. 问题的本质（一句话）

**当前页面的问题不是「画得不好」，而是「所有 Section 都用了同一套 Template」**。
每一节都是：`ChapterStamp → tracking-0.2em 英文小标 → 粗中文 H2 → clamp 巨字 + DeltaBadge → 说明段`。
节奏完全一样 → 没有呼吸 → 连续看完 7 屏像翻 7 页同一张 PPT。
**高级感不是来自渲染，是来自「结构变化 + 字重对比 + 克制」**。

---

## 1. Design Health Score (Nielsen + 本项目加权)

| 维度 | 分 | 关键问题 |
|------|-----|----------|
| 视觉层级（Hierarchy） | 2/4 | 所有数字 `font-semibold` + `clamp(80px+)`，没有主次。节内、节间都没有第二层级。|
| 排版系统（Typography System） | 1/4 | 字重只有 600/500，**没有 300/400 拉开轻重对比**。中英文混排 600 显得臃肿。|
| 构图节奏（Composition Rhythm） | 2/4 | 7 节全部 `max-w-5xl mx-auto` + 等量 `py-24 md:py-40` + 居中或两栏。**结构同质**。|
| 图表表达（Data Visualization） | 2/4 | YoYChart 被关进 `h-72` 小盒子；SVG 径向环中规中矩；Hero 底部 GrowthCurve 只有 30% opacity — 被浪费。|
| 背景与氛围（Atmosphere） | 1/4 | 只有 2 个 `radial-gradient` + SVG 噪点。**完全没有 WebGL / Shader**。Hero 太素。|
| 细节工艺（Craft） | 3/4 | ChapterStamp 斜 -8°、RollingNumber tnum、motion easing 都做得不错。|
| Anti-AI-Slop 符合度 | 2/4 | 结构对、色板对，但「每节同模板 + 统一粗体 + 单调背景」是典型 AI 模板 tells。|
| **总分** | **13/28** | **C 级 · 需要一轮大修** |

---

## 2. 用户提出的四大问题 · 逐项诊断

### 问题 ① 没有高级感，数字布局混乱

**根因诊断：**

1. **构图同质化 — 每节一个模板。** 全部 7 节共用：顶部 ChapterStamp → 英文 label → 中文 H2 → 巨字 + Delta → 说明段。**没有任何一节打破这套节奏**。高级感=对比=差异。
2. **数字缺乏第二层级。** `SectionViewership` 左侧环 260px + 下方 clamp(40-72)，右侧又给一个 clamp(52-96) 的 video.value — **没有明确谁是主角**。`SectionDepth` 也同问题：左边 MINS clamp(80-160) + SECS clamp(48-96) 并列，右边 avgOnline clamp(44-88) 又一个巨字 — 一屏三个主角 = 没有主角。
3. **硬编码 oklch 散落各处。** `color: "oklch(0.73 0.185 48)"` 出现 10+ 次，而不是用 `--primary-hl` 或 `text-primary` token — 无法全局调音。
4. **`SectionExposure` 的方程式布局错位。** 看 `SectionExposure.tsx:53`：顶部 label 行用 `grid-cols-[1fr_auto_1fr]`（三栏），而下方方程式行用 `grid-cols-[1fr_auto_1fr_auto_1fr]`（五栏），**两个网格对不齐**；中间的"×"和"2.78"又挤进一个 column 里，labels 行还用 `text-transparent` 占位的"×" — 是一个凑出来的 hack。读者看到的不是"A × 2.78 = B"的优雅公式，而是"数 空白 数"的混乱 baseline。
5. **Section 边界靠 `border` 和颜色切换 — 没有节奏断点。** 整站节奏就是 `py-24 md:py-40` 一把锤子敲到底。

**修复建议（按见效快慢排序）：**

- **[P0] 给每节分配不同的「节内构图模式」**：
  - Hero = **聚焦中轴**（保留）
  - Viewership = **「环 vs 侧栏」两栏**（保留，但把右侧 break-down 字号降为 clamp(36,5vw,56) ，拉开层级）
  - Exposure = **满屏方程式**（重写为单一 grid-cols-[auto_auto_auto_auto_auto] baseline 对齐 + 给"×"单独一条灰色细线连接左右数字，把"= 14.22亿次"放到下一行靠右，不和 online 拉平）
  - Depth = **超大时长占 2/3 宽 + 右侧 1/3 放 avg online 作为 sidecar**（现在 3fr+2fr 已对，但要把右侧「在线人数」改为 Quote 风格而非第二个 big number）
  - Scale = **现版两栏分屏 OK**，但改为 **grid-cols-[5fr_7fr]** 不对称比例，打破 50/50 中心轴
  - Growth = **满宽图表 + 三栏 metrics 横条**（保留，但图表放大到 h-96 ~ h-[420px]）
  - Outro = **居中纪念碑式**（保留）
- **[P0] 每节选一个「主数字」，其他退后。** 规则：主数字 clamp(96-180)、weight 500；辅助数字 clamp(36-56)、weight 400、`text-foreground-2`。**不允许一节出现两个 >80px 的数字**。
- **[P1] 消灭所有 `color: "oklch(...)"` 内联**，全部改成 `className="text-primary-hl"` / `var(--primary-hl)`。便于统一调音并避免 Tailwind 无法 purge 优化。
- **[P1] 引入 Eyebrow Pill**（high-end-visual-design skill 明确推荐）：把现有的 `tracking-[0.2em] uppercase` 文字改为 `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]` 胶囊，立刻「高级 20%」。
- **[P2] 引入 Double-Bezel 嵌套容器**：所有 card（SectionDepth 的右侧 panel、SectionGrowth 的图表盒）包一层外壳 `p-1.5 ring-1 ring-white/5 rounded-[2rem]`，内层 `rounded-[calc(2rem-0.375rem)]`。这是 Linear/Apple 的惯用手法，有 machined hardware 的质感。

---

### 问题 ② 字体太粗，没有对比度

**根因诊断：**

查 `src/**/sections/*.tsx` — **每一个大数字都是 `font-semibold`（600）**。数一下：
- Hero Big Number: `font-semibold`
- SectionViewership 两个巨字: 都是 `font-semibold`
- SectionExposure online/total: 都是 `font-semibold`
- SectionDepth MINS/SECS/avgOnline: 都是 `font-semibold`
- SectionScale venues/offline: 都是 `font-semibold`
- SectionGrowth +% 三宫格: 都是 `font-semibold`
- SectionOutro 做时间的朋友: `font-semibold`
- 所有中文 H2: 都是 `font-semibold`

**= 整站只有两档字重：600（数字/标题）+ 400~500（正文/label）。** Feishu Q3 报告、Apple Event 关键帧、Linear 首页——它们真正用的是 **300 / 400 / 500 / 600 四档混合**。这是 AI Slop 非常经典的一条 tell：**"all-bold = no hierarchy"**。

另外注意：`src/index.css:12` 定义了 `--font-chinese-serif: 'Noto Sans SC Variable'` —— **命名还是 serif 但值已经是 sans 了**，是一个命名遗留 bug，会让未来维护困惑。

**修复建议：**

- **[P0] 建立四档字重系统：**
  ```
  Display巨字 (主数字)         → font-weight: 500 (Medium)   ← 从 600 降！
  Display次数 (副数字)         → font-weight: 400 (Regular)
  H2 中文标题                  → font-weight: 500 (Medium)   ← 从 600 降！
  Label / Eyebrow              → font-weight: 500 + tracking-wider
  正文                         → font-weight: 400
  Delta/%强调 (仅此一处保留粗) → font-weight: 600
  ```
  **关键点**：Geist Variable 500 配合 `tracking-[-0.04em]` + `leading-[0.88]` 才是 Feishu Q3 那种"紧致但不笨"的感觉。当前 600 把字撑得太满。
- **[P0] 中文字重必须比拉丁低半档。** Noto Sans SC 在 500 Latin 的视觉权重上约等于 600 Chinese。所以当 Latin 数字用 500 时，**中文标题应该用 400 或 450** (Variable 字体可以精细到 450)。
  ```tsx
  // 推荐写法：
  <h2 style={{ fontWeight: 450, fontFamily: "var(--font-chinese-sans)", ...}} >
    观看时长同比翻倍，时间的朋友名副其实
  </h2>
  ```
- **[P1] 引入「极细对比层」。** 所有 Label / Meta / 注解 用 `font-weight: 300` + `tracking-[0.15em]` + `uppercase` —— 这是 Linear、Vercel、ArcBrowser 官网最常见的「大数字 500 vs 标签 300」对比手法。**对比度不是靠加粗，而是靠"极轻 vs 中等"**。
- **[P1] 重命名 token。** 把 `--font-chinese-serif` 删除（或改名为 `--font-chinese-display`）。现在的语义是错的。
- **[P2] 数字加 `fontVariationSettings: "'opsz' 72"`** 如果 Geist Variable 支持 optical sizing — 大字号下字形会自动变窄、黑度更合理。当前没用上 opsz。
- **[P2] 收紧中文标题的 letterSpacing。** 现在是 `-0.3px`，至少改为 `-0.02em`（相对单位，大字号才收得住）。

**示例 Before / After：**

```tsx
// Before (现在的 Hero)
<div className="font-semibold leading-[0.9] tracking-[-0.04em]"
  style={{ fontSize: "clamp(88px, 18vw, 200px)", color: "oklch(0.73 0.185 48)" }}>

// After
<div className="text-primary-hl leading-[0.88] tracking-[-0.045em]"
  style={{
    fontSize: "clamp(88px, 18vw, 200px)",
    fontWeight: 500,                                    // ← 500 not 600
    fontVariationSettings: "'opsz' 72",
    fontFeatureSettings: '"cv01", "ss03", "tnum"',
  }}>
```

---

### 问题 ③ 图表不够大气

**根因诊断：**

1. **YoYChart 被装进盒子里。** `SectionGrowth.tsx:80-89`：图表外层 `rounded-2xl border border-border-strong p-6 md:p-10 mb-12` + `h-72`（288px）——**等于给一张史诗战报塞了个 Dashboard 小组件**。Feishu Q3 的那张"180%"是 **满屏 hero**，图不是证据而是场景。
2. **Recharts 默认样式过于 enterprise。** CartesianGrid strokeDasharray 3 3 + 普通 Line stroke 2.5 + 默认 XAxis/YAxis tick 是 **BI Dashboard 的既视感**，而不是《时间的朋友》的大屏质感。
3. **Hero 底部的 `GrowthCurve` 组件被浪费。** `Hero.tsx:132-140`：`className="absolute bottom-12 right-4 sm:right-12 w-48 sm:w-72 opacity-30"` —— **仅 30% 不透明 + 最多 288px 宽 + 藏在右下角**。这张 2023→2026 的上升曲线本应是 Hero 的视觉主轴之一，现在像水印。
4. **SVG 径向环（SectionViewership）数值太小。** `viewBox="0 0 140 140"` + `r="60"` + `strokeWidth="7"` → 实际渲染 260×260 的弧线。**对于页面宽 max-w-5xl（约 1024）来说，环只占 25% 宽**。大气=空间。
5. **ComparisonBar 组件写了却没用**（`src/components/charts/ComparisonBar.tsx`）—— 死代码，暗示设计方案曾考虑但未执行。
6. **图表数据点的 annotation 太弱。** YoYChart 的 "4765.7万" ReferenceDot label 只有 fontSize 12 —— 读者要眯眼看。Feishu Q3 那种终点巨字 + 连接线才是效果。

**修复建议：**

- **[P0] SectionGrowth 图表直接放大到 Hero-scale。**
  ```tsx
  // Before
  <div className="rounded-2xl border border-border-strong p-6 md:p-10 mb-12">
    <div className="h-72"><YoYChart /></div>
  </div>

  // After
  <div className="relative mb-16 -mx-6 md:-mx-16 px-0">
    {/* 去掉盒子，让图表 bleed 到屏幕边缘 */}
    <div className="h-[420px] md:h-[560px] relative">
      <YoYChart />
      {/* Overlay 终点注解：clamp(48,6vw,80) 的 "+33.85%" 压在右上 */}
      <div className="absolute top-8 right-8 md:top-12 md:right-16
                      font-medium tracking-[-0.04em] text-primary-hl"
           style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
        +33.85%
      </div>
    </div>
  </div>
  ```
- **[P0] 重写 YoYChart 视觉参数：**
  - 把 Recharts 的 `CartesianGrid` 彻底移除（或只保留一条 0 baseline）—— 大屏报告不需要网格
  - Line `strokeWidth={3.5}` 改 `strokeWidth={1.5}` + 在终点放一个 radius 8 的 glowing dot
  - 把 Line 改为渐变描边（`<linearGradient>` chart-4→chart-1）
  - 把 `ReferenceDot` label 字号改为 fontSize 28+，font-weight 500，带一根从点到标签的细指引线（`<line>` stroke-dasharray 2 3）
  - 增加 area fill（透明度 0.08）让曲线下方有"体积感"
- **[P0] Hero 底部 GrowthCurve 升级为背景级元素：**
  ```tsx
  // Before: absolute bottom-12 right-4 sm:right-12 w-48 sm:w-72 opacity-30
  // After:  absolute inset-x-0 bottom-0 w-full h-[40%] opacity-60
  ```
  让曲线横贯 Hero 底部，像地平线。再把 tick 年份 2023-2026 也拉大 2x。
- **[P1] SectionViewership 径向环放大：**
  - `svg width="380" height="380"` （从 260 提升）
  - 在环的外圈再加一圈 0.5px `oklch(1 0 0 / 0.04)` 的极淡轨道线，形成「双轨」
  - 中心"68.2%"用 font-weight 400（不是 700）+ fontSize 40，**反直觉的细反而更高级**
  - 环的 progress arc 动画结束后，在 68.2% 对应位置放一个小 dot + 向外延伸一根短 tick + "视频号" 文字标注 —— 像地理坐标
- **[P1] 激活 ComparisonBar 或删除。** 建议激活：`SectionExposure` 的 "14.22 亿次 vs 5.12 亿 vs 8.x 亿线下" 用 ComparisonBar 做一个附加视觉，把当前的"方程式"升级为"方程式 + 堆叠条"，这样 14.22 亿不是孤立的数字而是"5.12 + 9.10"的总和。
- **[P2] 删除未使用的 `OwlSilhouette`**，或考虑在 SectionOutro 的"做时间的朋友"上方放一个极小（24-32px）的 owl 剪影作为品牌锚点——**这是项目 DESIGN.md 提到的得到品牌符号，现在完全没用上**。

---

### 问题 ④ 首屏太素，需要 WebGL 背景点缀

**根因诊断：**

查 `src/components/sections/Hero.tsx:18-26` + `src/components/primitives/SpotlightGradient.tsx`：

Hero 现有背景 = **2 个 CSS `radial-gradient` + 1 个 SVG feTurbulence 噪点，opacity 0.025**。

没有：
- ❌ WebGL Canvas
- ❌ Shader（GLSL fragment/vertex）
- ❌ 流动的 aurora / fluid mesh
- ❌ 粒子系统
- ❌ 柏林噪声动画
- ❌ 光线追踪 / SDF（Signed Distance Field）
- ❌ Unicorn Studio 那种 dithered gradient flow
- ❌ 任何 real-time 渲染

当前唯一的"动"是 `SpotlightGradient` 的 `shouldAnimate` 分支：`x: [0, 40, -30, 0]` 横移 14 秒循环 —— **这是 CSS translate animation，不是 shader**，呼吸感有限。

**修复建议（按实现成本排序，低→高）：**

#### 方案 A · 最低成本（纯 CSS/SVG 升级，2-3 小时）
- 把现有 SVG 噪点从 opacity 0.025 升到 0.05，并加一层 `mix-blend-mode: overlay`
- 新增「Animated Grain」层：用 `@keyframes` 让 `background-position` 动起来（0.8 秒循环），制造胶片颗粒抖动
- 在 Spotlight 上叠加 `mask-image: radial-gradient()` 做边缘羽化
- **缺点**：仍然不是 shader，达不到 Unicorn Studio 的感觉

#### 方案 B · 推荐方案（Paper-Design / ShaderGradient，1 天）
选用 **`@paper-design/shaders-react`**（MIT license，一键 React 组件，内置 Mesh Gradient / Grain Gradient / Aurora / Dithered Patterns 等），这是 Unicorn Studio 的开源替代：

```bash
npm install @paper-design/shaders-react
```

```tsx
// src/components/primitives/ShaderBackdrop.tsx
import { MeshGradient, GrainGradient } from "@paper-design/shaders-react";

export function HeroShaderBackdrop() {
  return (
    <>
      {/* 底层：缓慢流动的 Mesh Gradient */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#0A0B0D", "#1A0E08", "#D75F28", "#3D1A0A", "#0A0B0D"]}
        distortion={0.8}
        swirl={0.3}
        speed={0.15}  // 非常慢，像缓慢呼吸
        style={{ opacity: 0.4 }}
      />
      {/* 中层：Grain Gradient 做颗粒感 */}
      <GrainGradient
        className="absolute inset-0 w-full h-full pointer-events-none"
        colors={["#D75F28", "#0A0B0D"]}
        softness={0.9}
        intensity={0.35}
        noise={0.5}
        speed={0.25}
        style={{ mixBlendMode: "overlay", opacity: 0.5 }}
      />
    </>
  );
}
```
- ✅ 零 GLSL，完全声明式
- ✅ 已经是 GPU 加速（基于 OGL）
- ✅ 可以 SSR-safe
- ✅ 官方 playground 可以调参：https://shaders.paper.design/

#### 方案 C · 深度定制（React Three Fiber + 自写 shader，3-5 天）
只有在 B 方案的美感不满足时再考虑。用 `@react-three/fiber` + `three/glsl` 写一个 fragment shader，做 fluid mesh / curl noise。
- ⚠️ 警告：项目 `CLAUDE.md` 里的 "Critical Constraints" 已经提过 **WebGL shader pitfalls**（uniform 丢失、precision mediump 在 iOS 上失真、glyph atlas 问题）。建议先走 B 方案，除非美术明确要求 C 的独特性。

#### 方案 D · 折中方案（Unicorn Studio 嵌入）
Chris 用户消息里明确提到 Unicorn Studio。该服务确实可以导出独立 `.html` 或嵌入 `<iframe>`，但：
- ⚠️ 依赖 CDN，断网/离线不可用
- ⚠️ 会被 AdBlock 拦截
- ⚠️ 定价策略近期变化
- 如要用，建议 **只在 Hero 用**，其它 section 保持 CSS spotlight，以免首屏 bundle > 500KB。

#### 额外 WebGL 彩蛋建议
- **SectionGrowth 背景改为 `ShaderGradient` dithered flow**（速度更慢，opacity 0.25），让整张图表坐在流动的底色上
- **SectionOutro 结尾用 `DotOrbit` shader**（Paper-Design 内置），做一个"星图"收束效果，比现在的 `radial-gradient` 结尾更有仪式感

---

## 3. 其他发现 · 次级问题

### 代码卫生 (Code Hygiene)
- **死代码**：`ComparisonBar.tsx` 和 `OwlSilhouette.tsx` 被定义但没被任何文件 import。要么激活，要么删除。
- **硬编码颜色 10+ 处**：`color: "oklch(0.73 0.185 48)"` 应全部改为 CSS token（参见问题 ①.P1）。
- **`--font-chinese-serif` token 命名错误**（`src/index.css:12`）：值已不是 serif，命名会误导后续维护。
- **`backgroundImage` 内联 SVG dataURI 噪点** 写在 `Hero.tsx:25`，内容太长；建议抽到 CSS class 或独立 primitive `<NoiseOverlay />`。

### Motion Choreography
- **EASE 数组本身都对**（`src/lib/easings.ts`），符合 motion/react v12 的新规范。
- 但 **每一个 Section 的 motion delay 都是独立手写**（Hero 2.6、SectionViewership 0.4、SectionDepth 0.5...），**节奏难以统一调整**。建议抽成 `src/lib/timing.ts`：
  ```ts
  export const TIMING = {
    chapterStamp: 0.6,
    headerLabel: 0.1,
    headerH2: 0.2,
    primaryNumber: 0.4,
    secondaryNumber: 0.6,
    deltaBadge: 1.8,
    caption: 2.0,
  } as const;
  ```
- **`useInView(margin: "-20%")`** 在 iPhone SE (小屏) 可能触发过早，考虑改为 `amount: 0.3` 更稳定。

### Accessibility
- Hero 的 "向下滚动 ↓" 是装饰性，缺 `aria-hidden="true"`。
- 所有 RollingNumber 的 span 缺少 `aria-label={value}`（读屏器听不到最终数值，只会念动画中间态）。
- `prefers-reduced-motion` 在 `src/index.css:133-138` 全局覆盖 OK，但 Hero 的 Spotlight `shouldAnimate` 仍会运行 —— motion/react 不会自动被 CSS 覆盖，需要在 JS 中也 check。

### 性能
- Recharts 引入约 ~90KB gzipped；如最终只用 LineChart，考虑切换 **`visx`** 或直接用 `motion.path` 自绘（项目 `CLAUDE.md` 里也提到了这条建议但没执行）。
- `ResponsiveContainer` 在移动端会导致 re-layout，给 YoYChart 的外壳一个固定 `height` 就够。

### 结构级建议
- **缺少"过渡节"**。7 个 Section 直接一屏接一屏，读者没有喘息。建议在 Section 2→3、5→6 之间插入 **quote-only section**（只有一句罗振宇原话 + 背景 WebGL），字号 clamp(32,5vw,56)，全黑背景，制造留白。
- **缺少进度指示**。滚动 7 屏长报告，读者不知道自己在哪。建议右侧 fixed 一个极轻 **Scroll Progress Rail**：1-2px 宽、7 个节点，当前节点发光。

---

## 4. 修复优先级矩阵 (P0 → P3)

| 优先级 | 问题 | 修复动作 | 预期影响 | 预估工时 |
|-------|------|---------|---------|---------|
| **P0** | 全站 `font-semibold` 单字重 | 推行 500/450/400/300 四档字重系统 | ⭐⭐⭐⭐⭐ 瞬间去 AI-Slop | 2h |
| **P0** | Hero 太素 | 接入 Paper-Design Shaders (方案 B) | ⭐⭐⭐⭐⭐ 首屏质感跃迁 | 4-6h |
| **P0** | YoYChart 被装盒子 | 放大到 h-[560px] bleed + 终点 +33.85% 巨字 | ⭐⭐⭐⭐ 大气感 | 3h |
| **P0** | 每节同模板 | 为 7 节各指派不同构图模式 | ⭐⭐⭐⭐ 节奏多样性 | 4-6h |
| **P1** | 硬编码 oklch 散落 | 统一改用 `text-primary-hl` token | ⭐⭐⭐ 可维护性 | 1h |
| **P1** | Hero 底部 GrowthCurve 被浪费 | 升级为 bleed 地平线 opacity 0.6 | ⭐⭐⭐ 视觉锚点 | 1h |
| **P1** | Double-Bezel 容器未使用 | card 类容器全部嵌套外壳 | ⭐⭐⭐ 机械质感 | 2h |
| **P1** | SVG 径向环太小 | 放大到 380×380 + 双轨描边 | ⭐⭐⭐ | 1h |
| **P1** | 中文字重同 Latin | 中文降半档到 450 | ⭐⭐⭐ | 1h |
| **P1** | Eyebrow 改 Pill | `rounded-full px-3 py-1` | ⭐⭐ | 1h |
| **P2** | `SectionExposure` 方程式错位 | 重写为单一 grid baseline 对齐 | ⭐⭐ | 2h |
| **P2** | ComparisonBar 死代码 | 激活（用于 SectionExposure 堆叠条）| ⭐⭐ | 2h |
| **P2** | `OwlSilhouette` 死代码 | SectionOutro 加品牌锚点 | ⭐⭐ | 0.5h |
| **P2** | Section 之间无过渡 | 插入 2 个 Quote-only 节 | ⭐⭐ | 2h |
| **P3** | Scroll Progress Rail | 右侧固定 7 节点指示器 | ⭐ | 2h |
| **P3** | `--font-chinese-serif` token 重命名 | rename → `--font-chinese-display` | ⭐ | 0.5h |
| **P3** | Accessibility 补齐 | `aria-label` / `aria-hidden` | ⭐ | 1h |

**总工时估算：P0 约 13-17h，全部完成约 32-38h。**

---

## 5. 推荐施工顺序（建议分 3 个 commit）

### Commit 1 · 「字重大修」（P0 typography）
- 新建 `src/styles/typography.ts` 定义 weight scale
- 全站 `font-semibold` → `font-weight: 500`（数字）/ `font-weight: 450`（中文 H2）
- 引入 `'opsz'` variation settings
- 删除 `--font-chinese-serif`，改名 `--font-chinese-display`
- **立刻回看：应该能解决 60% 的「AI Slop 感」**

### Commit 2 · 「背景与大图」（P0 Hero + Chart）
- `npm install @paper-design/shaders-react`
- 新建 `HeroShaderBackdrop.tsx`（方案 B）
- Hero 底部 GrowthCurve 升级为地平线
- YoYChart 解除盒子，放大到 560px，终点 +33.85% 巨字
- **立刻回看：Hero 质感 + 图表大气**

### Commit 3 · 「节奏与结构」（P0-P1 composition）
- 为 7 节分配不同构图（见问题 ①.P0）
- 每节只留一个主数字
- Double-Bezel 容器套所有 card
- 硬编码 oklch 统一替换
- Eyebrow 改 Pill
- **立刻回看：应该达到 $150k agency 感**

后续 Commit 4+ 处理 P2 / P3。

---

## 6. 给 Chris 的一段 Supervisor 直言

当前项目的**骨架是对的**——色板对、motion easing 对、RollingNumber 精度对、oklch 色彩空间用对了、数据布局有思考。
但成品感**败在了三件事**：

1. **没有敢用「极轻」字重**。高级感是对比，不是粗。Feishu Q3、Linear、Vercel 全都是「中等字重 + 极细 Label」。全页 600 是求稳，但求稳就是 AI Slop 的第一步。
2. **没有 GPU 级别的背景**。CSS radial-gradient 在 2026 年已经是基础款。Unicorn Studio 美感的核心是 **shader 的连续变化 + 颗粒** —— CSS 做不到这种"活的"感觉。Paper-Design Shaders 是最佳 ROI 选择。
3. **节奏被 Template 化了**。每节一样的 ChapterStamp + H2 + Big Number + DeltaBadge。这是 AI 一次生成 7 个文件时的典型行为 —— 它找到了一套 working pattern 就复用到底。解法是**强制每节有一个「构图专属决策」**。

**好消息是以上三件事都在 P0 里，总工时 13-17 小时。** 按本文 Commit 顺序走，3 次 commit 能把分数从 13/28 拉到 22/28 以上。

---

*Generated by Nova Design Supervisor · 基于 `high-end-visual-design` · `critique` skill + 项目 `DESIGN.md` 第 1.2 风格定位 · 2026-04-16*

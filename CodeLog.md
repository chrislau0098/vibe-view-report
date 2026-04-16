# CodeLog — vibe-view-report-1

得到《时间的朋友》2026 开年战报 · 开发与调试记录

---

## 2026-04-16

---

### [commit `64fd6ba`] 初始化项目脚手架

**时间**：16:33

初始化 Vite + React 19 + TypeScript 项目，安装基础依赖：
- Tailwind CSS v4（CSS-first，无 `tailwind.config.js`）
- `motion/react`（Framer Motion v12+）
- shadcn/ui（Tailwind v4 mode）
- `@base-ui/react`、`lucide-react`、Geist Variable 字体

---

### [commit `84206b1`] CLAUDE.md 初始化

**时间**：16:34

写入项目开发指引，记录 Tech Stack、Architecture、Critical Engineering Constraints（motion easing 数组格式、Recharts `isAnimationActive: false`、WebGL 注意事项等）。

---

### [commit `a47693b`] 主页面首次生成

**时间**：17:45

完整生成战报单页应用：

**新建文件**：
- `src/data.ts` — 唯一数据源，11 项数据指标
- `src/lib/easings.ts` — EASE.out / EASE.bounce 等 cubic-bezier 常量
- `src/components/primitives/` — RollingNumber、DeltaBadge、SpotlightGradient、ChapterStamp、OwlSilhouette
- `src/components/charts/` — GrowthCurve（SVG 自绘）、YoYChart（Recharts LineChart）、ComparisonBar
- `src/components/sections/` — Hero、SectionViewership、SectionExposure、SectionDepth、SectionScale、SectionGrowth、SectionOutro

**设计选型**：
- 爱马仕橙 `#D75F28` 单一 accent（oklch 色彩空间）
- Geist Variable 大号数字 + 思源黑体中文
- 深色剧场版（Theatre Dark），SpotlightGradient CSS radial-gradient 光晕

**已知遗留问题**（将在下一 commit 修复）：
- Hero 为 CSS-only 背景，无 GPU backdrop
- 所有大数字 font-weight: 600（单调，AI 感强）
- YoYChart 使用 LineChart 而非 AreaChart，无渐变填充
- GrowthCurve 在 Hero 仅小尺寸装饰，未铺满底部

---

### [commit `f45d59a`] 全站设计升级

**时间**：22:10

基于 Critic.md（评分 13/28）制定并执行 3 阶段升级：

#### Commit 1 内容 — 字重大修（Typography）

**问题**：所有数字统一 600 weight = AI 模板感，无层次。

**新字重体系**：

| 情境 | fontWeight | 备注 |
|------|-----------|------|
| Display 主数字 | 500 | + `fontVariationSettings: "'opsz' 72"` |
| Display 副数字 | 400 | 反直觉的轻 = 高级感 |
| 中文 H2 | 450 | Variable font 支持 |
| 眉头标签 / Eyebrow | 300 | 极轻，关键对比层 |
| Delta / % 徽章 | 600 | 唯一允许重的地方 |

**其他改动**：
- 所有 ChapterStamp 标签改为 Eyebrow Pill 胶囊样式
- 硬编码 `oklch(0.73 0.185 48)` 全部替换为 `var(--primary-hl)`
- `--font-chinese-serif` 重命名为 `--font-chinese-display`（废弃宋体）

#### Commit 2 内容 — WebGL 背景 + 图表突破

**问题**：Hero 背景为纯 CSS，无质感；YoYChart 被锁在小盒子里。

**新增 `src/components/primitives/ShaderBackdrop.tsx`**：
```tsx
// 坑点 1：@paper-design/shaders-react 没有 GrainGradient 组件
// 方案：改用 MeshGradient 内置的 grainOverlay prop
<MeshGradient
  speed={reduce ? 0 : 0.15}
  grainOverlay={0.12}
  colors={["#0A0B0D", "#1A0E08", "#D75F28", "#3D1A0A", "#0A0B0D"]}
/>
```

**YoYChart 重构**（LineChart → AreaChart）：
- 渐变描边：`url(#lineGrad)`（chart-4→chart-1 水平渐变）
- 区域填充：`url(#areaFill)`（chart-1 0.12→0 垂直渐变）
- 移除 CartesianGrid
- 发光终点 dot：`dot` prop 函数，只对最后一条数据渲染 `<g filter="url(#dotGlow)">`

**调试记录**：
- Recharts `dot` 函数必须对非终点返回 `<g key=... />`（不能 `null`），TypeScript 要求 ReactElement

**GrowthCurve 升级为全宽地平线**：
- 新增 `decorative` boolean prop
  - `decorative=true`：`preserveAspectRatio="none"`（无文字时安全），不渲染年份标签和数据注释
  - `decorative=false`（default）：`preserveAspectRatio="xMidYMid meet"`，渲染完整数据标注

**调试记录**：
- `preserveAspectRatio="none"` + 文字 = 字形拉伸变形 → 必须用 `decorative` prop 隐藏所有文字节点才能安全使用

**SectionGrowth 图表突破容器**：
- 移除 `rounded-2xl border` 容器
- 改为 `-mx-6 md:-mx-16` 负 margin 出血
- `h-[420px] md:h-[560px]`
- `+33.85%` 大字覆盖在图表右上角

#### Commit 3 内容 — 结构重组

- SectionViewership 径向环放大：r=60→80，SVG 380×380，CIRCUMFERENCE 重算
- 新增外层装饰轨道（r=90，opacity 0.03）
- 弧线终点 geo 标注点（精确坐标由角度计算：155.5° = 2.714 rad）
- SectionScale 改为非对称 5fr/7fr grid
- Double-bezel 容器模式：`p-1.5 ring-1 ring-white/5 rounded-[2rem]` 外壳 + `rounded-[calc(2rem-0.375rem)]` 内层
- **新增 `QuoteInterstitial` 组件**：两处过渡节（演讲主题引言），`textWrap: "balance"` 防孤字
- **新增 `ScrollRail`**（App.tsx 内联）：右侧固定 7 节进度点，`useScroll` + `useMotionValueEvent`
- **接入 agentation 调试插件**：`npm install agentation -D`，`{import.meta.env.DEV && <Agentation />}`
- SpotlightGradient 动画修复：从无效的 `backgroundPositionX` 改为 `x: [0, 40, -30, 0]` translate 漂移

---

### [commit `fe0ebe5`] 移除 Critic.md

**时间**：22:19

```bash
git rm --cached Critic.md
echo "Critic.md" >> .gitignore
```

设计审查文件属于工作过程记录，不应提交到公开仓库。

---

### [commit `630c5f8`] Agentation 视觉反馈 11 项修复

**时间**：22:46

通过 Agentation 可视化批注工具收集到 11 条反馈，逐一修复：

| # | 问题 | 文件 | 修复方式 |
|---|------|------|---------|
| 1 | Hero 文字层级不够大气 | `Hero.tsx` | 标题 fontWeight 450→300，fontSize `clamp(36px,7vw,64px)`→`clamp(20px,3.2vw,38px)`；副标题同步减小，与巨型数字形成 3× 对比差 |
| 2 | 背景动效速率太慢 | `ShaderBackdrop.tsx`、`SpotlightGradient.tsx` | MeshGradient speed 0.15→0.3；Spotlight 动画 duration 14s→7s |
| 3 | 装饰曲线缺数据点，颜色太亮 | `GrowthCurve.tsx`、`Hero.tsx` | `decorative` 模式新增 3 个中间微光点（opacity 0.4）+ 终点双圈 glow；Hero wrapper `animate={{ opacity: 0.6 }}`→`0.25` |
| 4 | Viewership Insight 文字被 maxWidth 截断换行 | `SectionViewership.tsx` | 移除 `style={{ maxWidth: "24ch" }}` |
| 5 | 环形图中心数字未居中 | `SectionViewership.tsx` | SVG text y 坐标：68.2% `y=92`→`y=97`，标签 `y=112`→`y=113` |
| 6 | Exposure 公式 `×` 和 `2.78` 分两行 | `SectionExposure.tsx` | 合并为单元素 `× 2.78`，加 `whitespace-nowrap`，移除 flex-col 布局 |
| 7 | Exposure caption 换行仅 2 字 | `SectionExposure.tsx` | maxWidth `55ch`→`38ch`，加 `textWrap: "balance" as const` |
| 8 | SectionDepth 孤字换行（多次出现） | `SectionDepth.tsx`、`DESIGN.md` | 两处段落加 `textWrap: "balance" as const`；孤字禁则记录至 DESIGN.md §3.3 |
| 9 | QuoteInterstitial 全面重设计 | `QuoteInterstitial.tsx` | 大号装饰引号 `"` 作点缀图标（Georgia/serif，6rem，orange/0.5 opacity）；移除内嵌 `&#8220;&#8221;`；fontSize 降至 `clamp(22px,4vw,40px)` weight 300 |
| 10 | Outro 文字太大，背景单薄 | `SectionOutro.tsx` | 标题 `clamp(52px,10vw,100px)`→`clamp(32px,6vw,56px)`，weight 450→300，letterSpacing 加宽；新增 SVG feTurbulence 噪点层 + 多层渐变 |
| 11 | Outro 出现 Claude Code 信息 | `SectionOutro.tsx` | 替换为 `Powered by 飞书多维表格` |

**调试记录**：
- `textWrap: "balance"` 在 TypeScript 中需 `as const` 或 `as React.CSSProperties`，否则报 type 错误（`string` 不兼容 `TextWrap`）
- SVG filter `url(#endGlow)` 在 `decorative` 模式下跨模式共享同一 `<defs>`，需确保 filter 定义在 decorative 分支渲染路径之前已存在

---

## 已知遗留 / 后续计划

- [ ] SectionViewership 环形图在极小视口（< 360px）时 SVG 可能溢出
- [ ] YoYChart 终点 dot 在 Recharts 动画关闭时坐标计算依赖 `isAnimationActive={false}`，如将来开启需重测
- [ ] ComparisonBar 组件目前未在任何 Section 中使用（保留备用）
- [ ] `prefers-reduced-motion` 降级：MeshGradient speed=0 已处理，但 RollingNumber 的 JS 动画尚未在此媒体查询下完整降级
- [ ] 中文字体总量约 2-4MB，生产构建未做 subsetting，首屏 CLS 可能较大

export const REPORT_META = {
  title: "时间的朋友",
  year: "2026",
  subtitle: "跨年演讲开年捷报",
  dataDeadline: "2026-01-09",
  brand: "得到 App",
} as const;

export type StatDelta = {
  value: number;        // 百分比数值，如 33.85
  label: string;        // "同比"
  direction: "up" | "down";
  note?: string;        // 可选，如 "同比新增 149 个"
};

export type Stat = {
  id: string;
  label: string;
  value: number;
  unit: string;
  displayFormat?: "number" | "duration";
  delta?: StatDelta;
  caption?: string;
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
    value: 20 * 60 + 34, // 秒
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

// 历年增长曲线数据（Section 5）
export const YOY_CURVE = [
  { year: "2023", viewers: 2850, duration: 7.8 },
  { year: "2024", viewers: 3200, duration: 9.5 },
  { year: "2025", viewers: 3560, duration: 14.2 },
  { year: "2026", viewers: 4765.7, duration: 20.57 },
];

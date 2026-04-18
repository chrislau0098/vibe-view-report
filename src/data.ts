export const REPORT_META = {
  title: "时间的朋友",
  year: "2026",
  subtitle: "跨年演讲开年捷报",
  dataDeadline: "2026-01-09",
  brand: "得到 App",
} as const;

export type StatDelta = {
  value: number;        // 百分比数值，如 34.81
  label: string;        // "同比"
  direction: "up" | "down";
  note?: string;
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

export const STATS: Record<string, Stat> = {
  // ── 全平台核心指标 ──
  totalViewers: {
    id: "totalViewers",
    label: "全网直播观看",
    value: 4765.7,
    unit: "万人",
    delta: { value: 34.81, label: "同比", direction: "up" },
  },
  reservations: {
    id: "reservations",
    label: "全网累计预约",
    value: 100,
    unit: "万人",
  },
  onlineExposure: {
    id: "onlineExposure",
    label: "线上内容曝光",
    value: 5.12,
    unit: "亿次",
    delta: { value: 10.11, label: "同比", direction: "up" },
  },
  totalExposure: {
    id: "totalExposure",
    label: "整体曝光",
    value: 14.22,
    unit: "亿次",
    caption: "线上线下合计",
    delta: { value: 10.40, label: "同比", direction: "up" },
  },
  avgDuration: {
    id: "avgDuration",
    label: "人均观看时长",
    value: 20 * 60 + 34, // 秒 (20分34秒)
    unit: "分秒",
    displayFormat: "duration",
    delta: { value: 131, label: "同比", direction: "up" },
  },
  avgOnline: {
    id: "avgOnline",
    label: "平均在线人数",
    value: 32.7,
    unit: "万人",
  },
  venues: {
    id: "venues",
    label: "跨年演讲分会场",
    value: 324,
    unit: "个",
    delta: { value: 85.14, label: "同比新增", direction: "up", note: "新增 149 个" },
  },
  offline: {
    id: "offline",
    label: "线下参与用户",
    value: 4.3,
    unit: "万人",
    delta: { value: 168.75, label: "同比新增", direction: "up", note: "新增 2.7 万人" },
  },

  // ── 视频号指标 ──
  videoViewers: {
    id: "videoViewers",
    label: "视频号观看",
    value: 3247.9,
    unit: "万人",
    caption: "占全网 68.2%",
    delta: { value: 202.11, label: "同比", direction: "up" },
  },
  videoViewersPeak: {
    id: "videoViewersPeak",
    label: "视频号峰值在线",
    value: 57.6,
    unit: "万人",
    delta: { value: 31, label: "同比", direction: "up" },
  },
  videoViewersReservation: {
    id: "videoViewersReservation",
    label: "视频号预约人数",
    value: 87,
    unit: "万人",
    delta: { value: 45, label: "同比", direction: "up" },
  },

  // ── 得到站内直播指标 ──
  stationReservation: {
    id: "stationReservation",
    label: "站内预约人数",
    value: 259019,
    unit: "人",
  },
  stationShowRate: {
    id: "stationShowRate",
    label: "预约到场率",
    value: 60.39,
    unit: "%",
  },
  stationPeak: {
    id: "stationPeak",
    label: "在线峰值人数",
    value: 120674,
    unit: "人",
  },
  stationViews: {
    id: "stationViews",
    label: "累积观看人次",
    value: 1083751,
    unit: "人次",
  },
  stationWatchers: {
    id: "stationWatchers",
    label: "累计观看人数",
    value: 339182,
    unit: "人",
  },
  stationAvgDuration: {
    id: "stationAvgDuration",
    label: "站内平均观看时长",
    value: 61,
    unit: "分钟",
  },
  stationInteractions: {
    id: "stationInteractions",
    label: "累积互动留言",
    value: 191496,
    unit: "条",
  },
  stationInteractors: {
    id: "stationInteractors",
    label: "累计互动人数",
    value: 88397,
    unit: "人",
  },
  stationShares: {
    id: "stationShares",
    label: "累积分享次数",
    value: 243769,
    unit: "次",
  },
  stationSharers: {
    id: "stationSharers",
    label: "累积分享人数",
    value: 75290,
    unit: "人",
  },

  // ── 抖音直播间指标 ──
  douyinExposureTimes: {
    id: "douyinExposureTimes",
    label: "直播间曝光次数",
    value: 32.75,
    unit: "万次",
  },
  douyinExposureUsers: {
    id: "douyinExposureUsers",
    label: "直播间曝光人数",
    value: 17.08,
    unit: "万人",
  },
  douyinEntry: {
    id: "douyinEntry",
    label: "进入直播间人数",
    value: 2.56,
    unit: "万人",
  },
  douyinConversion: {
    id: "douyinConversion",
    label: "观看成交转化率",
    value: 1.62,
    unit: "%",
  },
  douyinPeak: {
    id: "douyinPeak",
    label: "最高在线人数",
    value: 672,
    unit: "人",
  },
};

// 历年全网直播观看（真实赛季数据，单位：万人）
export const YOY_CURVE = [
  { year: "22-23", viewers: 2251 },
  { year: "23-24", viewers: 3354 },
  { year: "24-25", viewers: 3535.1 },
  { year: "25-26", viewers: 4765.7 },
];

export const EASE = {
  out:    [0.16, 1, 0.3, 1]      as const, // ease-out-expo — 通用入场
  inOut:  [0.83, 0, 0.17, 1]     as const, // 平滑往返
  bounce: [0.34, 1.56, 0.64, 1]  as const, // 大数字落下时轻微回弹
  spring: [0.45, 0, 0.55, 1]     as const, // 按钮 hover / 轻交互
} as const;

/**
 * 格式化中文数量级数字
 * @param value - 原始数值（已是万或亿级别的小数）
 * @param unit  - 目标单位
 */
export function formatChineseNumber(
  value: number,
  unit?: string,
): string {
  if (unit === "亿") {
    return value.toFixed(2);
  }
  if (unit === "万人" || unit === "万") {
    return value.toFixed(1);
  }
  if (unit === "auto") {
    if (value >= 10000) return (value / 10000).toFixed(2) + "亿";
    if (value >= 1) return value.toFixed(1) + "万";
    return value.toString();
  }
  return value.toFixed(1);
}

/**
 * 格式化秒数为"X分Y秒"
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}分${secs.toString().padStart(2, "0")}秒`;
}

/**
 * @fileoverview 提供數字縮寫 (近似值) 的轉換功能。
 * 將大數字轉換為帶有單位的簡短表示 (如 1.2萬)。
 */
import { CONFIGS } from '../constants';
/**
 * 將數字轉換為中文縮寫近似值 (如：12345 -> 1.2萬)。
 *
 * @param {number} num - 要轉換的數字。
 * @param {ApproximateOptions} [options={}] - 轉換選項。
 * @param {string} [options.locale='zh-TW'] - 地區設定。
 * @param {number} [options.precision=1] - 保留的小數位數。
 * @returns {string} 轉換後的縮寫字串。
 *
 * @example
 * numberToChineseApproximate(12345); // '1.2萬'
 * numberToChineseApproximate(123456789, { precision: 2 }); // '1.23億'
 */
function numberToChineseApproximate(num, options = {}) {
    const { locale = 'zh-TW', precision = 1 } = options;
    const conf = CONFIGS[locale];
    const bigUnits = conf.bigUnits;
    const absNum = Math.abs(num);
    // 小於一萬，不進行縮寫
    if (absNum < 10000) {
        return num.toString();
    }
    // 輔助函式：格式化數字並加上單位
    const format = (value, unitIndex) => {
        // 使用 toFixed 保留小數位，並移除末尾多餘的 .0 或 0
        // 例如 1.20 -> 1.2, 1.0 -> 1
        let formattedNum = (num / value).toFixed(precision);
        // 移除小數點後多餘的 0
        if (formattedNum.includes('.')) {
            formattedNum = formattedNum.replace(/0+$/, '').replace(/\.$/, '');
        }
        return formattedNum + bigUnits[unitIndex];
    };
    // 兆 (10^12)
    if (absNum >= 1e12) {
        return format(1e12, 3);
    }
    // 億 (10^8)
    if (absNum >= 1e8) {
        return format(1e8, 2);
    }
    // 萬 (10^4)
    if (absNum >= 1e4) {
        return format(1e4, 1);
    }
    return num.toString();
}
export default numberToChineseApproximate;
//# sourceMappingURL=numberToApproximate.js.map
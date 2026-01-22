/**
 * @fileoverview 提供數字縮寫 (近似值) 的轉換功能。
 * 將大數字轉換為帶有單位的簡短表示 (如 1.2萬)。
 */
import { ApproximateOptions } from '../types';
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
declare function numberToChineseApproximate(num: number, options?: ApproximateOptions): string;
export default numberToChineseApproximate;
//# sourceMappingURL=numberToApproximate.d.ts.map
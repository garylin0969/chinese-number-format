/**
 * @fileoverview 提供分數與百分比轉換功能。
 * 支援字串格式 (如 "1/2", "50%") 與數字格式轉換。
 */
import { FractionOptions } from '../types';
/**
 * 將分數或百分比轉換為中文格式。
 *
 * @param {number | string} val - 輸入值。可以是數字 (0.5) 或字串 ("1/2", "50%")。
 * @param {FractionOptions} [options={}] - 轉換選項。
 * @param {string} [options.locale='zh-TW'] - 地區設定。
 * @param {'fraction' | 'percentage'} [options.type] - 強制指定轉換類型。
 * @returns {string} 轉換後的中文字串。
 *
 * @example
 * numberToFraction('1/2'); // '二分之一'
 * numberToFraction('50%'); // '百分之五十'
 * numberToFraction(0.5, { type: 'percentage' }); // '百分之五十'
 */
declare function numberToFraction(val: number | string, options?: FractionOptions): string;
export default numberToFraction;

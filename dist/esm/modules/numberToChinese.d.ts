/**
 * @fileoverview 提供數字轉換為中文的核心功能。
 * 支援一般讀法、金融大寫、科學記號處理與單位格式化。
 */
import { ChineseNumberOptions } from '../types';
/**
 * 將數字轉換為中文格式。
 *
 * @param {number} num - 要轉換的數字。
 * @param {ChineseNumberOptions} [options={}] - 轉換選項。
 * @param {string} [options.locale='zh-TW'] - 地區設定。
 * @param {boolean} [options.finance=false] - 是否使用金融大寫。
 * @param {boolean} [options.units=true] - 是否顯示單位。
 * @param {boolean} [options.tenMin=true] - 是否省略首位的「一十」。
 * @returns {string} 轉換後的中文數字字串。
 *
 * @example
 * numberToChinese(123); // '一百二十三'
 * numberToChinese(10, { tenMin: false }); // '一十'
 */
declare function numberToChinese(num: number, options?: ChineseNumberOptions): string;
export default numberToChinese;

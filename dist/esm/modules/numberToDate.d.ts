/**
 * @fileoverview 提供日期與年份轉換功能。
 * 支援將 Date 物件或年份數字轉換為中文格式。
 */
import { ChineseLocale, DateOptions } from '../types';
/**
 * 將年份數字轉換為中文讀法 (如：2024 -> 二零二四)。
 * 採用純數字讀法，不加單位。
 *
 * @param {number} year - 西元年份。
 * @param {ChineseLocale} [locale='zh-TW'] - 地區設定。
 * @returns {string} 中文年份字串。
 *
 * @example
 * numberToYear(2024); // '二零二四'
 */
export declare function numberToYear(year: number, locale?: ChineseLocale): string;
/**
 * 將 Date 物件轉換為中文日期字串。
 *
 * @param {Date} date - Date 物件。
 * @param {DateOptions} [options={}] - 轉換選項。
 * @param {string} [options.locale='zh-TW'] - 地區設定。
 * @param {'date'|'day'|'time'} [options.format='date'] - 格式設定。
 * @returns {string} 中文日期字串。
 *
 * @example
 * dateToChinese(new Date(2024, 0, 22)); // '二零二四年一月二十二日'
 */
export declare function dateToChinese(date: Date, options?: DateOptions): string;
//# sourceMappingURL=numberToDate.d.ts.map
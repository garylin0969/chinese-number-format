/**
 * @fileoverview 專案入口點。
 * 匯出所有功能模組與型別定義。
 */
import numberToChinese from './modules/numberToChinese';
import numberToCurrency from './modules/numberToCurrency';
import chineseToNumber from './modules/chineseToNumber';
import numberToChineseApproximate from './modules/numberToApproximate';
import { numberToYear, dateToChinese } from './modules/numberToDate';
import numberToFraction from './modules/numberToFraction';
import ChineseNumberFormat from './modules/ChineseNumberFormat';
// 匯出型別定義
export * from './types';
// --- Named Exports (具名匯出) ---
/**
 * 核心功能：將數字轉換為中文。
 * 支援一般讀法、金融大寫、單位顯示設定。
 * @example numberToChinese(123) // "一百二十三"
 */
export { numberToChinese };
/**
 * 貨幣格式化：將數字轉換為中文金額。
 * 支援自定義單位、整數/小數處理 (角、分)。
 * @example numberToCurrency(100) // "壹佰元整"
 */
export { numberToCurrency };
/**
 * 反向解析：將中文數字字串轉換為數值。
 * 支援標準寫法、口語縮寫、大寫數字及小數。
 * @example chineseToNumber("一萬二") // 12000
 */
export { chineseToNumber };
/**
 * 數字縮寫：將大數字轉換為簡短的中文近似值。
 * 常用於數據展示 (如觀看次數)。
 * @example numberToChineseApproximate(12345) // "1.2萬"
 */
export { numberToChineseApproximate };
/**
 * 年份轉換：將年份數字轉換為中文讀法。
 * @example numberToYear(2024) // "二零二四"
 */
export { numberToYear };
/**
 * 日期轉換：將 Date 物件轉換為中文日期字串。
 * 支援日期、星期、時間格式。
 * @example dateToChinese(new Date()) // "二零二四年一月二十二日"
 */
export { dateToChinese };
/**
 * 分數與百分比：轉換分數或百分比格式。
 * @example numberToFraction("1/2") // "二分之一"
 */
export { numberToFraction };
/**
 * 類別介面：提供物件導向風格的格式化器。
 * 可建立帶有預設設定的實例。
 * @example new ChineseNumberFormat({ locale: 'zh-CN' }).toChinese(123)
 */
export { ChineseNumberFormat };
// --- Default Export (預設匯出) ---
/**
 * 預設匯出物件，包含所有功能函式。
 */
export default {
    numberToChinese,
    numberToCurrency,
    chineseToNumber,
    numberToChineseApproximate,
    numberToYear,
    dateToChinese,
    numberToFraction,
    ChineseNumberFormat,
};
//# sourceMappingURL=index.js.map
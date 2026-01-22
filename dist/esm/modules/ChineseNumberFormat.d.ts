/**
 * @fileoverview 提供物件導向風格的格式化器。
 * 允許建立帶有預設設定的實例，適合在多語系或 SSR 環境中使用。
 */
import { ChineseLocale, ChineseNumberOptions, CurrencyOptions, ApproximateOptions, DateOptions, FractionOptions } from '../types';
/**
 * 中文數字格式化器類別。
 * 類似 Intl.NumberFormat，可以保存預設的 locale 與其他設定。
 */
export declare class ChineseNumberFormat {
    private defaultOptions;
    /**
     * 建立格式化器實例。
     * @param {ChineseNumberOptions} options - 預設選項。
     */
    constructor(options?: ChineseNumberOptions);
    /**
     * 將數字轉換為中文讀法。
     */
    toChinese(num: number, options?: ChineseNumberOptions): string;
    /**
     * 將數字轉換為中文貨幣格式。
     */
    toCurrency(num: number, options?: CurrencyOptions): string;
    /**
     * 反向解析：將中文數字字串轉換為數值。
     */
    toNumber(str: string): number;
    /**
     * 數字縮寫。
     */
    toApproximate(num: number, options?: ApproximateOptions): string;
    /**
     * 年份轉換。
     */
    toYear(year: number, locale?: ChineseLocale): string;
    /**
     * 日期轉換。
     */
    toDate(date: Date, options?: DateOptions): string;
    /**
     * 分數與百分比轉換。
     */
    toFraction(val: number | string, options?: FractionOptions): string;
}
export default ChineseNumberFormat;
//# sourceMappingURL=ChineseNumberFormat.d.ts.map
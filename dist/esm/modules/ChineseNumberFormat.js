/**
 * @fileoverview 提供物件導向風格的格式化器。
 * 允許建立帶有預設設定的實例，適合在多語系或 SSR 環境中使用。
 */
import numberToChinese from './numberToChinese';
import numberToCurrency from './numberToCurrency';
import chineseToNumber from './chineseToNumber';
import numberToChineseApproximate from './numberToApproximate';
import { numberToYear, dateToChinese } from './numberToDate';
import numberToFraction from './numberToFraction';
/**
 * 中文數字格式化器類別。
 * 類似 Intl.NumberFormat，可以保存預設的 locale 與其他設定。
 */
export class ChineseNumberFormat {
    /**
     * 建立格式化器實例。
     * @param {ChineseNumberOptions} options - 預設選項。
     */
    constructor(options = {}) {
        this.defaultOptions = Object.assign({ locale: 'zh-TW' }, options);
    }
    /**
     * 將數字轉換為中文讀法。
     */
    toChinese(num, options) {
        return numberToChinese(num, Object.assign(Object.assign({}, this.defaultOptions), options));
    }
    /**
     * 將數字轉換為中文貨幣格式。
     */
    toCurrency(num, options) {
        return numberToCurrency(num, Object.assign({ locale: this.defaultOptions.locale }, options));
    }
    /**
     * 反向解析：將中文數字字串轉換為數值。
     */
    toNumber(str) {
        return chineseToNumber(str);
    }
    /**
     * 數字縮寫。
     */
    toApproximate(num, options) {
        return numberToChineseApproximate(num, Object.assign({ locale: this.defaultOptions.locale }, options));
    }
    /**
     * 年份轉換。
     */
    toYear(year, locale) {
        // 若傳入 locale 則使用，否則使用實例預設
        const targetLocale = locale || this.defaultOptions.locale;
        return numberToYear(year, targetLocale);
    }
    /**
     * 日期轉換。
     */
    toDate(date, options) {
        return dateToChinese(date, Object.assign({ locale: this.defaultOptions.locale }, options));
    }
    /**
     * 分數與百分比轉換。
     */
    toFraction(val, options) {
        return numberToFraction(val, Object.assign({ locale: this.defaultOptions.locale }, options));
    }
}
export default ChineseNumberFormat;

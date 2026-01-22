"use strict";
/**
 * @fileoverview 提供物件導向風格的格式化器。
 * 允許建立帶有預設設定的實例，適合在多語系或 SSR 環境中使用。
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChineseNumberFormat = void 0;
const numberToChinese_1 = __importDefault(require("./numberToChinese"));
const numberToCurrency_1 = __importDefault(require("./numberToCurrency"));
const chineseToNumber_1 = __importDefault(require("./chineseToNumber"));
const numberToApproximate_1 = __importDefault(require("./numberToApproximate"));
const numberToDate_1 = require("./numberToDate");
const numberToFraction_1 = __importDefault(require("./numberToFraction"));
/**
 * 中文數字格式化器類別。
 * 類似 Intl.NumberFormat，可以保存預設的 locale 與其他設定。
 */
class ChineseNumberFormat {
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
        return (0, numberToChinese_1.default)(num, Object.assign(Object.assign({}, this.defaultOptions), options));
    }
    /**
     * 將數字轉換為中文貨幣格式。
     */
    toCurrency(num, options) {
        return (0, numberToCurrency_1.default)(num, Object.assign({ locale: this.defaultOptions.locale }, options));
    }
    /**
     * 反向解析：將中文數字字串轉換為數值。
     */
    toNumber(str) {
        return (0, chineseToNumber_1.default)(str);
    }
    /**
     * 數字縮寫。
     */
    toApproximate(num, options) {
        return (0, numberToApproximate_1.default)(num, Object.assign({ locale: this.defaultOptions.locale }, options));
    }
    /**
     * 年份轉換。
     */
    toYear(year, locale) {
        // 若傳入 locale 則使用，否則使用實例預設
        const targetLocale = locale || this.defaultOptions.locale;
        return (0, numberToDate_1.numberToYear)(year, targetLocale);
    }
    /**
     * 日期轉換。
     */
    toDate(date, options) {
        return (0, numberToDate_1.dateToChinese)(date, Object.assign({ locale: this.defaultOptions.locale }, options));
    }
    /**
     * 分數與百分比轉換。
     */
    toFraction(val, options) {
        return (0, numberToFraction_1.default)(val, Object.assign({ locale: this.defaultOptions.locale }, options));
    }
}
exports.ChineseNumberFormat = ChineseNumberFormat;
exports.default = ChineseNumberFormat;

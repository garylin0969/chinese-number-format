"use strict";
/**
 * @fileoverview 提供分數與百分比轉換功能。
 * 支援字串格式 (如 "1/2", "50%") 與數字格式轉換。
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const numberToChinese_1 = __importDefault(require("./numberToChinese"));
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
function numberToFraction(val, options = {}) {
    const { locale = 'zh-TW', type } = options;
    const conf = constants_1.CONFIGS[locale];
    // 1. 字串模式處理
    if (typeof val === 'string') {
        // 處理百分比 "50%"
        if (val.includes('%')) {
            const numStr = val.replace('%', '');
            const num = parseFloat(numStr);
            return conf.fraction.percent + (0, numberToChinese_1.default)(num, { locale, units: true });
        }
        // 處理分數 "1/2"
        if (val.includes('/')) {
            const [numerator, denominator] = val.split('/').map(Number);
            return ((0, numberToChinese_1.default)(denominator, { locale }) +
                conf.fraction.connector +
                (0, numberToChinese_1.default)(numerator, { locale }));
        }
    }
    // 2. 數字模式處理
    if (typeof val === 'number') {
        // 指定為百分比
        if (type === 'percentage') {
            // 避免浮點數運算誤差，例如 0.56 * 100 = 56.00000000000001
            // 使用 Math.round 或 toPrecision 處理
            const percentNum = parseFloat((val * 100).toPrecision(12));
            return conf.fraction.percent + (0, numberToChinese_1.default)(percentNum, { locale, units: true });
        }
        // 若未指定 type，簡單實作：轉為中文數字 (通常是小數)
        // 若需將小數轉分數 (如 0.5 -> 二分之一) 邏輯較複雜，暫不實作自動轉換
        if (!type) {
            return (0, numberToChinese_1.default)(val, { locale });
        }
    }
    return '';
}
exports.default = numberToFraction;
//# sourceMappingURL=numberToFraction.js.map
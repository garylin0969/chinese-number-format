"use strict";
/**
 * @fileoverview 專案入口點。
 * 匯出所有功能模組與型別定義。
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChineseNumberFormat = exports.numberToFraction = exports.dateToChinese = exports.numberToYear = exports.numberToChineseApproximate = exports.chineseToNumber = exports.numberToCurrency = exports.numberToChinese = void 0;
const numberToChinese_1 = __importDefault(require("./modules/numberToChinese"));
exports.numberToChinese = numberToChinese_1.default;
const numberToCurrency_1 = __importDefault(require("./modules/numberToCurrency"));
exports.numberToCurrency = numberToCurrency_1.default;
const chineseToNumber_1 = __importDefault(require("./modules/chineseToNumber"));
exports.chineseToNumber = chineseToNumber_1.default;
const numberToApproximate_1 = __importDefault(require("./modules/numberToApproximate"));
exports.numberToChineseApproximate = numberToApproximate_1.default;
const numberToDate_1 = require("./modules/numberToDate");
Object.defineProperty(exports, "numberToYear", { enumerable: true, get: function () { return numberToDate_1.numberToYear; } });
Object.defineProperty(exports, "dateToChinese", { enumerable: true, get: function () { return numberToDate_1.dateToChinese; } });
const numberToFraction_1 = __importDefault(require("./modules/numberToFraction"));
exports.numberToFraction = numberToFraction_1.default;
const ChineseNumberFormat_1 = __importDefault(require("./modules/ChineseNumberFormat"));
exports.ChineseNumberFormat = ChineseNumberFormat_1.default;
// 匯出型別定義
__exportStar(require("./types"), exports);
// --- Default Export (預設匯出) ---
/**
 * 預設匯出物件，包含所有功能函式。
 */
exports.default = {
    numberToChinese: numberToChinese_1.default,
    numberToCurrency: numberToCurrency_1.default,
    chineseToNumber: chineseToNumber_1.default,
    numberToChineseApproximate: numberToApproximate_1.default,
    numberToYear: numberToDate_1.numberToYear,
    dateToChinese: numberToDate_1.dateToChinese,
    numberToFraction: numberToFraction_1.default,
    ChineseNumberFormat: ChineseNumberFormat_1.default,
};

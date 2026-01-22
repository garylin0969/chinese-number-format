/**
 * @fileoverview 提供數字轉換為貨幣格式的功能。
 * 支援自定義幣別單位、小數點後位數 (角、分) 處理。
 */
import { CONFIGS } from '../constants';
import numberToChinese from './numberToChinese';
/**
 * 將數字轉換為中文貨幣格式 (如：壹佰元整)。
 * 自動處理小數點後兩位 (角、分)，多餘位數將四捨五入。
 *
 * @param {number} num - 要轉換的金額。
 * @param {CurrencyOptions} [options={}] - 轉換選項。
 * @param {string} [options.locale='zh-TW'] - 地區設定。
 * @param {string} [options.currencyUnit='元'] - 貨幣單位。
 * @param {boolean} [options.useIntUnit=true] - 整數結尾是否加「整」字。
 * @returns {string} 轉換後的貨幣字串。
 *
 * @example
 * numberToCurrency(100); // '壹佰元整'
 * numberToCurrency(10.5); // '壹拾元伍角'
 */
function numberToCurrency(num, options = {}) {
    const { locale = 'zh-TW', currencyUnit = '元', useIntUnit = true } = options;
    const conf = CONFIGS[locale];
    // 1. 處理浮點數精度，轉換為整數的分 (cents)
    // 使用 Number.EPSILON 修正 1.005 * 100 = 100.4999... 的問題
    const totalFen = Math.round((num + Number.EPSILON) * 100);
    const integerPart = Math.floor(totalFen / 100);
    const fractional = totalFen % 100;
    // 2. 轉換整數部分
    const chineseNum = numberToChinese(integerPart, {
        locale,
        finance: true,
        units: true,
        tenMin: false, // 貨幣通常不省略「一十」的「一」
    });
    let result = chineseNum + currencyUnit;
    // 若無小數部分
    if (fractional === 0) {
        if (useIntUnit) {
            result += conf.currency.end;
        }
        return result;
    }
    const jiao = Math.floor(fractional / 10);
    const fen = fractional % 10;
    const numerals = conf.finance;
    // 處理「角」
    if (jiao > 0) {
        result += numerals[jiao] + conf.currency.fractional[0];
    }
    else if (fen > 0 && integerPart > 0) {
        // 若有分但無角，且有整數部分，需補「零」
        // 例如：1.05 -> 一元零五分
        result += numerals[0];
    }
    // 處理「分」
    if (fen > 0) {
        result += numerals[fen] + conf.currency.fractional[1];
    }
    return result;
}
export default numberToCurrency;
//# sourceMappingURL=numberToCurrency.js.map
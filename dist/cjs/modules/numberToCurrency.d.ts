/**
 * @fileoverview 提供數字轉換為貨幣格式的功能。
 * 支援自定義幣別單位、小數點後位數 (角、分) 處理。
 */
import { CurrencyOptions } from '../types';
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
declare function numberToCurrency(num: number, options?: CurrencyOptions): string;
export default numberToCurrency;

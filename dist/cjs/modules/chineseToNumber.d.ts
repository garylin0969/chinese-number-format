/**
 * @fileoverview 提供中文數字反向解析為數值的功能。
 * 支援標準寫法、口語縮寫、大寫數字及小數解析。
 */
/**
 * 將中文數字字串解析為數字。
 * 支援功能：
 * 1. 標準寫法：一百二十三 -> 123
 * 2. 金融大寫：壹佰貳拾參 -> 123
 * 3. 口語縮寫：一萬二 -> 12000
 * 4. 混合單位：1.2萬 -> 12000
 * 5. 純數字映射：一二三 -> 123
 *
 * @param {string} str - 中文數字字串。
 * @returns {number} 解析後的數字。若無法解析則回傳 NaN (部分情況可能回傳錯誤數值，視輸入模糊度而定)。
 *
 * @example
 * chineseToNumber('一百二十三'); // 123
 * chineseToNumber('1.2萬'); // 12000
 */
declare function chineseToNumber(str: string): number;
export default chineseToNumber;
//# sourceMappingURL=chineseToNumber.d.ts.map
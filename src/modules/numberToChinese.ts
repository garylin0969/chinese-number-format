/**
 * @fileoverview 提供數字轉換為中文的核心功能。
 * 支援一般讀法、金融大寫、科學記號處理與單位格式化。
 */

import { ChineseNumberOptions } from '../types';
import { CONFIGS } from '../constants';

/**
 * 將科學記號轉換為完整數字字串。
 * 解決 toLocaleString 在某些環境下不支援 fullwide 或精度不足的問題。
 * @param {number} num
 * @returns {string}
 */
function toNonExponential(num: number): string {
    const str = num.toExponential(); // e.g. "1.23e+8" or "1e-4"
    const parts = str.split('e');
    if (parts.length === 1) return parts[0];

    const base = parts[0];
    const exponent = parseInt(parts[1], 10);

    const baseParts = base.split('.');
    const integerPart = baseParts[0];
    const decimalPart = baseParts[1] || '';

    if (exponent > 0) {
        // 正指數：向右移動小數點
        if (exponent < decimalPart.length) {
            return integerPart + decimalPart.slice(0, exponent) + '.' + decimalPart.slice(exponent);
        } else {
            return integerPart + decimalPart + '0'.repeat(exponent - decimalPart.length);
        }
    } else {
        // 負指數：向左移動小數點
        const absExponent = Math.abs(exponent);
        if (absExponent < integerPart.length) {
            const splitIndex = integerPart.length - absExponent;
            return integerPart.slice(0, splitIndex) + '.' + integerPart.slice(splitIndex) + decimalPart;
        } else {
            return '0.' + '0'.repeat(absExponent - integerPart.length) + integerPart + decimalPart;
        }
    }
}

/**
 * 將數字轉換為中文格式。
 *
 * @param {number} num - 要轉換的數字。
 * @param {ChineseNumberOptions} [options={}] - 轉換選項。
 * @param {string} [options.locale='zh-TW'] - 地區設定。
 * @param {boolean} [options.finance=false] - 是否使用金融大寫。
 * @param {boolean} [options.units=true] - 是否顯示單位。
 * @param {boolean} [options.tenMin=true] - 是否省略首位的「一十」。
 * @returns {string} 轉換後的中文數字字串。
 *
 * @example
 * numberToChinese(123); // '一百二十三'
 * numberToChinese(10, { tenMin: false }); // '一十'
 */
function numberToChinese(num: number, options: ChineseNumberOptions = {}): string {
    const { locale = 'zh-TW', finance = false, units = true, tenMin = true } = options;

    const conf = CONFIGS[locale];
    const numerals = finance ? conf.finance : conf.normal;
    const unitChars = finance ? conf.unitsFinance : conf.units;

    // 0. 特殊情況處理
    if (num === 0) return numerals[0];

    // 1. 純數字模式 (不帶單位，例如電話號碼、年份)
    // 直接將每個數字映射為對應的中文字
    if (!units) {
        return toNonExponential(num)
            .split('')
            .map((char) => {
                if (char === '.') return conf.point;
                // 嘗試解析數字，若非數字則保留原字元
                const n = parseInt(char, 10);
                return isNaN(n) ? char : numerals[n];
            })
            .join('');
    }

    // 2. 處理科學記號與精度問題
    const numStr = toNonExponential(num);
    const [intStr, decStr] = numStr.split('.');

    // --- 整數部分處理 ---
    let result = '';

    // 將整數部分由後往前每 4 位分為一組 (對應：個、萬、億、兆...)
    const groups = [];
    let tempInt = intStr;
    while (tempInt.length > 0) {
        groups.push(tempInt.slice(Math.max(0, tempInt.length - 4)));
        tempInt = tempInt.slice(0, Math.max(0, tempInt.length - 4));
    }

    // 從大單位往小單位遍歷每一組
    groups.reverse().forEach((groupStr, idx) => {
        const bigUnitIdx = groups.length - 1 - idx;
        const isLastGroup = idx === groups.length - 1;

        // 若該組全為 0
        if (groupStr === '0000') {
            // 若中間有全 0 組，且結果不以零結尾，則補一個零 (ex: 100000001)
            if (groups.length > 1 && result !== '' && !result.endsWith(numerals[0])) {
                result += numerals[0];
            }
            return;
        }

        let groupResult = '';
        let zeroFlag = false; // 標記是否剛處理過 0

        // 處理 4 位數內的每一位
        for (let i = 0; i < groupStr.length; i++) {
            const digit = parseInt(groupStr[i], 10);
            const unitIdx = groupStr.length - 1 - i; // 單位索引 (0:個, 1:十, 2:百, 3:千)

            if (digit === 0) {
                zeroFlag = true;
            } else {
                // 如果之前有 0，現在遇到非 0，需要補一個「零」
                if (zeroFlag) {
                    groupResult += numerals[0];
                    zeroFlag = false;
                }

                // 處理「一十」省略為「十」的習慣 (僅在數值介於 10-19 且是第一組時)
                if (tenMin && digit === 1 && unitIdx === 1 && groupStr.length === 2 && groups.length === 1) {
                    groupResult += unitChars[unitIdx];
                } else {
                    groupResult += numerals[digit] + (unitIdx > 0 ? unitChars[unitIdx] : '');
                }
            }
        }

        // 加上大單位 (萬、億...)
        if (groupResult) {
            result += groupResult + conf.bigUnits[bigUnitIdx];
        } else if (!isLastGroup && !result.endsWith(numerals[0])) {
            // 處理跨組的零 (e.g. 10001 -> 一萬零一)
            result += numerals[0];
        }
    });

    // 清理結果字串
    // 1. 合併連續的零 (Fix: 一億零零一 -> 一億零一)
    result = result.replace(new RegExp(`${numerals[0]}+`, 'g'), numerals[0]);

    // 2. 移除尾部多餘的零
    result = result.replace(new RegExp(`${numerals[0]}+$`), '');

    // 3. 特殊情況修復：若整數部分被清空 (例如 0.123 -> intStr='0', result='')
    // 但 num 本身有小數，或 num 就是 0，則整數部分應為「零」
    if (result === '' && (decStr || num === 0)) {
        result = numerals[0];
    }

    // --- 小數部分處理 ---
    let decimalResult = '';
    if (decStr) {
        decimalResult =
            conf.point +
            decStr
                .split('')
                .map((d) => numerals[parseInt(d, 10)])
                .join('');
    }

    return result + decimalResult;
}

export default numberToChinese;

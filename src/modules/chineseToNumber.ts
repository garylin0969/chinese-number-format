/**
 * @fileoverview 提供中文數字反向解析為數值的功能。
 * 支援標準寫法、口語縮寫、大寫數字及小數解析。
 */

import { CHINESE_TO_NUMBER_MAP, UNIT_MAP, CONFIGS } from '../constants';

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
function chineseToNumber(str: string): number {
    // 移除空白與逗號
    str = str.replace(/[\s,，]/g, '');

    // 0. 處理純數字字串 (e.g. "123", "2024.5")
    if (/^[\d\.]+$/.test(str)) {
        return parseFloat(str);
    }

    // 1. 處理帶單位的縮寫 (e.g. "1.2萬", "1.2万")
    // 邏輯：檢查最後一個字元是否為大單位 (>=10000)
    const lastChar = str.charAt(str.length - 1);
    const unitValue = UNIT_MAP.get(lastChar);
    if (unitValue && unitValue >= 10000) {
        const numPart = str.slice(0, -1);
        // 若前面是純數字 (如 1.2)
        if (/^[\d\.]+$/.test(numPart)) {
            // 解決浮點數運算精度問題：先轉字串再計算，或依賴 JS 引擎 (1.2 * 10000 = 12000 safe)
            return parseFloat(numPart) * unitValue;
        }
    }

    // 2. 分離整數與小數部分
    let pointChars = [...CONFIGS.base['.']];
    let splitChar = pointChars.find((c) => str.includes(c));
    let intStr = str;
    let decStr = '';

    if (splitChar) {
        const parts = str.split(splitChar);
        intStr = parts[0];
        decStr = parts[1];
    }

    // --- 檢查是否為「純中文數字模式」 (不含單位) ---
    // 例如 "一二三", "二零二四"
    // 判斷依據：字串中不包含任何單位 (十、百、千...)
    let hasUnit = false;
    for (const char of intStr) {
        if (UNIT_MAP.has(char)) {
            hasUnit = true;
            break;
        }
    }

    if (!hasUnit) {
        // 純映射模式：直接將每個字元轉為數字
        let resultStr = '';
        for (const char of intStr) {
            const n = CHINESE_TO_NUMBER_MAP.get(char);
            if (n !== undefined) {
                resultStr += n;
            }
        }
        // 加上小數部分
        if (decStr) {
            let decResult = '';
            for (const char of decStr) {
                const n = CHINESE_TO_NUMBER_MAP.get(char);
                if (n !== undefined) decResult += n;
            }
            return parseFloat(resultStr + '.' + decResult);
        }
        return parseFloat(resultStr);
    }

    // 3. 標準解析整數部分 (權重累加法)
    let total = 0; // 總數值 (已結算的億、兆等)
    let section = 0; // 當前小節數值 (小於萬的部分)
    let currentNum = -1; // 當前讀到的數字 (-1 表示未讀到)
    let lastUnit = 1; // 記錄上一個單位，用於處理口語省略 (如 "一萬二")
    let hasZero = false; // 標記是否出現過 "零" (區分 "一萬零二" 與 "一萬二")

    for (let i = 0; i < intStr.length; i++) {
        const char = intStr[i];
        const num = CHINESE_TO_NUMBER_MAP.get(char);

        if (num !== undefined) {
            if (num === 0) {
                hasZero = true; // 標記零出現
                continue;
            }
            currentNum = num;
            // 注意：讀到數字時不重置 hasZero，確保 "三千零五" 邏輯正確
        } else {
            const unit = UNIT_MAP.get(char);
            if (unit !== undefined) {
                lastUnit = unit;
                hasZero = false; // 遇到單位，重置零標記 (開啟新邏輯段)

                if (unit >= 10000) {
                    // --- 大單位 (萬, 億...) ---
                    // 先結算當前 section (例如 "三千五百" -> 3500)
                    if (currentNum !== -1) {
                        section += currentNum;
                        currentNum = -1;
                    }
                    // 將 section 乘上大單位，累加到 total
                    total += (section + (currentNum !== -1 ? currentNum : 0)) * unit;
                    section = 0;
                    currentNum = -1;
                } else {
                    // --- 小單位 (十, 百, 千) ---
                    if (currentNum === -1) {
                        // 處理 "十" 開頭的情況 (e.g. "十", "十五")
                        if (unit === 10) currentNum = 1;
                        else currentNum = 0; // "百" 開頭通常不合法
                    }
                    section += currentNum * unit;
                    currentNum = -1;
                }
            }
        }
    }

    // 結算迴圈結束後的剩餘部分
    if (currentNum !== -1) {
        // 處理口語省略: "一萬二" -> lastUnit=10000, currentNum=2
        // 條件：無零、前一個單位 >= 10
        if (!hasZero && lastUnit >= 10) {
            // 將當前數字視為下一級單位的數值
            // 萬(10000) -> 千(1000)
            // 千(1000) -> 百(100)
            section += currentNum * (lastUnit / 10);
        } else {
            section += currentNum;
        }
    }
    total += section;

    // 4. 解析小數部分
    let decimalVal = 0;
    if (decStr) {
        let decStrNum = '';
        for (const char of decStr) {
            const n = CHINESE_TO_NUMBER_MAP.get(char);
            if (n !== undefined) {
                decStrNum += n;
            }
        }
        if (decStrNum) {
            decimalVal = parseFloat('0.' + decStrNum);
        }
    }

    return total + decimalVal;
}

export default chineseToNumber;

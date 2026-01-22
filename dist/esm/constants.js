/**
 * @fileoverview 定義專案所需的常數表、映射表與基礎配置。
 * 包含繁簡中文對照、單位定義與反向查找表。
 */
/**
 * 基礎配置表，包含各個數字與單位的多種寫法。
 */
export const CONFIGS = {
    base: {
        '0': ['0', '０', '零', '〇'],
        '1': ['1', '１', '一', '壹'],
        '2': ['2', '２', '二', '貳', '贰', '两', '兩'],
        '3': ['3', '３', '三', '參', '叁'],
        '4': ['4', '４', '四', '肆'],
        '5': ['5', '５', '五', '伍'],
        '6': ['6', '６', '六', '陸', '陆'],
        '7': ['7', '７', '七', '柒'],
        '8': ['8', '８', '八', '捌'],
        '9': ['9', '９', '九', '玖'],
        '.': ['.', '．', '點', '点'],
        '%': ['%', '％'],
        '/': ['/', '／'],
    },
    'zh-TW': {
        normal: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
        finance: ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'],
        units: ['', '十', '百', '千'],
        unitsFinance: ['', '拾', '佰', '仟'],
        bigUnits: ['', '萬', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載'],
        point: '點',
        currency: { unit: '元', fractional: ['角', '分'], end: '整' },
        fraction: { connector: '分之', percent: '百分之' },
    },
    'zh-CN': {
        normal: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
        finance: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        units: ['', '十', '百', '千'],
        unitsFinance: ['', '拾', '佰', '仟'],
        bigUnits: ['', '万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载'],
        point: '点',
        currency: { unit: '元', fractional: ['角', '分'], end: '整' },
        fraction: { connector: '分之', percent: '百分之' },
    },
};
/**
 * 中文轉數字的映射表。
 * key: 中文字元 (如 '壹'), value: 對應數值 (如 1)
 */
export const CHINESE_TO_NUMBER_MAP = new Map();
/**
 * 單位權重映射表。
 * key: 單位字元 (如 '萬'), value: 權重數值 (如 10000)
 */
export const UNIT_MAP = new Map();
// 初始化 CHINESE_TO_NUMBER_MAP
// 將 CONFIGS.base 中的所有數字變體映射到其數值
Object.entries(CONFIGS.base).forEach(([numStr, chars]) => {
    if (['.', '%', '/'].includes(numStr))
        return;
    const num = parseInt(numStr, 10);
    chars.forEach((char) => CHINESE_TO_NUMBER_MAP.set(char, num));
});
// 初始化 UNIT_MAP
// 1. 小單位 (十, 百, 千)
const smallUnits = {
    10: ['十', '拾'],
    100: ['百', '佰'],
    1000: ['千', '仟'],
};
Object.entries(smallUnits).forEach(([val, chars]) => {
    const value = parseInt(val, 10);
    chars.forEach((char) => UNIT_MAP.set(char, value));
});
// 2. 大單位 (萬, 億...)
// 根據 CONFIGS 中的定義，每隔 4 個數量級 (10^4) 遞增
const bigUnitsMap = [CONFIGS['zh-TW'].bigUnits, CONFIGS['zh-CN'].bigUnits];
bigUnitsMap.forEach((units) => {
    units.forEach((char, index) => {
        if (index === 0 || !char)
            return;
        // 萬=10^4, 億=10^8...
        const value = Math.pow(10, 4 * index);
        UNIT_MAP.set(char, value);
    });
});

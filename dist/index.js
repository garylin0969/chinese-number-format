"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUpperCase = exports.toNumber = exports.toChineseApproximate = exports.toChineseWithUnits = exports.toChinese = void 0;
// 基本數字映射
const NUMBER_MAPS = {
    base: {
        '0': ['0', '０', '零', '〇'],
        '1': ['1', '１', '一', '壹'],
        '2': ['2', '２', '二', '貳', '贰'],
        '3': ['3', '３', '三', '參', '叁'],
        '4': ['4', '４', '四', '肆'],
        '5': ['5', '５', '五', '伍'],
        '6': ['6', '６', '六', '陸', '陆'],
        '7': ['7', '７', '七', '柒'],
        '8': ['8', '８', '八', '捌'],
        '9': ['9', '９', '九', '玖'],
        '.': ['.', '．', '點', '点'],
    },
    'zh-TW': {
        units: ['', '十', '百', '千'],
        bigUnits: ['', '萬', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載'],
        point: '點',
        uppercase: {
            零: '零',
            一: '壹',
            二: '貳',
            三: '參',
            四: '肆',
            五: '伍',
            六: '陸',
            七: '柒',
            八: '捌',
            九: '玖',
            十: '拾',
            百: '佰',
            千: '仟',
            萬: '萬',
            億: '億',
            兆: '兆',
            點: '點',
        },
    },
    'zh-CN': {
        units: ['', '十', '百', '千'],
        bigUnits: ['', '万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载'],
        point: '点',
        uppercase: {
            零: '零',
            一: '壹',
            二: '贰',
            三: '叁',
            四: '肆',
            五: '伍',
            六: '陆',
            七: '柒',
            八: '捌',
            九: '玖',
            十: '拾',
            百: '佰',
            千: '仟',
            万: '万',
            亿: '亿',
            兆: '兆',
            点: '点',
        },
    },
};
// 將數字字串轉換為大寫
const toUpperCase = (str, locales = 'zh-TW') => {
    const config = NUMBER_MAPS[locales];
    let result = '';
    for (const char of str) {
        let found = false;
        for (const [key, value] of Object.entries(config.uppercase)) {
            if (char === key) {
                result += value;
                found = true;
                break;
            }
        }
        if (!found)
            result += char;
    }
    return result;
};
exports.toUpperCase = toUpperCase;
// 將數字轉換為中文
function toChinese(num, locale = 'zh-TW') {
    return num
        .toLocaleString('zh-Hans-CN-u-nu-hanidec', { useGrouping: false })
        .replace(/〇/g, '零')
        .replace(/\./g, NUMBER_MAPS[locale].point);
}
exports.toChinese = toChinese;
// 將中文數字字串轉換為數字
function toNumber(str) {
    // 如果包含非數字字符（除了點和數字映射外），直接返回 NaN
    const validChars = Object.values(NUMBER_MAPS.base).flat();
    if ([...str].some((char) => !validChars.includes(char))) {
        return NaN;
    }
    const numberStr = [...str]
        .map((char) => {
        for (const [num, chars] of Object.entries(NUMBER_MAPS.base)) {
            if (chars.includes(char))
                return num;
        }
        return null;
    })
        .filter((x) => x !== null)
        .join('');
    return numberStr.length > 0 ? Number(numberStr) : NaN;
}
exports.toNumber = toNumber;
function toChineseWithUnits(num, locale = 'zh-TW') {
    const config = NUMBER_MAPS[locale];
    // 處理科學記數法
    const normalizedNum = num.toString().includes('e')
        ? num.toLocaleString('fullwide', { useGrouping: false })
        : num.toString();
    const [intPart, decPart = ''] = normalizedNum.split('.');
    // 處理整數部分
    const formatInteger = (numStr) => {
        // 如果是0，直接返回零
        if (numStr === '0')
            return '零';
        // 按4位分組處理
        const groups = numStr
            .split('')
            .reverse()
            .reduce((acc, digit, i) => {
            const groupIndex = Math.floor(i / 4);
            if (!acc[groupIndex])
                acc[groupIndex] = [];
            acc[groupIndex].unshift(digit);
            return acc;
        }, []);
        // 處理每個分組
        let result = groups
            .reverse()
            .map((group, groupIndex) => {
            // 跳過全為0的分組，除非是個位數
            if (group.every((d) => d === '0') && groups.length > 1)
                return '';
            const groupResult = group
                .map((digit, i) => {
                const num = parseInt(digit);
                if (num === 0)
                    return '零';
                return (num.toLocaleString('zh-Hans-CN-u-nu-hanidec', { useGrouping: false }).replace(/〇/g, '零') +
                    (i < group.length - 1 ? config.units[group.length - 1 - i] : ''));
            })
                .join('');
            // 只在非空分組後添加大單位
            const bigUnit = groupResult ? config.bigUnits[groups.length - 1 - groupIndex] : '';
            return groupResult + bigUnit;
        })
            .join('');
        // 清理結果
        return (result
            .replace(/零+/g, '零') // 合併連續的零
            .replace(/零+$/, '') // 移除尾部的零
            .replace(/零+([萬億兆京垓秭穰溝澗正載万亿])/g, '$1') // 移除單位前的零
            .replace(/^零+/, '') || // 移除開頭的零
            '零'); // 如果結果為空，返回零
    };
    // 處理小數部分
    const formatDecimal = decPart
        ? config.point +
            [...decPart]
                .map((d) => parseInt(d).toLocaleString('zh-Hans-CN-u-nu-hanidec', { useGrouping: false }).replace(/〇/g, '零'))
                .join('')
        : '';
    return formatInteger(intPart) + formatDecimal;
}
exports.toChineseWithUnits = toChineseWithUnits;
// 新增：將數字轉換為近似中文表示
function toChineseApproximate(num, options = {}) {
    const { locale = 'zh-TW', precision = 1 } = options;
    const config = NUMBER_MAPS[locale];
    if (num < 1e4) {
        return toChineseWithUnits(num, locale);
    }
    let unit = '';
    let value = num;
    // 找到最適合的單位
    if (num >= 1e8) {
        // 億以上
        value = num / 1e8;
        unit = locale === 'zh-TW' ? '億' : '亿';
    }
    else if (num >= 1e4) {
        // 萬以上
        value = num / 1e4;
        unit = locale === 'zh-TW' ? '萬' : '万';
    }
    // 格式化數值到指定精度
    const roundedValue = Number(value.toFixed(precision));
    const [intPart, decPart = ''] = roundedValue.toString().split('.');
    // 轉換整數部分為中文，處理特殊情況
    let integerPart = '';
    const intNum = Number(intPart);
    if (intNum === 10) {
        integerPart = '十';
    }
    else if (intNum > 10 && intNum < 20) {
        integerPart = '十' + toChinese(intNum % 10, locale);
    }
    else {
        integerPart = toChinese(intNum, locale);
    }
    // 處理小數部分
    const decimalPart = decPart ? config.point + toChinese(Number(decPart), locale) : '';
    return integerPart + decimalPart + unit;
}
exports.toChineseApproximate = toChineseApproximate;

/**
 * @fileoverview 提供日期與年份轉換功能。
 * 支援將 Date 物件或年份數字轉換為中文格式。
 */
import numberToChinese from './numberToChinese';
/**
 * 將年份數字轉換為中文讀法 (如：2024 -> 二零二四)。
 * 採用純數字讀法，不加單位。
 *
 * @param {number} year - 西元年份。
 * @param {ChineseLocale} [locale='zh-TW'] - 地區設定。
 * @returns {string} 中文年份字串。
 *
 * @example
 * numberToYear(2024); // '二零二四'
 */
export function numberToYear(year, locale = 'zh-TW') {
    return numberToChinese(year, { locale, units: false });
}
/**
 * 將 Date 物件轉換為中文日期字串。
 *
 * @param {Date} date - Date 物件。
 * @param {DateOptions} [options={}] - 轉換選項。
 * @param {string} [options.locale='zh-TW'] - 地區設定。
 * @param {'date'|'day'|'time'} [options.format='date'] - 格式設定。
 * @returns {string} 中文日期字串。
 *
 * @example
 * dateToChinese(new Date(2024, 0, 22)); // '二零二四年一月二十二日'
 */
export function dateToChinese(date, options = {}) {
    const { locale = 'zh-TW', format = 'date' } = options;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // 年份：純數字讀法 (二零二四)
    const yearStr = numberToYear(year, locale);
    // 月份、日期：使用一般讀法 (一月、二十二日)
    const monthStr = numberToChinese(month, { locale });
    const dayStr = numberToChinese(day, { locale });
    let result = `${yearStr}年${monthStr}月${dayStr}日`;
    // 星期
    if (format === 'day' || format === 'time') {
        const weekDays = {
            'zh-TW': ['日', '一', '二', '三', '四', '五', '六'],
            'zh-CN': ['日', '一', '二', '三', '四', '五', '六'],
        };
        const prefix = locale === 'zh-CN' ? '星期' : '星期'; // 繁簡通常都用星期，或周(CN)
        result += ` ${prefix}${weekDays[locale][weekDay]}`;
    }
    // 時間
    if (format === 'time') {
        // 簡單實作：二十四小時制
        // 13:05 -> 十三點零五分
        const hourStr = numberToChinese(hours, { locale });
        let minuteStr = numberToChinese(minutes, { locale });
        if (minutes < 10) {
            // "零五"
            minuteStr = '零' + minuteStr;
        }
        // 整點
        if (minutes === 0) {
            minuteStr = '整'; // 或 '零分'
            // 習慣：十三點整
            result += ` ${hourStr}點整`;
        }
        else {
            result += ` ${hourStr}點${minuteStr}分`;
        }
    }
    return result;
}

/**
 * @fileoverview 定義專案中使用的 TypeScript 型別介面。
 * 包含地區設定、轉換選項等定義。
 */
/**
 * 支援的地區設定。
 * - 'zh-TW': 繁體中文 (台灣)
 * - 'zh-CN': 簡體中文 (中國大陸)
 */
export type ChineseLocale = 'zh-TW' | 'zh-CN';
/**
 * 數字轉中文的設定選項。
 */
export interface ChineseNumberOptions {
    /**
     * 指定地區。
     * @default 'zh-TW'
     */
    locale?: ChineseLocale;
    /**
     * 是否使用金融大寫數字 (如：壹、貳、參)。
     * @default false
     */
    finance?: boolean;
    /**
     * 是否輸出單位 (如：十、百、千)。
     * 若設為 false，則僅轉換數字本身 (如：一二三四)。
     * @default true
     */
    units?: boolean;
    /**
     * 是否省略首位的「一十」。
     * 例如：10 轉換為「十」而非「一十」。
     * @default true
     */
    tenMin?: boolean;
}
/**
 * 數字轉貨幣格式的設定選項。
 */
export interface CurrencyOptions {
    /**
     * 指定地區。
     * @default 'zh-TW'
     */
    locale?: ChineseLocale;
    /**
     * 自定義貨幣單位。
     * @default '元'
     */
    currencyUnit?: string;
    /**
     * 當金額為整數時，是否在結尾加上「整」或「正」。
     * @default true
     */
    useIntUnit?: boolean;
}
/**
 * 數字轉縮寫 (近似值) 的設定選項。
 */
export interface ApproximateOptions {
    /**
     * 指定地區。
     * @default 'zh-TW'
     */
    locale?: ChineseLocale;
    /**
     * 小數點後的保留位數。
     * @default 1
     */
    precision?: number;
}
/**
 * 分數或百分比轉換的設定選項。
 */
export interface FractionOptions {
    /**
     * 指定地區。
     * @default 'zh-TW'
     */
    locale?: ChineseLocale;
    /**
     * 強制指定轉換類型。
     * - 'fraction': 分數
     * - 'percentage': 百分比
     * 若不指定，將根據輸入格式自動判斷。
     */
    type?: 'fraction' | 'percentage';
}
/**
 * 日期轉換的設定選項。
 */
export interface DateOptions {
    /**
     * 指定地區。
     * @default 'zh-TW'
     */
    locale?: ChineseLocale;
    /**
     * 日期格式。
     * - 'date': 僅日期 (二零二四年一月二十二日)
     * - 'day': 包含星期 (二零二四年一月二十二日 星期四)
     * - 'time': 包含時間 (二零二四年一月二十二日 十二點三十分)
     * @default 'date'
     */
    format?: 'date' | 'day' | 'time';
}
//# sourceMappingURL=types.d.ts.map
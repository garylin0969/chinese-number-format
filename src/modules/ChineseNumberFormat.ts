/**
 * @fileoverview 提供物件導向風格的格式化器。
 * 允許建立帶有預設設定的實例，適合在多語系或 SSR 環境中使用。
 */

import { ChineseLocale, ChineseNumberOptions, CurrencyOptions, ApproximateOptions, DateOptions, FractionOptions } from '../types';
import numberToChinese from './numberToChinese';
import numberToCurrency from './numberToCurrency';
import chineseToNumber from './chineseToNumber';
import numberToChineseApproximate from './numberToApproximate';
import { numberToYear, dateToChinese } from './numberToDate';
import numberToFraction from './numberToFraction';

/**
 * 中文數字格式化器類別。
 * 類似 Intl.NumberFormat，可以保存預設的 locale 與其他設定。
 */
export class ChineseNumberFormat {
  private defaultOptions: ChineseNumberOptions;

  /**
   * 建立格式化器實例。
   * @param {ChineseNumberOptions} options - 預設選項。
   */
  constructor(options: ChineseNumberOptions = {}) {
    this.defaultOptions = {
      locale: 'zh-TW',
      ...options
    };
  }

  /**
   * 將數字轉換為中文讀法。
   */
  toChinese(num: number, options?: ChineseNumberOptions): string {
    return numberToChinese(num, { ...this.defaultOptions, ...options });
  }

  /**
   * 將數字轉換為中文貨幣格式。
   */
  toCurrency(num: number, options?: CurrencyOptions): string {
    return numberToCurrency(num, { 
      locale: this.defaultOptions.locale,
      ...options 
    });
  }

  /**
   * 反向解析：將中文數字字串轉換為數值。
   */
  toNumber(str: string): number {
    return chineseToNumber(str);
  }

  /**
   * 數字縮寫。
   */
  toApproximate(num: number, options?: ApproximateOptions): string {
    return numberToChineseApproximate(num, { 
      locale: this.defaultOptions.locale,
      ...options 
    });
  }

  /**
   * 年份轉換。
   */
  toYear(year: number, locale?: ChineseLocale): string {
    // 若傳入 locale 則使用，否則使用實例預設
    const targetLocale = locale || this.defaultOptions.locale;
    return numberToYear(year, targetLocale);
  }

  /**
   * 日期轉換。
   */
  toDate(date: Date, options?: DateOptions): string {
    return dateToChinese(date, { 
      locale: this.defaultOptions.locale,
      ...options 
    });
  }

  /**
   * 分數與百分比轉換。
   */
  toFraction(val: number | string, options?: FractionOptions): string {
    return numberToFraction(val, { 
      locale: this.defaultOptions.locale,
      ...options 
    });
  }
}

export default ChineseNumberFormat;
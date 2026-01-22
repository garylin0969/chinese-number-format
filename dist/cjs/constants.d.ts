/**
 * @fileoverview 定義專案所需的常數表、映射表與基礎配置。
 * 包含繁簡中文對照、單位定義與反向查找表。
 */
/**
 * 基礎配置表，包含各個數字與單位的多種寫法。
 */
export declare const CONFIGS: {
    base: Record<string, string[]>;
    'zh-TW': {
        normal: string[];
        finance: string[];
        units: string[];
        unitsFinance: string[];
        bigUnits: string[];
        point: string;
        currency: {
            unit: string;
            fractional: string[];
            end: string;
        };
        fraction: {
            connector: string;
            percent: string;
        };
    };
    'zh-CN': {
        normal: string[];
        finance: string[];
        units: string[];
        unitsFinance: string[];
        bigUnits: string[];
        point: string;
        currency: {
            unit: string;
            fractional: string[];
            end: string;
        };
        fraction: {
            connector: string;
            percent: string;
        };
    };
};
/**
 * 中文轉數字的映射表。
 * key: 中文字元 (如 '壹'), value: 對應數值 (如 1)
 */
export declare const CHINESE_TO_NUMBER_MAP: Map<string, number>;
/**
 * 單位權重映射表。
 * key: 單位字元 (如 '萬'), value: 權重數值 (如 10000)
 */
export declare const UNIT_MAP: Map<string, number>;
//# sourceMappingURL=constants.d.ts.map
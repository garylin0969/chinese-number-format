import { numberToChineseApproximate } from '../../src/index';

describe('numberToChineseApproximate (數字縮寫)', () => {
    test('基本縮寫', () => {
        expect(numberToChineseApproximate(12345)).toBe('1.2萬');
        expect(numberToChineseApproximate(123456789)).toBe('1.2億');
    });

    test('小數點精度', () => {
        expect(numberToChineseApproximate(12345, { precision: 2 })).toBe('1.23萬');
        // 四捨五入測試 (1.2345 -> 1.23)
        expect(numberToChineseApproximate(12345, { precision: 2 })).toBe('1.23萬');
    });

    test('簡體支援', () => {
        expect(numberToChineseApproximate(12345, { locale: 'zh-CN' })).toBe('1.2万');
        expect(numberToChineseApproximate(123456789, { locale: 'zh-CN', precision: 2 })).toBe('1.23亿');
        // 兆 (1e12) 繁簡相同
        expect(numberToChineseApproximate(1e12, { locale: 'zh-CN' })).toBe('1兆');
    });

    test('去除多餘的零', () => {
        expect(numberToChineseApproximate(10000)).toBe('1萬'); // 不是 1.0萬
        expect(numberToChineseApproximate(15000)).toBe('1.5萬'); // 不是 1.50萬 (如果 precision=2)
    });

    test('小於一萬', () => {
        expect(numberToChineseApproximate(9999)).toBe('9999');
        expect(numberToChineseApproximate(1)).toBe('1');
    });

    test('負數處理', () => {
        // 雖然函式內用 abs 判斷級距，但回傳 num.toString 還是計算過的？
        // 目前實作：num / 1e4 -> 負數除以正數還是負數。
        expect(numberToChineseApproximate(-12345)).toBe('-1.2萬');
    });
});

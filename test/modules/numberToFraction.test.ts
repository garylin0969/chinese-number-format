import { numberToFraction } from '../../src/index';

describe('numberToFraction (分數與百分比)', () => {
    test('字串分數', () => {
        expect(numberToFraction('1/2')).toBe('二分之一');
        expect(numberToFraction('3/4')).toBe('四分之三');
    });

    test('字串百分比', () => {
        expect(numberToFraction('50%')).toBe('百分之五十');
        expect(numberToFraction('12.5%')).toBe('百分之十二點五');
    });

    test('數字轉百分比', () => {
        expect(numberToFraction(0.5, { type: 'percentage' })).toBe('百分之五十');
        // 浮點數精度測試 0.56 * 100
        expect(numberToFraction(0.56, { type: 'percentage' })).toBe('百分之五十六');
    });

    test('數字預設行為', () => {
        // 未指定 type，預設轉為中文數字 (小數)
        expect(numberToFraction(0.5)).toBe('零點五');
    });

    test('簡體中文', () => {
        expect(numberToFraction('1/2', { locale: 'zh-CN' })).toBe('二分之一');
        expect(numberToFraction('50%', { locale: 'zh-CN' })).toBe('百分之五十');
        expect(numberToFraction(0.12, { locale: 'zh-CN' })).toBe('零点一二'); // 點 vs 点
        expect(numberToFraction(0.75, { locale: 'zh-CN', type: 'percentage' })).toBe('百分之七十五');
    });
});

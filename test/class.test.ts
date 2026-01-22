import { ChineseNumberFormat } from '../src/index';

describe('ChineseNumberFormat 類別 (Class Interface)', () => {
    test('預設為 zh-TW', () => {
        const formatter = new ChineseNumberFormat();
        expect(formatter.toChinese(123)).toBe('一百二十三');
        expect(formatter.toCurrency(100)).toBe('壹佰元整');
    });

    test('指定 locale 為 zh-CN', () => {
        const cnFormatter = new ChineseNumberFormat({ locale: 'zh-CN' });

        // 驗證各方法是否自動套用 zh-CN
        expect(cnFormatter.toChinese(123)).toBe('一百二十三');
        expect(cnFormatter.toChinese(10000)).toBe('一万');
        expect(cnFormatter.toCurrency(1234.56)).toBe('壹仟贰佰叁拾肆元伍角陆分');
        expect(cnFormatter.toApproximate(12345)).toBe('1.2万');
        expect(cnFormatter.toFraction(0.12)).toBe('零点一二');
    });

    test('實例方法可覆蓋預設值', () => {
        const cnFormatter = new ChineseNumberFormat({ locale: 'zh-CN' });

        // 臨時轉回繁體
        expect(cnFormatter.toChinese(10000, { locale: 'zh-TW' })).toBe('一萬');
    });

    test('多實例隔離', () => {
        const twFormatter = new ChineseNumberFormat({ locale: 'zh-TW' });
        const cnFormatter = new ChineseNumberFormat({ locale: 'zh-CN' });

        expect(twFormatter.toChinese(10000)).toBe('一萬');
        expect(cnFormatter.toChinese(10000)).toBe('一万');
    });
});
